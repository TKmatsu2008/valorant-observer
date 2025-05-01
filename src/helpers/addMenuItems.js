import $ from 'jquery';

export const addMenuItem = (layout, menuEl, title, text) => {
  const element = $('<li class="menu-item">' + title + '</li>');
  $(menuEl).append(element);

  const newItemConfig = {
    title,
    type: 'component',
    componentName: 'textComponent',
    componentState: { label: text }
  };

  layout.createDragSource(element, newItemConfig);
};
export const addMenuItems = (layout, menuEl) => {
  const items = [
    { title: '追加 A', text: '追加された A' },
    { title: '追加 B', text: '追加された B' },
    { title: '追加 C', text: '追加された C' }
  ];

  items.forEach(item => {
    addMenuItem(layout, menuEl, item.title, item.text);
  });
};
export const removeMenuItem = (menuEl, title) => {
  const item = $(menuEl).find('.menu-item').filter((_, el) => $(el).text() === title);
  if (item.length) {
    item.remove();
  }
};
//       layout.on('stateChanged', () => {
//         localStorage.setItem('savedLayout', JSON.stringify(layout.toConfig()));
//       });
//     }