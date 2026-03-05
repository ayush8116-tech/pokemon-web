export const createFragment = ([tag, attributes, content]) => {
  const element = document.createElement(tag);

  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  if (typeof content === "string" || typeof content === "number") {
    element.innerText = content;
    return element;
  }

  const children = content.map(createFragment);
  element.append(...children);

  return element;
};

export const format = (data) => data[0].toUpperCase() + data.slice(1);
