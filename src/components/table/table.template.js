const CODES = {
  A: 65,
  Z: 90
}

function toColumn(el) {
  return `<div class="column">${el}</div>`
}

function toCell() {
  return `<div class="cell" contentEditable=""></div>`
}

function createRow(content, index = null) {
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 35) {
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
        .map(toCell)
        .join('')

    rows.push(createRow(cells, i))
  }

  return rows.join('')
}