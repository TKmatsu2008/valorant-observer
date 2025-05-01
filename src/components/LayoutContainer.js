import { useEffect, useRef } from 'react';
import $ from 'jquery';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import { addMenuItem } from '../helpers/addMenuItems';
import TextComponent from './TextComponent';

const SAVE_STATE = false;

const LayoutContainer = ({ layoutRef, menuRef }) => {
  const menuInitialized = useRef(false); // メニュー重複防止フラグ

  useEffect(() => {
    const defaultConfig = {
      content: [{
        type: 'column',
        content: [
          {
            type: 'component',
            componentName: 'textComponent',
            componentState: { label: 'A' },
            height: 20
          },
          {
            type: 'row',
            height: 80,
            content: [
              {
                type: 'component',
                componentName: 'textComponent',
                componentState: { label: 'B' },
                width: 25
              },
              {
                type: 'component',
                componentName: 'textComponent',
                componentState: { label: 'C' },
                width: 50
              },
              {
                type: 'component',
                componentName: 'textComponent',
                componentState: { label: 'D' },
                width: 25
              }
            ]
          }
        ]
      }]
    };

    const savedState = SAVE_STATE ? localStorage.getItem('savedLayout') : null;

    const layout = new GoldenLayout(
      savedState ? JSON.parse(savedState) : defaultConfig,
      $(layoutRef.current)
    );

    layout.registerComponent('textComponent', TextComponent);

    if (SAVE_STATE) {
      layout.on('stateChanged', () => {
        const currentState = JSON.stringify(layout.toConfig());
        localStorage.setItem('savedLayout', currentState);
      });
    }

    layout.init();

    if (!menuInitialized.current) {
      addMenuItem(layout, menuRef.current, '追加 A', '追加された A');
      addMenuItem(layout, menuRef.current, '追加 B', '追加された B');
      menuInitialized.current = true;
    }
  }, [layoutRef, menuRef]);

  return null; // DOM は一切返さない
};

export default LayoutContainer;
