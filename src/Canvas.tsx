import { Application, IApplicationOptions } from '@pixi/app';
import { Container, DisplayObject } from '@pixi/display';
import {
    ComponentProps,
    onMount,
    splitProps,
    JSX,
    createEffect,
} from 'solid-js';
import { createRAF } from '@solid-primitives/raf';
import { createElementSize } from '@solid-primitives/resize-observer';
import { throttle } from '@solid-primitives/scheduled';

import { Solixi } from '.';
import { InternalState, RootState, SolixiState } from './state';
import { SolixiRoot } from '@bearbroidery/constructables/src/renderer';
import { SetStoreFunction, createStore, produce } from 'solid-js/store';
import {
    Constructable,
    SxiObject,
} from '@bearbroidery/constructables/dist/types';
import { EventBoundary, EventSystem } from '@pixi/events';

type InternalCanvasProps = {
    app?: Omit<Partial<IApplicationOptions>, 'canvas'>;
    resolution?: number;
    children: JSX.Element | null;
    onCreated?: (state: SolixiState) => void;
    devtools?: boolean;
    frameloop?: 'ondemand' | 'always';
};
type CanvasProps = ComponentProps<'div'> & InternalCanvasProps;

const INTERNAL_PROP_KEYS = [
    'app',
    'resolution',
    'devtools',
    'frameloop',
    'children',
    'onCreated',
] as unknown as keyof InternalCanvasProps[];

export const Canvas = (props: CanvasProps) => {
    const [internalProps, divElementProps] = splitProps(
        props,
        // @ts-expect-error ; Can't be bothered to type this right now
        INTERNAL_PROP_KEYS,
    );
    const [childrenProps, pixiProps] = splitProps(internalProps, ['children']);

    let wrapperEl: HTMLDivElement | undefined;
    let containerEl: HTMLDivElement | undefined;
    let canvasEl: HTMLCanvasElement | undefined;

    let solixiRoot:
        | SolixiRoot<
              InternalState & SolixiState,
              SxiObject<InternalState & SolixiState, Constructable>
          >
        | undefined = undefined;

    let canRender = true;
    const invalidate = () => {
        canRender = true;
    };

    let time = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_running, start, _stop] = createRAF(() => {
        if (solixiRoot && canRender) {
            const state = solixiRoot.state;
            const { internal } = state;

            // Call useFrame handlers
            time += state.ticker.deltaTime;
            for (const registration of internal.useFrameRegistrations) {
                registration.handler(state, time, state.ticker.deltaTime);
            }

            solixiRoot.state.app.render();
            if (!pixiProps.frameloop || pixiProps.frameloop === 'always') {
                invalidate();
            }
        }
    });

    onMount(() => {
        const defaultAppOptions: Partial<IApplicationOptions> = {
            view: canvasEl,
            antialias: true,
        };
        const appOptions = { ...(pixiProps.app ?? {}), ...defaultAppOptions };
        const app = new Application(appOptions);
        const boundary = new EventBoundary(app.stage);

        if (!EventSystem) {
            console.warn('Solixi: No event system provided.');
        }

        // @ts-expect-error ; Pixi.js devtools
        if (pixiProps.devtools) globalThis.__PIXI_APP__ = app;

        const [state, setState] = createStore<RootState & InternalState>({
            app,
            stage: app.stage,
            ticker: app.ticker,
            boundary,
            invalidate,
            internal: {
                useFrameRegistrations: [],
            },
            set: null as unknown as SetStoreFunction<
                SolixiState & InternalState
            >,
        });
        setState(
            produce((state) => {
                state.set = setState as SetStoreFunction<
                    SolixiState & InternalState
                >;
            }),
        );

        const root = Solixi.createRoot<typeof Container<DisplayObject>>(
            app.stage,
            state as SolixiState,
        );

        root.render(childrenProps);

        if (pixiProps.onCreated) pixiProps.onCreated(root.state);
        solixiRoot = root as unknown as SolixiRoot<
            InternalState & SolixiState,
            SxiObject<InternalState & SolixiState, Constructable>
        >;

        // Automatic resizing to parent window.
        if (!containerEl)
            throw new Error(
                '<Canvas> `containerEl` is not set.  This should never happen.',
            );
        const size = createElementSize(containerEl);
        const performResize = throttle((width: number, height: number) => {
            app.renderer.resize(width, height);
        });
        createEffect(() => {
            performResize(size.width, size.height);
        });

        start();
    });

    return (
        <div
            ref={wrapperEl}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
            {...divElementProps}
        >
            <div
                ref={containerEl}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                }}
            >
                <canvas
                    ref={canvasEl}
                    style={{ display: 'block', width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};
