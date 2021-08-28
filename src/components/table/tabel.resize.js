import {$} from '../../core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizble"]')
  const coords = $parent.getCoords()
  console.log(coords)
  const type = event.target.dataset.resize
  const cells = $root.findAll(`[data-cell-col="${$parent.data.keyCol}"]`)
  let value;
  $parent.$el.classList.add('inResize')

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.clientX - coords.right
      value = coords.width + delta
      $parent.css({width: value + 'px'})
      cells.forEach(it => it.style.width = value + 'px')
    } else {
      const delta = e.clientY - coords.bottom
      const value = coords.height + delta
      $parent.css({height: value + 'px'})
    }
  }

  document.onmouseup = () => {
    $parent.$el.classList.remove('inResize')
    document.onmousemove = null
    document.onmouseup = null
  }
}