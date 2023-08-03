import { Application, Container, DisplayObject, IApplicationOptions, extensions } from "pixi.js"
import { ComponentProps, onMount, splitProps, JSX, createSignal } from "solid-js"
import { Solixi } from "."
import { InternalState, RootState, SolixiState } from "./state"
import { SolixiRoot } from "@bearbroidery/constructables/src/renderer"
import { createRAF } from '@solid-primitives/raf';
import { SetStoreFunction, createStore, produce } from "solid-js/store"

type InternalCanvasProps = {
  app?: Omit<Partial<IApplicationOptions>, 'canvas'>,
  resolution?: number,
  children: JSX.Element | null,
  onCreated?: (state: SolixiState) => void,
  devtools?: boolean,
  frameloop?: 'ondemand'|'always',
}
type CanvasProps = ComponentProps<'div'> & InternalCanvasProps;

const INTERNAL_PROP_KEYS = ['app', 'resolution', 'devtools', 'frameloop'] as unknown as (keyof InternalCanvasProps[]);

export const Canvas = (props: CanvasProps) => {
  const [internalProps, divElementProps] = splitProps(props, INTERNAL_PROP_KEYS);
  const [childrenProps, _] = splitProps(props, ['children']);

  let wrapperEl: HTMLDivElement|undefined;
  let containerEl: HTMLDivElement|undefined;
  let canvasEl: HTMLCanvasElement|undefined;

  let solixiRoot: SolixiRoot<InternalState & SolixiState, Container<DisplayObject>>|undefined = undefined;

  let canRender = true;
  const invalidate = () => {
    canRender = true;
  }

  let time = 0;
  const [running, start, stop] = createRAF((time) => {
    if (solixiRoot && canRender) {
      const state = solixiRoot.state;
      const { internal } = state;

      // Call useFrame handlers
      time += state.ticker.deltaTime;
      for (const registration of internal.useFrameRegistrations) {
        registration.handler(state, time, state.ticker.deltaTime);
      }
      

      solixiRoot.state.app.render();
      if (!internalProps.frameloop || internalProps.frameloop === 'always') {
        invalidate();
      }
    }
  })
  // setState('set', setState);

  onMount(() => {
    const defaultAppOptions: Partial<IApplicationOptions> = {
      view: canvasEl,
      resolution: internalProps.resolution,
    }
    const appOptions = {...(internalProps.app ?? {}), ...defaultAppOptions };
    const app = new Application(appOptions)

    // @ts-expect-error ; Pixi.js devtools
    if (internalProps.devtools) globalThis.__PIXI_APP__ = app;

    const [state, setState] = createStore<RootState & InternalState>({
      app, 
      stage: app.stage,
      ticker: app.ticker,
      invalidate,
      internal: {
        useFrameRegistrations: [],
      },
      set: null as unknown as SetStoreFunction<SolixiState & InternalState>,
    });
    setState(produce(state => {
      state.set = setState as SetStoreFunction<SolixiState & InternalState>;
    }));

    const root = Solixi.createRoot<typeof app.stage>(app.stage, state as SolixiState);

    root.render(childrenProps);

    if (internalProps.onCreated) internalProps.onCreated(root.state);
    solixiRoot = root as unknown as SolixiRoot<InternalState & SolixiState, typeof app.stage>;

    start();
  })

  return (
    <div
      ref={wrapperEl}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      {...divElementProps}>
      <div ref={containerEl} style={{ width: '100%', height: '100%' }}>
        <canvas ref={canvasEl} style={{ display: 'block' }} />
      </div>
    </div>
  )
}
