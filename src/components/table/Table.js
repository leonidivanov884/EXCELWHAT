import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {TableSelection} from './TableSelection';
import {createTable} from './table.template';
import {resizeHandler} from './tabel.resize';
import {isCall, shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click']
    });
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-cell-id="A:1"]')
    this.selection.select($cell)
  }


  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onClick(event) {
    if (isCall(event)) {
      if (!event.shiftKey) {
        const $target = $(event.target)
        this.selection.select($target)
      } else {
        const $target = $(event.target)
        const target = $target.callId(true)
        const current = this.selection.current.callId(true)
        const cols = range(current.column, target.column)
        const rows = range(current.row, target.row)

        const ids = cols.reduce((acc, col) => {
          const letter = String.fromCharCode(64 + col)
          rows.forEach(row => acc.push(`${letter}:${row}`))
          return acc
        }, [])
        const $cells = ids.map(id => this.$root.find(`[data-cell-id="${id}"]`))

        this.selection.selectGroup($cells)
      }
    }
  }
}

function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}