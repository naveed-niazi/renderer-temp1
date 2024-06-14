import { processAttributesAndClasses } from "../utils.js";

const buttonAttributes = {
  variant: (value) => {
    const variants = {
      contained: "bg-blue-500 hover:bg-blue-600 text-white",
      outlined: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      text: "text-blue-500 hover:underline",
      // here we can keep adding more variant with exact name as in that design system options
    };
    return { classes: variants[value] || "" };
  },
  size: (value) => {
    const sizes = {
      small: "text-xs py-1 px-2.5",
      medium: "text-sm py-2 px-3",
      large: "text-lg py-3 px-4.5",
    };
    return { classes: sizes[value] || sizes.medium };
  },
  color: (value) => {
    const colors = {
      primary: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300",
      secondary: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-300",
    };
    return { classes: colors[value] || "" };
  },
  disabled: (value) =>
    value === "true"
      ? {
          classes: "opacity-50 cursor-not-allowed",
          attributes: { disabled: true },
        }
      : { classes: "", attributes: {} },
};


export default (props) => {
  const { classes, otherAttributes } = processAttributesAndClasses(
    props,
    buttonAttributes
  );
  return `<button class="font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${classes}"${otherAttributes}>${
    Array.isArray(props.children) ? props.children.join("") : props.children
  }</button>`;
};
