import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscibers = []
    this.prepare()
  }
  // Настраиваем наш компонет до init
  prepare() {

  }

  // Возвращаем шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателей о событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscibers.push(unsub)
  }

  // Инициализируем компонент
  // Добовление DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscibers.forEach(unsub => unsub())
  }
}
