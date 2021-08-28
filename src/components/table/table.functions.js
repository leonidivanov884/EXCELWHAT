export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCall(event) {
  return event.target.dataset.cellId
}
