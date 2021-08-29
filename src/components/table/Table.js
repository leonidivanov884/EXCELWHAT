import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {TableSelection} from './TableSelection';
import {createTable} from './table.template';
import {resizeHandler} from './tabel.resize';
import {isCall, nextSelection, range, shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options
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

    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
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

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft',
      'ArrowRight', 'ArrowDown', 'ArrowUp']

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const {row, column} = this.selection.current.callId(true)
      const $next = this.$root.find(nextSelection(key, row, column))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


