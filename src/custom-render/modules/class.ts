
export function patchClass(
  el: Element,
  value: string | null,
): void {
  if (value == null) {
    el.removeAttribute("class");
  } else {
    el.className = value;
  }
}
