import React, {useCallback, useEffect, useRef, useState} from 'react';

import {bundle} from "./bundler";
import {debounce} from "./debounce";

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

  return <iframe ref={iframeRef} srcDoc={html} />;
}

function App() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState('');

  const debouncedBundle = useCallback(debounce(async (inputCode: string) => {
    const { outputCode, error } = await bundle(inputCode);
    setOutputCode(outputCode);
    console.log(outputCode);
  }, 2000), []);

  // compile the code on change
  useEffect(() => {
    debouncedBundle(inputCode);
  }, [debouncedBundle, inputCode]);

  return (
    <div>
      <textarea style={{
        width: 600,
        height: 400
      }} value={inputCode} onChange={e => setInputCode(e.target.value)} />

      <hr/>

      <Iframe outputCode={outputCode} />
    </div>
  );
}

export default App;
