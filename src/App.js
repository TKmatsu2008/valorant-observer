import React, { useRef } from 'react';
import './App.css';
import LayoutContainer from './components/LayoutContainer';

const App = () => {
  const layoutRef = useRef(null);
  const menuRef = useRef(null);

  return (
    <div className="app-container">
      <ul ref={menuRef} className="menu-panel" />
      <div ref={layoutRef} className="layout-panel" />
      {/* LayoutContainer は UI を描画しないロジック専用 */}
      <LayoutContainer layoutRef={layoutRef} menuRef={menuRef} />
    </div>
  );
};


export default App;
