export function processAttributesAndClasses(props, attributeHandlers) {
  let classes = "";
  let otherAttributes = "";

  for (let [key, value] of Object.entries(props)) {
    if (key in attributeHandlers) {
      const result = attributeHandlers[key](value);
      classes += ` ${result.classes}`;
      if (result.attributes) {
        otherAttributes += ` ${Object.entries(result.attributes)
          .map(([attrKey, attrValue]) =>
            attrValue === true ? attrKey : `${attrKey}="${attrValue}"`
          )
          .join(" ")}`;
      }
    } else if (key !== "children") {
      otherAttributes += ` ${key}="${value}"`;
    }
  }

  return { classes: classes.trim(), otherAttributes };
}

// we can add other methods that might come in handle while working with components
// We might be using them once we start working with more complex components I guess