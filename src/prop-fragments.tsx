import { ExtraPropHandler } from '@bearbroidery/constructables/dist/elements';
import { Container } from '@pixi/display';
import { Point } from '@pixi/core';
import { Layer } from '@pixi/layers';
import { SolixiState } from './state';
import { Constructable } from '@bearbroidery/constructables';

const NameHandler: ExtraPropHandler<SolixiState, Constructable, string> = (
    _1,
    _2,
    object,
    value,
) => {
    // @ts-expect-error ; This is not technically a field but widely supported by pixi ecosystem.
    object.name = value;
};

export const HasNameFragment = {
    ['name']: NameHandler,
};

const ParentLayerHandler: ExtraPropHandler<
    SolixiState,
    Constructable,
    Layer
> = (_1, _2, object, value) => {
    // @ts-expect-error ; This is not technically a field but widely supported by pixi ecosystem.
    object.parentLayer = value;
};

export const HasParentLayerFragment = {
    ['parentLayer']: ParentLayerHandler,
};

const PositionHandler: ExtraPropHandler<
    SolixiState,
    Constructable,
    Point | [number, number]
> = (_1, _2, object, value) => {
    if (Array.isArray(value)) {
        (object as unknown as Container).position.set(value[0], value[1]);
    } else {
        (object as unknown as Container).position.copyFrom(value);
    }
};
const PositionXHandler: ExtraPropHandler<SolixiState, Constructable, number> = (
    _1,
    _2,
    object,
    value,
) => {
    (object as unknown as Container).position.x = value;
};
const PositionYHandler: ExtraPropHandler<SolixiState, Constructable, number> = (
    _1,
    _2,
    object,
    value,
) => {
    (object as unknown as Container).position.y = value;
};

export const HasPositionFragment = {
    ['position']: PositionHandler,
    ['position-x']: PositionXHandler,
    ['position-y']: PositionYHandler,
};

const ScaleHandler: ExtraPropHandler<
    SolixiState,
    Constructable,
    Point | [number, number]
> = (_1, _2, object, value) => {
    if (Array.isArray(value)) {
        (object as unknown as Container).scale.set(value[0], value[1]);
    } else {
        (object as unknown as Container).scale.copyFrom(value);
    }
};
const ScaleXHandler: ExtraPropHandler<SolixiState, Constructable, number> = (
    _1,
    _2,
    object,
    value,
) => {
    (object as unknown as Container).scale.x = value;
};
const ScaleYHandler: ExtraPropHandler<SolixiState, Constructable, number> = (
    _1,
    _2,
    object,
    value,
) => {
    (object as unknown as Container).scale.y = value;
};

export const HasScaleFragment = {
    ['scale']: ScaleHandler,
    ['scale-x']: ScaleXHandler,
    ['scale-y']: ScaleYHandler,
};

const RotationHandler: ExtraPropHandler<SolixiState, Constructable> = (
    _1,
    _2,
    object,
    value: number,
) => {
    (object as unknown as Container).rotation = value;
};
export const HasRotationFragment = {
    ['rotation']: RotationHandler,
};

const VisibilityHandler: ExtraPropHandler<SolixiState, Constructable> = (
    _1,
    _2,
    object,
    value: boolean,
) => {
    (object as unknown as Container).visible = value;
};
export const HasVisibilityFragment = {
    ['visible']: VisibilityHandler,
};

// const OnWheelHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object, value: (event: FederatedWheelEvent) => void) => {
//   object.on('wheel', value)
//   return () => object.off('wheel', value);
// };
// const OnPointerOverHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerover', value)
//   return () => object.off('pointerover', value);
// }
// const OnPointerOutHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerout', value)
//   return () => object.off('pointerout', value);
// }
// const OnPointerEnterHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerenter', value)
//   return () => object.off('pointerenter', value);
// }
// const OnPointerLeaveHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerleave', value)
//   return () => object.off('pointerleave', value);
// }
// const OnRightClickHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('rightclick', value)
//   return () => object.off('rightclick', value);
// }
// const OnRightDownHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('rightdown', value)
//   return () => object.off('rightdown', value);
// }
// const OnRightUpHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('rightup', value)
//   return () => object.off('rightup', value);
// }
// const OnClickHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('click', value)
//   return () => object.off('click', value);
// }
// const OnPointerDownHandler: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerdown', value)
//   return () => object.off('pointerdown', value);
// }
// const OnPointerU: ExtraPropHandler<SolixiState, Constructable> = (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//   object.on('pointerdown', value)
//   return () => object.off('pointerdown', value);
// }
//
// export const HasInteractivityFragment = {
//   onWheel: OnWheelHandler,
//   onPointerOver: OnPointerOverHandler,
//   onPointerOut: OnPointerOutHandler,
//
//   onPointerEnter: OnPointerEnterHandler,
//   onPointerLeave: OnPointerLeaveHandler,
//
//   onRightClick: OnRightClickHandler,
//   onRightDown: OnRightDownHandler,
//   onRightUp: OnRightUpHandler,
//
//   onClick: OnClickHandler,
//   onMouseDown: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//     object.on('mousedown', value)
//     return () => object.off('mousedown', value);
//   },
//   onMouseUp: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//     object.on('mouseup', value)
//     return () => object.off('mouseup', value);
//   },
//   onMouseMove: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
//     object.on('mousemove', value)
//     return () => object.off('mousemove', value);
//   },
// }
