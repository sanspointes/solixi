/* @jsxImportSource solid-js */
import { createSignal, onCleanup, onMount } from "solid-js";
import { PContainer, PMesh, PMeshMaterial, PPlaneGeometry, useFrame } from "../src"
import { Mesh } from "pixi.js";
import { usePixi } from "../src/state";

export const Interactivity = () => {
  const [color, setColor] = createSignal('#ff0000');
  return (
    <PMesh position-x={100} position-y={() => 100} interactive={true} onPointerOver={() => {
      setColor('#00ff00');
    }} onPointerOut={() => {
      setColor('#ff0000');
    }}>
      <PPlaneGeometry args={[100, 100]} />
      <PMeshMaterial tint={color} />
    </PMesh>
  );
}

export const InteractivityRef = () => {
  const [color, setColor] = createSignal('#ff0000');
  const solixi = usePixi();
  let pmesh: Mesh | undefined;
  onMount(() => {
    if (!pmesh) return;
    console.log(solixi);
    const onPointerDown = () => {
      setColor('#0000ff');
    }
    const onPointerOver = () => {
      setColor('#00ff00');
    }
    const onPointerOut = () => {
      setColor('#ff0000');
    }
    pmesh.on('pointerdown', onPointerDown)
    pmesh.on('pointerup', onPointerOut)
    pmesh.on('pointerenter', onPointerOver)
    pmesh.on('pointerleave', onPointerOut)

    onCleanup(() => {
      if (!pmesh) return;
      pmesh.off('pointerdown', onPointerDown)
      pmesh.off('pointerup', onPointerOut)
      pmesh.off('pointerenter', onPointerOver)
      pmesh.off('pointerleave', onPointerOut)
    })
  })
  return (
    <PMesh ref={pmesh} position-x={100} position-y={() => 100} interactive={true} >
      <PPlaneGeometry args={[100, 100]} />
      <PMeshMaterial tint={color} />
    </PMesh>
  );
}

export const Parenting = () => {
  const [rotation, setRotation] = createSignal(0);
  const [position, setPosition] = createSignal<[number, number]>([100, 100]);
  useFrame((_, time, delta) => {
    setPosition([100 + Math.sin(time / 3000) * 20, 100 + Math.cos(time / 300) * 20]);
    setRotation(rotation() + delta / 100);
  })
  const child = (<PMesh position-x={100} position-y={100} />)

  return (
    <PContainer position-x={300} position-y={200}>
      <PMesh position={position()} rotation={rotation()}>
        <PPlaneGeometry args={[50, 50]} width={100} height={100} />
        <PMeshMaterial tint={'#ff0000'} />
        <PMesh position={position()} rotation={rotation()}>
          <PPlaneGeometry args={[50, 50]} width={100} height={100} />
          <PMeshMaterial tint={'#ff0000'} />
          <PMesh position={position()} rotation={rotation()}>
            <PPlaneGeometry args={[50, 50]} width={100} height={100} />
            <PMeshMaterial tint={'#ff0000'} />
            {child}
          </PMesh>
        </PMesh>
      </PMesh>
    </PContainer>
  )
}
