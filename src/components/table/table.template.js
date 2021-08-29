const CODES = {
  A: 65,
  Z: 90
}

function toColumn(el, index) {
  const letter = toChar(null, index)
  return `<div class="column" data-type="resizble" data-key-col="${letter}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
   </div>
  `
}

function toCell(row, index) {
  const letter = toChar(null, index)
  return `
    <div class="cell" 
      contentEditable="" 
      data-cell-col="${letter}" 
      data-cell-id="${letter}:${row}" 
      data-cell-row="${row}">
    </div>
  `
}

function createRow(content, index = null) {
  return `
    <div class="row" data-type="resizble" data-key-row="${index}">
        <div class="row-info">
            ${index ? index : ''}
            <div class="row-resize" data-resize="row"></div>
        </div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 50) {
  const colsCount = CODES.Z - CODES.A + 1

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  const rows = []

  rows.push(createRow(cols))

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map((item, index) => toCell(i, index))
        .join('')

    rows.push(createRow(cells, i))
  }

  return rows.join('')
}