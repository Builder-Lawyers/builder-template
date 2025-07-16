type KeyMap = Map<unknown, string>;

export function autoProps<T extends object>(
  props: T,
): T & { $: (value: unknown) => { "data-props": string } | {} } {
  const keyMap: KeyMap = new Map();

  function makeProxy(obj: any, path: string[] = []): any {
    if (typeof obj !== "object" || obj === null) return obj;

    const proxy = new Proxy(obj, {
      get(target, prop: string) {
        const value = target[prop];
        const currentPath = [...path, prop].join(".");

        if (typeof value === "object" && value !== null) {
          const subProxy = makeProxy(value, [...path, prop]);
          keyMap.set(subProxy, currentPath);
          return subProxy;
        }

        keyMap.set(value, currentPath);
        return value;
      },
    });

    return proxy;
  }

  const proxy = makeProxy(props);

  // Зручна коротка функція props.$(val)
  (proxy as any).$ = (value: unknown) => {
    const key = keyMap.get(value);
    return key ? { "data-props": key } : {};
  };

  return proxy as any;
}
