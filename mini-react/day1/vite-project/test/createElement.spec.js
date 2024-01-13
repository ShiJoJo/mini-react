import React from "../core/React";

it("测试props为null", () => {
  const el = React.createElement2("div", null, "hi");
  expect(el).toEqual({
    type: "div",
    props: {
      children: [
        {
          type: "TEXT_ELEMENT",
          props: {
            children: [],
            nodeValue: "hi",
          },
        },
      ],
    },
  });
});
it("测试props不为null", () => {
  const el = React.createElement2("div", null, "hi");
  expect(el).toMatchInlineSnapshot(`
    {
      "props": {
        "children": [
          {
            "props": {
              "children": [],
              "nodeValue": "hi",
            },
            "type": "TEXT_ELEMENT",
          },
        ],
      },
      "type": "div",
    }
  `);
});
