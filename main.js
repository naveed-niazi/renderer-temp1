import DS from "./ds/index.js";

const SELECTED_DS = DS["mui"];


function normalizeName(name) {
  const normalized = Object.keys(SELECTED_DS).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return normalized || name;
}

function renderInIframe(jsx) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<!DOCTYPE html><body>${jsx}</body>`,
    "text/html"
  );
  const nodes = doc.body.childNodes;

  function transform(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const type = normalizeName(node.tagName.toLowerCase());
      const props = {
        children: node.childNodes.length
          ? transformChildren(node.childNodes)
          : "",
      };

      for (let attr of node.attributes) {
        props[attr.name] = attr.value;
      }

      if (SELECTED_DS[type]) {
        return SELECTED_DS[type](props);
      } else {
        return `<${type} ${Object.entries(props)
          .filter(([key]) => key !== "children")
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ")}>${props.children}</${type}>`;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim();
    }
    return "";
  }

  function transformChildren(childNodes) {
    return Array.from(childNodes).map(transform).join("");
  }

  let code = transformChildren(nodes);
  console.log("-+-=",code);
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  iframe.style.width = "100%";
  iframe.style.height = "500px";
  iframe.contentDocument.open();
  let html = `
  <html class="light text-[16px]">
      <head>
          <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400" rel="stylesheet" />
          <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
              * {
                  font-family: "Inter", sans-serif;
              }
              ::-webkit-scrollbar {
                display: none;
              }
          </style>
      </head>
      <body class="p-4">
          ${code}
      </body>
  </html>
  `;
  iframe.contentDocument.write(html);
  iframe.contentDocument.close();
}

// Example usage
const jsxCode = `
<Button variant="outlined" size="large" color="light">Dark</Button>
`;

renderInIframe(jsxCode);
