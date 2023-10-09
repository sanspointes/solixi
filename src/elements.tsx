import { Container as PixiContainer } from '@pixi/display';
import {
    Mesh as PixiMesh,
    MeshGeometry as PixiMeshGeometry,
    MeshMaterial as PixiMeshMaterial,
} from '@pixi/mesh';
import { Sprite as PixiSprite } from '@pixi/sprite';

import { PlaneGeometry as PixiPlaneGeometry } from '@pixi/mesh-extras';
import { Texture } from '@pixi/core';
import {
    Graphics as PixiGraphics,
    GraphicsGeometry as PixiGraphicsGeometry,
} from '@pixi/graphics';
import { Solixi, SolixiState } from './state';
import {
    HasNameFragment,
    HasParentLayerFragment,
    HasPositionFragment,
    HasRotationFragment,
    HasScaleFragment,
    HasVisibilityFragment,
} from './prop-fragments';

import { Text as PixiText } from '@pixi/text';
import { ClassProps, ExtraPropHandler } from '@bearbroidery/constructables';

export const temp = (a: number) => a + 1;

const ContainerExtraProps = {
    ...HasNameFragment,
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasParentLayerFragment,
};
export type ContainerProps = ClassProps<
    SolixiState,
    typeof PixiContainer,
    typeof ContainerExtraProps
>;
export const Container = Solixi.wrapConstructable(PixiContainer, {
    // @ts-expect-error ; Hard to type parent of attach function
    attach: (_, b: PixiContainer, c) => {
        b.addChild(c);
        return () => b.removeChild(c);
    },
    defaultArgs: [],
    extraProps: ContainerExtraProps,
});

/**
 * Mesh
 */
const MeshExtraProps = {
    ...HasNameFragment,
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasParentLayerFragment,
};
export type MeshProps = ClassProps<
    SolixiState,
    typeof PixiMesh,
    typeof MeshExtraProps
>;
export const Mesh = Solixi.wrapConstructable(PixiMesh<PixiMeshMaterial>, {
    // @ts-expect-error ; Hard to type parent of attach function
    attach: (_, b: PixiContainer, c) => {
        b.addChild(c);
        return () => b.removeChild(c);
    },
    defaultArgs: () =>
        [
            new PixiPlaneGeometry(),
            new PixiMeshMaterial(Texture.WHITE),
        ] as ConstructorParameters<typeof PixiMesh<PixiMeshMaterial>>,
    extraProps: MeshExtraProps,
});

/**
 * Graphics
 */
const GraphicsExtraProps = {
    ...HasNameFragment,
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasParentLayerFragment,
};
export type GraphicsProps = ClassProps<
    SolixiState,
    typeof PixiGraphics,
    typeof GraphicsExtraProps
>;
export const Graphics = Solixi.wrapConstructable(PixiGraphics, {
    // @ts-expect-error ; Hard to type parent of attach function
    attach: (_, b: PixiContainer, c) => {
        b.addChild(c);
        return () => b.removeChild(c);
    },
    defaultArgs: (_ctx) =>
        [new PixiGraphicsGeometry()] as ConstructorParameters<
            typeof PixiGraphics
        >,
    extraProps: GraphicsExtraProps,
});

/**
 * Sprite
 */
const SpriteExtraProps = {
    ...HasNameFragment,
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasParentLayerFragment,
};
export type SpriteProps = ClassProps<
    SolixiState,
    typeof PixiGraphics,
    typeof SpriteExtraProps
>;
export const Sprite = Solixi.wrapConstructable(PixiSprite, {
    // @ts-expect-error ; Hard to type parent of attach function
    attach: (_, b: PixiContainer, c) => {
        b.addChild(c);
        return () => b.removeChild(c);
    },
    defaultArgs: (_ctx) =>
        [Texture.WHITE] as ConstructorParameters<typeof PixiSprite>,
    extraProps: SpriteExtraProps,
});

/**
 * Text
 */
const updateTextHandler: ExtraPropHandler<
    SolixiState,
    typeof PixiText,
    string
> = (_1, _2, object, value: string) => {
    object.text = value;
    object.updateText(true);
};

const TextExtraProps = {
    ...HasNameFragment,
    ...HasPositionFragment,
    ...HasScaleFragment,
    ...HasVisibilityFragment,
    ...HasRotationFragment,
    ...HasParentLayerFragment,
    text: updateTextHandler,
};
export type TextProps = ClassProps<
    SolixiState,
    typeof PixiText,
    typeof TextExtraProps
>;
new PixiText();
export const Text = Solixi.wrapConstructable(PixiText, {
    // @ts-expect-error ; Hard to type parent of attach function
    attach: (_, b: PixiContainer, c) => {
        b.addChild(c);
        return () => b.removeChild(c);
    },
    defaultArgs: (_ctx) =>
        [undefined, undefined, undefined] as [undefined, undefined, undefined],
    extraProps: TextExtraProps,
});

export const PlaneGeometry = Solixi.wrapConstructable(PixiPlaneGeometry, {
    attach: 'geometry',
    defaultArgs: [1, 1, 1, 1],
    extraProps: {},
});

export const GraphicsGeometry = Solixi.wrapConstructable(PixiGraphicsGeometry, {
    attach: 'geometry',
    defaultArgs: [],
    extraProps: {},
});

export const MeshGeometry = Solixi.wrapConstructable(PixiMeshGeometry, {
    attach: 'geometry',
    defaultArgs: [],
    extraProps: {},
});

export const MeshMaterial = Solixi.wrapConstructable(PixiMeshMaterial, {
    attach: 'material',
    defaultArgs: [Texture.WHITE],
    extraProps: {},
});
