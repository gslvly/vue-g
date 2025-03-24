const isString = (val: any) => typeof val === "string";
const isArray = Array.isArray;

const isOn = (key: string) =>
  key.charCodeAt(0) === 111 &&
  key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);

const cacheStringFunction = (fn: (v: string) => string) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const hyphenateRE = /\B([A-Z])/g;

const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);

const isModelListener = (key: string) => key.startsWith("onUpdate:");

export { isArray, isString, isModelListener, isOn, hyphenate };
