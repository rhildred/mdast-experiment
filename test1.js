import fs from 'node:fs/promises'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toMarkdown} from 'mdast-util-to-markdown'
import {mdxjs} from 'micromark-extension-mdxjs'
import {mdxFromMarkdown, mdxToMarkdown} from 'mdast-util-mdx'

const doc = await fs.readFile('example.mdx')

const tree = fromMarkdown(doc, {
  extensions: [mdxjs()],
  mdastExtensions: [mdxFromMarkdown()]
})

console.log(tree)

const out = toMarkdown(tree, {extensions: [mdxToMarkdown()]})

console.log(out)