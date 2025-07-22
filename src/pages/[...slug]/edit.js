if (window.parent !== window) {
  console.log("[edit.js] Edit mode enabled");

  window.addEventListener("message", (event) => {
    const allowedOrigins = ["http://localhost:3000"];
    if (!allowedOrigins.includes(event.origin)) {
      console.warn("Blocked message from origin", event.origin);
      return;
    }

    const { type, json } = event.data;
    if (type !== "sync-json" || !json) return;

    syncPropsWithJson(json);
  });
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-widget-id]");

  if (!target) return;

  const id = target.getAttribute("data-widget-id");

  parent.postMessage({ type: "select", id }, "*");
});

function syncPropsWithJson(json) {
  for (const widget of Object.values(json)) {
    const id = widget?.props?.id;
    if (!id) continue;

    const root = document.querySelector(`[data-widget-id="${id}"]`);
    if (!root) continue;

    const nodes = root.querySelectorAll(
      "[data-props], [data-bind-href], [data-bind-src], [data-bind-title]",
    );

    nodes.forEach((node) => {
      const textPath = node.getAttribute("data-props");
      const textValue = getValueByPath(widget.props, textPath);
      if (
        textPath &&
        (typeof textValue === "string" || typeof textValue === "number")
      ) {
        node.textContent = String(textValue);
      }

      Array.from(node.attributes).forEach((attr) => {
        if (!attr.name.startsWith("data-bind-")) return;

        const attrName = attr.name.replace("data-bind-", "");
        const path = attr.value;
        const value = getValueByPath(widget.props, path);

        if (typeof value === "string" || typeof value === "number") {
          node.setAttribute(attrName, String(value));
        }
      });
    });
  }
}

function getValueByPath(obj, path) {
  return path?.split(".").reduce((acc, key) => acc?.[key], obj);
}
