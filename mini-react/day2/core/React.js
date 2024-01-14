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

let nextWork = null;
const render = (el, container) => {
  nextWork = {
    props: {
      children: [el],
    },
    dom: container,
  };
  requestIdleCallback(workLoop);
};

const workLoop = (deadLine) => {
  let isYield = false;
  while (!isYield && nextWork) {
    nextWork = formatDom(nextWork);
    if (deadLine.timeRemaining() < 1) {
      isYield = true;
    }
  }
};

const createDom = (type) => {
  return type === textTyp
    ? document.createTextNode("")
    : document.createElement(type);
};

const updateProps = (dom, props) => {
  Object.keys(props).map((key) => {
    if (key !== "children") {
      // 从props中对创建的节点进行赋值
      dom[key] = props[key];
    }
  });
};

const initChildren = (fiber) => {
  let prevChild = null;
  fiber.props.children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      children: null,
      sibling: null,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.children = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
};

/** 处理dom节点 */
const formatDom = (fiber) => {
  // 1、先创建dom
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    fiber.parent.dom.append(dom);
    // 2、对props赋值
    updateProps(dom, fiber.props);
  }
  // 3、建立链表关系
  initChildren(fiber);
  // 4、返回下一个节点
  if (fiber.children) {
    return fiber.children;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling;
};

export default {
  render,
  createElement2,
};
