import React from 'react';

import { Header } from './Header';
import { Main } from './Main';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
