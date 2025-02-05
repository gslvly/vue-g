import { getCurrentInstance, warn } from "@vue/runtime-core";
import { EMPTY_OBJ } from "@vue/shared";

export function useCssModule(name = "$style"): Record<string, string> {
  const instance = getCurrentInstance()!;
  if (!instance) {
    return EMPTY_OBJ;
  }
  const modules = instance.type.__cssModules;
  if (!modules) {
    return EMPTY_OBJ;
  }
  const mod = modules[name];
  if (!mod) {
    return EMPTY_OBJ;
  }
  return mod as Record<string, string>;
}
