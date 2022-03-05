/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

export function Header(): JSX.Element {
  return (
    <header
      style={{
        height: 50,
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span style={{ fontSize: '1.3em' }}>A Typescript and React playground</span>
      <span>Built with ❤️ by Vighnesh Raut</span>
    </header>
  );
}
