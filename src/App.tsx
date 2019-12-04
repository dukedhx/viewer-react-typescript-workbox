import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';

const App: React.FC = () => {
  const container:any = useRef();
  const handleScriptLoad = () =>{
    Autodesk.Viewing.Initializer({env: 'Local'}, ()=>new Autodesk.Viewing.GuiViewer3D(container.current).start('https://dukedhx.github.io/Forge-Workshop/shaver/0.svf'))
  }
  return (
    <div className="App">
      <div ref={container}>
      </div>
      <Script url='https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.*' onLoad={handleScriptLoad}></Script>
    </div>
  );
}

export default App;
