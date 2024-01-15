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

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
    },
  };
};

let nextWorkOfUnit = null;
let rootFiber = null;
const render = (el, container) => {
  nextWorkOfUnit = {
    props: {
      children: [el],
    },
    dom: container,
  };
  requestIdleCallback(workLoop);
  rootFiber = nextWorkOfUnit;
};

const workLoop = (deadLine) => {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);
    if (deadLine.timeRemaining() < 1) {
      shouldYield = true;
    }
  }
  // vdom处理完成后进行dom节点插入
  if (!nextWorkOfUnit) {
    commitRoot();
  }
  // requestIdleCallback(workLoop);
};

/** 插入根节点 */
const commitRoot = () => {
  commitDom(rootFiber.child);
};

const commitDom = (fiber) => {
  if (!fiber) return;
  let parentFiber = fiber.parent;
  // 循环获取父级节点
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }
  if (fiber.dom) {
    parentFiber.dom.append(fiber.dom);
  }
  commitDom(fiber.child);
  commitDom(fiber.sibling);
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

const initChildren = (fiber, children) => {
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      sibling: null,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  });
};

/** 处理函数组件 */
const updateFunctionComponent = (fiber) => {
  const children = [fiber.type(fiber.props)];
  // 3、建立链表关系
  initChildren(fiber, children);
};

/** 处理普通组件 */
const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type));
    // fiber.parent.dom.append(dom);
    // 2、对props赋值
    updateProps(dom, fiber.props);
  }
  const children = fiber.props.children;
  // 3、建立链表关系
  initChildren(fiber, children);
};

/** 处理dom节点 */
const performWorkOfUnit = (fiber) => {
  const isFunctionComponent = typeof fiber.type === "function";
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 4、返回下一个节点
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
};

export default {
  render,
  createElement,
};
