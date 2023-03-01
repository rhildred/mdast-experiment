import {u} from 'unist-builder'
import {map} from 'unist-util-map'

const tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('node', [u('leaf', 'leaf 2')]),
  u('void'),
  u('leaf', 'leaf 3')
])

const next = map(tree, (node) => {
  return node.type === 'leaf'
    ? Object.assign({}, node, {value: 'CHANGED'})
    : node
})

console.dir(next, {depth: null})