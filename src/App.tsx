import React, { useCallback, useEffect, useRef, useState } from 'react';

import { bundle } from './bundler';
import { debounce } from './debounce';
import { CodeEditor } from './CodeEditor';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Iframe html</title>
</head>
<body>
    <div id="root"></div>
    <script type="application/javascript">
        window.addEventListener("message", (e) => {
          try {
            eval(e.data);            
          } catch (e) {
            console.log('Error caught');
            console.error(e);
            document.getElementById("root").remove()
          }
        })
    </script>
</body>
</html>
`;

function Iframe({ outputCode }: { outputCode: string }) {
  const iframeRef = useRef<any>();

  // send the code to iframe
  useEffect(() => {
    // reset the html doc
    iframeRef.current.srcdoc = html;

    // send output code as message, to the iframe
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(outputCode);
    }, 50);
  }, [outputCode]);

  return <iframe title="preview" style={{width: '100%'}} ref={iframeRef} srcDoc={html} />;
}

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [bundling, setBundling] = useState(false);
  const [error, setError] = useState('');

  const debouncedBundle = useCallback(
    debounce(async (inputCode: string) => {
      const { outputCode, error } = await bundle(inputCode);
      setOutputCode(outputCode);
      setError(error);
      setBundling(false);
    }, 2000),
    []
  );

  // compile the code on change
  useEffect(() => {
    setBundling(true);
    debouncedBundle(inputCode);
  }, [debouncedBundle, inputCode]);

  return (
    <main
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        flexBasis: '100%',
      }}
    >
      <CodeEditor onChange={setInputCode} />
      <Iframe outputCode={outputCode} />
    </main>
  );
}

export default App;
