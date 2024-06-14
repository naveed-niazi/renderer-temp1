import { processAttributesAndClasses } from "../utils.js";


const buttonAttributes = {
  variant: (value) => {
    const variants = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      dashed:
        "border border-dashed border-gray-300 text-gray-700 hover:bg-gray-100",
      link: "text-blue-500 hover:underline",
      text: "text-gray-700 hover:text-gray-800",
      // Add other variants as needed
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
      blue: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      alternative:
        "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",
      light:
        "bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
      green:
        "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      red: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      yellow:
        "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
      purple:
        "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
      // Add other colors as needed
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