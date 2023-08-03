import { Container, GraphicsGeometry, Mesh, MeshMaterial, PlaneGeometry, Texture } from "pixi.js";
import { Solixi } from "./state";
import { HasInteractivityFragment, HasPositionFragment, HasRotationFragment, HasScaleFragment, HasVisibilityFragment } from "./prop-fragments";

export const PContainer = Solixi.wrapConstructable(Container, {
  attach: (_, b: Container, c: Container) => {
    b.addChild(c);
    return () => b.removeChild(c);
  },
  defaultArgs: [],
  extraProps: {
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasInteractivityFragment,
  }
});

export const PMesh = Solixi.wrapConstructable(Mesh<MeshMaterial>, {
  attach: (_, b: Container, c: Mesh<MeshMaterial>) => {
    b.addChild(c);
    return () => b.removeChild(c);
  },
  defaultArgs: [new PlaneGeometry(), new MeshMaterial(Texture.WHITE)],
  extraProps: {
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasInteractivityFragment,
  }
});

export const PPlaneGeometry = Solixi.wrapConstructable(PlaneGeometry, {
  attach: 'geometry',
  defaultArgs: [1, 1, 1, 1],
  extraProps: {

  }
})

export const PGraphicsGeometry = Solixi.wrapConstructable(GraphicsGeometry, {
  attach: 'geometry',
  defaultArgs: [],
  extraProps: {
  }
})

export const PMeshMaterial = Solixi.wrapConstructable(MeshMaterial, {
  attach: 'material',
  defaultArgs: [Texture.WHITE],
  extraProps: {

  }
})
