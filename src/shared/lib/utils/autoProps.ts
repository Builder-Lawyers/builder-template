type KeyMap = Map<unknown, string>;

export function autoProps<T extends object>(
  props: T,
): T & {
  $: (
    value: unknown,
    root?: boolean,
    short?: boolean,
  ) => Record<string, string>;
} {
  const keyMap: KeyMap = new Map();
  const widgetId = (props as any)?.id;

  function makeProxy(obj: any, path: string[] = []): any {
    if (obj === null || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
      const proxyArray = obj.map((item, index) => {
        const currentPath = [...path, index.toString()].join(".");
        keyMap.set(item, currentPath);
        return makeProxy(item, [...path, index.toString()]);
      });

      keyMap.set(proxyArray, path.join(".")); // 👈 map сам масив!
      return proxyArray;
    }

    const proxy: any = new Proxy(obj, {
      get(target, prop: string | symbol) {
        if (typeof prop === "symbol") return target[prop];

        const value = target[prop];
        const currentPath = [...path, prop.toString()].join(".");

        keyMap.set(value, currentPath);

        return makeProxy(value, [...path, prop.toString()]);
      },
    });

    keyMap.set(proxy, path.join(".")); // 👈 map сам об'єкт

    return proxy;
  }

  const proxy = makeProxy(props);

  Object.defineProperty(proxy, "$", {
    value: (
      value: unknown,
      root = false,
      short = false,
    ): Record<string, string> => {
      const key = keyMap.get(value);
      const result: Record<string, string> = {};

      if (key) {
        result["data-props"] = short ? key.split(".").at(-1)! : key;
      }

      if (root && typeof widgetId === "string") {
        result["data-widget-id"] = widgetId;
      }

      return result;
    },
    enumerable: false,
  });

  return proxy as any;
}
