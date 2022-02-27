import React, { useCallback, useEffect, useState } from 'react';

import { bundle } from './bundler';
import { debounce } from './debounce';
import { CodeEditor } from './CodeEditor';
import { CodePreview } from './CodePreview';
import { Header } from './Header';

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
    setError('');
    debouncedBundle(inputCode);
  }, [debouncedBundle, inputCode]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main
        className="container"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'stretch',
          flexBasis: '100%',
        }}
      >
        <CodeEditor onChange={setInputCode} />
        <CodePreview outputCode={outputCode} />
      </main>
    </div>
  );
}

export default App;
