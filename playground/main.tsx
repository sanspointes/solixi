/* @jsxImportSource solid-js */
import * as DEMOS from './Demos';
import {  Dynamic, render } from 'solid-js/web';
import { Canvas, PContainer } from '../src'
import { Scene } from './Scene'
import { createSignal, For } from 'solid-js';

const App = () => {
  const [demo, setDemo] = createSignal<keyof typeof DEMOS>('Parenting');

  return (
    <div>
    <fieldset style={{"display":"flex"}} onChange={(e) => {
        setDemo(e.target.id as keyof typeof DEMOS)
      }}>
      <For each={Object.keys(DEMOS)}>
        {(name) => (
          <>
            <label for={name}>{name}</label>
            <input id={name} type="radio" value={name} checked={demo() === name} />
          </>
        )}
      </For>
    </fieldset>
      <Canvas devtools={true}>
        <PContainer>
          <Dynamic component={DEMOS[demo()]} />
        </PContainer>
      </Canvas>
    </div>
  )
}

render(() => <App />, document.getElementById('root')!);
