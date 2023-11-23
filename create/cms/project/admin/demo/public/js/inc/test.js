delete window.Yavi;
class Yavi {
  static x(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => typeof child === 'object' ? child : Yavi.createTextElement(child))
      }
    };
  }
  static createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: []
      }
    };
  }
  static render(element, container) {
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
    Yavi.updateDomProperties(dom, [], element.props);
    element.props.children.forEach(child => Yavi.render(child, dom));
    container.appendChild(dom);
  }
  static updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = name => name.startsWith('on');
    const isAttribute = name => !isEvent(name) && name !== 'children';

    // Remove old or changed event listeners
    Object.keys(prevProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

    // Remove old attributes
    Object.keys(prevProps).filter(isAttribute).forEach(name => {
      dom[name] = null;
    });

    // Add new or changed event listeners
    Object.keys(nextProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });

    // Set new attributes
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
      dom[name] = nextProps[name];
    });
  }
}

// Sử dụng class Yavi
const element = Yavi.x('div', {
  id: 'container'
}, Yavi.x('h1', null, 'Hello, Yavi!'), Yavi.x('p', null, 'This is a simple library.'));
const container = document.querySelector(".login");
Yavi.render(element, container);