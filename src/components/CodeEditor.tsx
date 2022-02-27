/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useEffect, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/material-palenight.css';

const defaultValue = `
import React from "react"
import ReactDOM from "react-dom"

const App = () => {
  return (
    <div>Hi world from my React application.</div>
  );
};

const appRoot = document.getElementById("root");
ReactDOM.render(<App />, appRoot);
`;

export interface CodeEditorProps {
  onChange: (newValue: string) => void;
}

export function CodeEditor({ onChange }: CodeEditorProps): JSX.Element | null {
  const [inputCode, setInputCode] = useState(defaultValue);

  useEffect(() => {
    onChange(inputCode);
  }, [onChange, inputCode]);

  return (
    <CodeMirror
      value={defaultValue}
      options={{
        mode: 'jsx',
        theme: 'material-palenight',
        lineNumbers: true,
      }}
      onChange={(editor, data, value) => {
        setInputCode(value);
      }}
    />
  );
}
