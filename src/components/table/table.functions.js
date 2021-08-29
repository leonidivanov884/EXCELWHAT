export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCall(event) {
  return event.target.dataset.cellId
}


export function nextSelection(key, row, column) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      column++
      break
    case 'ArrowLeft':
      column <= 1 ? null : column--
      break
    case 'ArrowUp':
      row <= 1 ? null : row--
      break
  }
  column = String.fromCharCode(64 + column)
  return `[data-cell-id="${column}:${row}"]`
}
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}