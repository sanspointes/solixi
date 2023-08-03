/* @jsxImportSource solid-js */
import { createRAF } from '@solid-primitives/raf';

import { Show, createSignal, onMount } from "solid-js"
import { PContainer, PMesh, PMeshMaterial, PPlaneGeometry, useFrame } from "../src"
import { Mesh, MeshMaterial } from 'pixi.js';

export const Scene = () => {
  const [position, setPosition] = createSignal([100, 100], {
  });
  const [visible, setVisible] = createSignal(false);

  useFrame((state, time, delta) => {
    setPosition([200 + Math.sin(time / 1000) * 100, 200 + Math.cos(time / 1000) * 100])
  });

  const toggleVisibility = () => {
    console.log('Toggling visibility')
    setVisible(!visible());
    setTimeout(toggleVisibility, 1000);
  }

  let meshRef: Mesh | undefined;
  onMount(() => {
    toggleVisibility();
  })

  return <PContainer>
    { visible() && (
      <PMesh ref={meshRef} position={position} scale={[1, 1]}>
        <PPlaneGeometry args={[100, 100]} width={100} height={100} />
        <PMeshMaterial tint={'#ff0000'} />
      </PMesh>
    )}
  </PContainer>
}
