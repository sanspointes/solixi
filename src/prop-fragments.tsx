import { ExtraPropHandler, ExtraPropsHandlers } from "@bearbroidery/constructables/dist/elements";
import { Container, FederatedPointerEvent, FederatedWheelEvent, Point } from "pixi.js";
import { SolixiState } from "./state";
import { Constructable } from "@bearbroidery/constructables/src/types";

const PositionHandler: ExtraPropHandler<SolixiState, Constructable, Point | [number, number]> = (_1, _2, object, value) => {
  if (Array.isArray(value)) {
    object.position.set(value[0], value[1]);
  } else {
    object.position.copyFrom(value)
  }
}
const PositionXHandler: ExtraPropHandler<SolixiState, Constructable, number> = (_1, _2, object, value) => {
  object.position.x = value;
}
const PositionYHandler: ExtraPropHandler<SolixiState, Constructable, number> = (_1, _2, object, value) => {
  object.position.y = value;
}

export const HasPositionFragment = {
  ['position']: PositionHandler,
  ['position-x']: PositionXHandler,
  ['position-y']: PositionYHandler,
}

const ScaleHandler: ExtraPropHandler<SolixiState, Constructable, Point | [number, number]> = (_1, _2, object, value) => {
  if (Array.isArray(value)) {
    object.scale.set(value[0], value[1]);
  } else {
    object.scale.copyFrom(value)
  }
}
const ScaleXHandler: ExtraPropHandler<SolixiState, Constructable, number> = (_1, _2, object, value) => {
  object.scale.x = value;
}
const ScaleYHandler: ExtraPropHandler<SolixiState, Constructable, number> = (_1, _2, object, value) => {
  object.scale.y = value;
}

export const HasScaleFragment = {
  ['scale']: ScaleHandler,
  ['scale-x']: ScaleXHandler,
  ['scale-y']: ScaleYHandler,
}

export const HasRotationFragment = {
  ['rotation']: (_1, _2, object: Container, value: number) => {
    object.rotation = value;
  }
}

export const HasVisibilityFragment = {
  ['visible']: (_1, _2, object: Container, value: boolean) => {
    object.visible = value;
  }
}

export const HasInteractivityFragment = {
  onWheel: (_1, _2, object: Container, value: (event: FederatedWheelEvent) => void) => {
    object.on('wheel', value)
    return () => object.off('wheel', value);
  },

  onPointerOver: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('pointerover', value)
    return () => object.off('pointerover', value);
  },
  onPointerOut: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('pointerout', value)
    return () => object.off('pointerout', value);
  },

  onPointerEnter: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('pointerenter', value)
    return () => object.off('pointerenter', value);
  },
  onPointerLeave: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('pointerleave', value)
    return () => object.off('pointerleave', value);
  },

  onRightClick: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('rightclick', value)
    return () => object.off('rightclick', value);
  },
  onRightDown: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('rightdown', value)
    return () => object.off('rightdown', value);
  },
  onRightUp: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('rightup', value)
    return () => object.off('rightup', value);
  },

  onClick: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('click', value)
    return () => object.off('click', value);
  },
  onMouseDown: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('mousedown', value)
    return () => object.off('mousedown', value);
  },
  onMouseUp: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('mouseup', value)
    return () => object.off('mouseup', value);
  },
  onMouseMove: (_1, _2, object: Container, value: (event: FederatedPointerEvent) => void) => {
    object.on('mousemove', value)
    return () => object.off('mousemove', value);
  },
}
