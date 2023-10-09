import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import { Ticker } from '@pixi/ticker';
import { createRenderer } from '@bearbroidery/constructables';
import { createContext, onCleanup, onMount } from 'solid-js';
import { SetStoreFunction, produce } from 'solid-js/store';
import { EventBoundary } from '@pixi/events';

export type InternalState = {
    internal: {
        useFrameRegistrations: UseFrameRegistration[];
    };
    set: SetStoreFunction<InternalState & SolixiState>;
};
export type RootState = {
    readonly app: Application;
    readonly ticker: Ticker;
    readonly stage: Container;
    readonly boundary: EventBoundary;

    invalidate: () => void;
};

export type SolixiState = RootState & {
    set: SetStoreFunction<SolixiState>;
};

export const SolixiContext = createContext<SolixiState>({
    solixi_ctx: true,
} as unknown as SolixiState);

export const Solixi = createRenderer(SolixiContext);

export type UseFrameRegistration = {
    priority: number;
    handler: UseFrameHandler;
};
export type UseFrameHandler = (
    state: SolixiState,
    time: number,
    delta: number,
) => void;

export const useSolixi = Solixi.useConstructableState;

export const useSolixiInternal =
    Solixi.useConstructableState as () => InternalState & SolixiState;
/* Adds an onFrame callback with a priority (lowest is higher priority) */
export const useFrame = (handler: UseFrameHandler, priority = 0) => {
    const state = useSolixiInternal();

    onMount(() => {
        const nextIndex = state.internal.useFrameRegistrations.findIndex(
            (reg) => {
                return reg.priority > priority;
            },
        );

        state.set(
            produce((state) => {
                const registration: UseFrameRegistration = {
                    priority,
                    handler,
                };

                if (nextIndex >= 0) {
                    state.internal.useFrameRegistrations.splice(
                        nextIndex,
                        0,
                        registration,
                    );
                } else {
                    state.internal.useFrameRegistrations.push(registration);
                }
            }),
        );

        onCleanup(() => {
            const thisIndex = state.internal.useFrameRegistrations.findIndex(
                (reg) => reg.handler === handler,
            );

            if (thisIndex) {
                state.set(
                    produce((state) => {
                        state.internal.useFrameRegistrations.splice(
                            thisIndex,
                            0,
                        );
                    }),
                );
            }
        });
    });
};
