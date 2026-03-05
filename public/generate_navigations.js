import { createFragment } from "./generate_cardfragment.js";

export const displaySidebar = (pokemons) => {
  const sidebarDom = [
    "form",
    { class: "sidebar", action: "/navigation",method:"get" },
    [
      [
        "button",
        { name: "type", value: "all", id: "all", type : "submit" },
        "All",
      ],
      ...Object.keys(pokemons).map(
        (type) => ["button", { name: "type", value: type, id: type, type : "submit" }, type]
      ),
    ],
  ];

  const sidebar = createFragment(sidebarDom);

  return sidebar;
};
