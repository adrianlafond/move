
export function isNotModified(event: KeyboardEvent) {
  return !event.altKey && !event.ctrlKey && !event.shiftKey;
}

export function isCtrl(event: KeyboardEvent) {
  return !event.altKey && event.ctrlKey && !event.shiftKey;
}
