import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
/* 

<div id="parent">
  <div id=child>
    <h1>I'm h1 Tag</h1>
    <h2>I'm h2 Tag</h2>
  </div>
  <div id=child2>
    <h1>I'm h1 Tag</h1>
    <h2>I'm h2 Tag</h2>
  </div>
</div>

ReactElement(Object) => HTML(Browser Understands)

*/

// const parent = React.createElement('div', { id: 'parent' }, [
//   React.createElement('div', { id: 'child' }, [
//     React.createElement('h1', {}, 'This is a project'),
//     React.createElement('h2', {}, "I'm h2 Tag"),
//   ]),
//   React.createElement('div', { id: 'child2' }, [
//     React.createElement('h1', {}, "I'm h1 Tag"),
//     React.createElement('h2', {}, "I'm h2 Tag"),
//   ]),
// ]);

// JSX

console.log(parent);

const AppLayout=()=>{
  return(
   <Body/>
  )
}

// const heading = React.createElement(
//   'h1',
//   { id: 'heading', className: 'head' },
//   'Hello World from React!'
// ); // It's the job of Core React to create an element i.e, heading in this case

// React Element is normal JavaScript Object{}

// console.log(heading); // object
const root = ReactDOM.createRoot(document.getElementById('root')); // It's the job of ReactDOM to create root i.e, heading in this case, bcz root is a dom element which is rendered to be on browser. This root is the place where all React code will run.

// root.render(heading);
root.render(<AppLayout></AppLayout>);