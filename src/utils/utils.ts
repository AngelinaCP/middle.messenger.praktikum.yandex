export type Indexed<T = unknown> = {
  [key in string]: T
}

export function isObject (obj: Indexed) {
  return typeof obj === 'object' && obj !== null;
}

export function isEqual (a: object, b: object): boolean {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) return false;

  for (const key of oldPropsKeys) {
    const oldValue = a[key as keyof object] as Indexed;
    const newValue = b[key as keyof object] as Indexed;

    const isObjects = isObject(oldValue) && isObject(newValue);
    if ((isObjects && !isEqual(oldValue, newValue)) ||
            (!isObjects && oldValue !== newValue)) {
      return false;
    }
  }
  return true;
}

export const scrollToEnd = () => {
  setTimeout(() => {
    const div = document.getElementsByClassName('chat-dialog__body');
    if (div.length) {
      div[0].scrollTo(0, div[0].scrollHeight);
    }
  }, 100);
};
