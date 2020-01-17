import React, {useRef, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Script from 'react-load-script';
import * as serviceWorker from './serviceWorker';

const modelURL = 'https://dukedhx.github.io/Forge-Workshop/shaver/0.svf';
const viewerLibaryURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.*';
const viewerStylesheetURL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css?v=v7.*';

let viewerLibraryLoaded = false;
let viewerStyleLoaded = false;
let viewerLoading = false;

const App: React.FC = () => {
  const container:any = useRef();

  const [loadViewerLibrary, setLoadViewerLibrary] = useState(false);

  const handleStyleLoad = () => {
    viewerStyleLoaded = true;
    viewerLibraryLoaded && loadViewer(modelURL)
  }

  const handleScriptLoad = () => {
    viewerLibraryLoaded = true;
    viewerStyleLoaded && loadViewer(modelURL)
  }

  const loadViewer = (svfUrl:string) => {
    if(!viewerLoading){
      viewerLoading = true;
      Autodesk.Viewing.Initializer({env: 'Local'}, ()=>new Autodesk.Viewing.GuiViewer3D(container.current).start(svfUrl));
    }
  }

  const loadStyleSheet = (href:string) => {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.href = href;
    styles.onload = handleStyleLoad;
    document.getElementsByTagName('head')[0].appendChild(styles);
  }


  useEffect(() => {

    async function loadServiceWorker(){
      await new Promise(r=>{serviceWorker.register({onSuccess:()=>r()})});
      setLoadViewerLibrary(true);
      loadStyleSheet(viewerStylesheetURL);
    }
    loadServiceWorker()
  });

  return (
    <div className="App">
      <div ref={container}>
      </div>
      {loadViewerLibrary?<Script url={viewerLibaryURL} onLoad={handleScriptLoad}></Script>:null}
    </div>
  );
}

export default App;
