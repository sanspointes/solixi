import { Application, Container, Ticker } from "pixi.js"
import { createRenderer } from "@bearbroidery/constructables"
import { createContext, onCleanup, onMount, useContext } from "solid-js"
import { SetStoreFunction, StoreSetter, createStore, produce } from "solid-js/store"

export type InternalState = {
  internal: {
    useFrameRegistrations: UseFrameRegistration[];
  },
  set: SetStoreFunction<InternalState & SolixiState>,
}
export type RootState = {
  readonly app: Application,
  readonly ticker: Ticker,
  readonly stage: Container,

  invalidate: () => void,
}

export type SolixiState = RootState & {
  set: SetStoreFunction<SolixiState>,
}

export const SolixiContext = createContext<SolixiState>({} as unknown as SolixiState)

export const Solixi = createRenderer(SolixiContext)

export type UseFrameRegistration = {
  priority: number,
  handler: UseFrameHandler,
};
export type UseFrameHandler = ((state: SolixiState, time: number, delta: number) => void);

/* Adds an onFrame callback with a priority (lowest is higher priority) */
export const useFrame = (handler: UseFrameHandler, priority = 0) => {
  const state = useContext(SolixiContext) as unknown as InternalState;
  if (!state) {
    throw new Error('Solixi: useFrame must be called within a <Canvas> component.');
  }

  onMount(() => {
    const nextIndex = state.internal.useFrameRegistrations.findIndex(reg => {
      return reg.priority > priority;
    })

    state.set(produce((state) => {
      const registration: UseFrameRegistration = {
        priority,
        handler,
      };

      if (nextIndex >= 0) {
        state.internal.useFrameRegistrations.splice(nextIndex, 0, registration);
      } else {
        state.internal.useFrameRegistrations.push(registration)
      }
    }));

    onCleanup(() => {
      const thisIndex = state.internal.useFrameRegistrations.findIndex(reg => reg.handler === handler);

      if (thisIndex) {
        state.set(produce((state) => {
          state.internal.useFrameRegistrations.splice(thisIndex, 0);
        }));
      }
    })
  })
}

export const usePixi = () => {
  const state = useContext(SolixiContext) as unknown as InternalState;
  if (!state) {
    throw new Error('Solixi: useFrame must be called within a <Canvas> component.');
  }
  return state;
}
