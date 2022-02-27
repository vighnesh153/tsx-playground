/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/material-palenight.css';

import React, { useEffect, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import { defaultEditorCode } from '../utils/constants';

export interface CodeEditorProps {
  onChange: (newValue: string) => void;
}

export function CodeEditor({ onChange }: CodeEditorProps): JSX.Element | null {
  const [inputCode, setInputCode] = useState(defaultEditorCode);

  useEffect(() => {
    onChange(inputCode);
  }, [onChange, inputCode]);

  return (
    <CodeMirror
      value={defaultEditorCode}
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
