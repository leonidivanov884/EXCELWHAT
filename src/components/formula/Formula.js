import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <i class="excel__formula-fx">f(x)</i>
      <input type="text" spellcheck="false">
    `
  }

  onInput(e) {
    console.log('Formula onInput', e)
  }


  onClick() {

  }
}
