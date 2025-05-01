import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import './App.css';

const SAVE_STATE = false; // ← falseにすると状態保存を無効化

const App = () => {
  const layoutRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const defaultConfig = {
      content: [{
        type: 'column',
        content: [{
          type: 'component',
          componentName: 'textComponent',
          componentState: { label: 'A' },
          height: 20
        }, {
          type: 'row',
          height: 80, 
          content: [{
            type: 'component',
            componentName: 'textComponent',
            componentState: { label: 'B' },
            width: 25
          }, {
            type: 'component',
            componentName: 'textComponent',
            componentState: { label: 'C' },
            width: 50
          }, {
            type: 'component',
            componentName: 'textComponent',
            componentState: { label: 'D' },
            width: 25
          }]
        }]
      }]
    };

    const savedState = SAVE_STATE ? localStorage.getItem('savedLayout') : null;

    const layout = new GoldenLayout(
      savedState ? JSON.parse(savedState) : defaultConfig,
      $(layoutRef.current)
    );

    layout.registerComponent('textComponent', function (container, state) {
      if (!window.localStorage && SAVE_STATE) {
        container.getElement().append('<h2 class="err">localStorage not supported.</h2>');
        return;
      }

      const input = $('<input type="text" />').val(state.label || '');
      const charCount = $('<div style="color: white; padding-top: 5px;" />')
        .text(`文字数: ${input.val().length}`);

      input.on('input', function () {
        const value = input.val();
        container.setState({ label: value });
        charCount.text(`文字数: ${value.length}`);
      });

      container.getElement().append('<h2 style="color: white;">保存される入力</h2>', input, charCount);
    });

    if (SAVE_STATE) {
      layout.on('stateChanged', function () {
        const currentState = JSON.stringify(layout.toConfig());
        localStorage.setItem('savedLayout', currentState);
      });
    }

    layout.init();

    const addMenuItem = (title, text) => {
      const element = $('<li class="menu-item">' + title + '</li>');
      $(menuRef.current).append(element);

      const newItemConfig = {
        title,
        type: 'component',
        componentName: 'textComponent',
        componentState: { label: text }
      };

      layout.createDragSource(element, newItemConfig);
    };

    addMenuItem('追加 A', '追加された A');
    addMenuItem('追加 B', '追加された B');
  }, []);

  return (
    <div className="app-container">
      <ul ref={menuRef} className="menu-panel" />
      <div ref={layoutRef} className="layout-panel" />
    </div>
  );
};

export default App;
