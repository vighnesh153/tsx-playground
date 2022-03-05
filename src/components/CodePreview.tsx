/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useEffect, useRef } from 'react';

import { Spinner } from './Spinner';
import { defaultHtml } from '../utils/constants';

export interface CodePreviewProps {
  bundling: boolean;
  bundleError: string;
  outputCode: string;
}

export function CodePreview({ bundling, bundleError, outputCode }: CodePreviewProps): JSX.Element {
  const iframeRef = useRef<any>();

  // send the code to iframe
  useEffect(() => {
    if (bundling) return;

    // reset the html doc
    iframeRef.current.srcdoc = defaultHtml;

    // send output code as message, to the iframe
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage?.(outputCode);
    }, 50);
  }, [outputCode, bundling]);

  if (bundling) {
    return (
      <div style={{ ...rootStyles, padding: '1rem' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <iframe
      title="preview"
      sandbox="allow-same-origin allow-scripts"
      style={rootStyles}
      ref={iframeRef}
      srcDoc={defaultHtml}
    />
  );
}

const rootStyles: React.CSSProperties = {
  width: '100%',
  borderWidth: 2,
  borderColor: 'initial',
  borderStyle: 'inset',
};
