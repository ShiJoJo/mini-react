const textTyp = "TEXT_ELEMENT";
// 创建textNode
const createTextNode = (text) => {
  return {
    type: textTyp,
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

const createElement2 = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
};

const render = (el, container) => {
  // console.log(el);
  const { type, props } = el;
  // 根据type创建continer
  const dom =
    type === textTyp
      ? document.createTextNode("")
      : document.createElement(type);
  Object.keys(props).map((key) => {
    if (key !== "children") {
      // 从props中对创建的节点进行赋值
      dom[key] = props[key];
    }
  });

  const { children } = el.props;
  children.forEach((child) => {
    render(child, dom);
  });

  container.append(dom);
};

export default {
  render,
  createElement2,
};
