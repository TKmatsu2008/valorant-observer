import $ from 'jquery';

import React from 'react';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

function TextComponent(container, state) {
  const wrapper = $('<div style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;" />');

  if (state.label === 'C') {
    // C のときだけ画像を表示（かつアスペクト比維持）
    const image = $('<img />')
      .attr('src', process.env.PUBLIC_URL + '/valo_playscreen.png')
      .css({
        display: 'block',
        height: '100%',       // 高さに合わせて表示
        width: 'auto',        // 幅は高さに合わせて自動調整（アスペクト比維持）
        maxWidth: '100%',     // 親より大きくならない
        objectFit: 'contain',
      });

    wrapper.append(image);
  } else {
    // 他のラベル（A, B, Dなど）のときは入力欄と文字数表示
    const input = $('<input type="text" />').val(state.label || '');
    const charCount = $('<div style="color: white; padding-top: 5px;" />')
      .text(`文字数: ${input.val().length}`);

    input.on('input', () => {
      const value = input.val();
      container.setState({ label: value });
      charCount.text(`文字数: ${value.length}`);
    });

    wrapper.css('flexDirection', 'column');
    wrapper.append(
      '<h2 style="color: white;">保存される入力</h2>',
      input,
      charCount
    );
  }

  container.getElement().css({ height: '100%', width: '100%' }).append(wrapper);
}

export default TextComponent;

  