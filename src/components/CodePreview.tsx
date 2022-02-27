/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useEffect, useRef } from 'react';
import { defaultHtml } from '../utils/constants';

export interface CodePreviewProps {
  outputCode: string;
}

export function CodePreview({ outputCode }: CodePreviewProps): JSX.Element {
  const iframeRef = useRef<any>();

  // send the code to iframe
  useEffect(() => {
    // reset the html doc
    iframeRef.current.srcdoc = defaultHtml;

    // send output code as message, to the iframe
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(outputCode);
    }, 50);
  }, [outputCode]);

  return (
    <iframe title="preview" sandbox="allow-scripts" style={{ width: '100%' }} ref={iframeRef} srcDoc={defaultHtml} />
  );
}
