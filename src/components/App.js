import React ,{useEffect} from 'react';   
import Editor from './Editor'
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const[html,setHtml] = useLocalStorage('');
  const[css,setCss] = useLocalStorage('');
  const[js,setJs] = useLocalStorage('');
  const[srcDoc,setsrcDoc] = useLocalStorage('');

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setsrcDoc(
        `
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `
      )
    }, 250);

    return ()=> clearTimeout(timeout)
  } ,[html,css,js])


  return (
    <>
    <div className='pane top-pane'>
       <Editor
       language = 'xml'
        displayName ='HTML'
        value={html}
        onChange={setHtml}
       />
       <Editor
       language = 'css'
        displayName ='CSS'
        value={css}
        onChange={setCss}
       />
        <Editor
       language = 'javascript'
        displayName ='JAVASCRIPT'
        value={js}
        onChange={setJs}
       />
      </div> 
     <div className ='pane'>
      <iframe
      srcDoc={srcDoc}
      title ="output"
      sandbox="allow-scripts"
      frame-border ="0"
      width="100%"
      height = "100%"
      
      />
    </div>
    </>
  );
}

export default App;
