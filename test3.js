import {map} from 'unist-util-map';
import oCreds from './creds.json' assert { type: "json" };
import fetch from 'node-fetch';
import {Headers} from 'node-fetch';
import fs from 'fs';



async function asyncMap() {
  const headers = new Headers();
  headers.append('X-Figma-Token', oCreds.DEV_TOKEN);
  const baseUrl = 'https://api.figma.com';
  let resp = await fetch(`${baseUrl}/v1/files/${oCreds.FILE_KEY}`, {headers});
  let data = await resp.json();
  fs.writeFileSync(`file_nodes.json`, JSON.stringify(data));
  const next = map(data.document, (node) => {
    return node.type === 'RECTANGLE'
      ? Object.assign({}, node, {value: 'CHANGED'})
      : node
  });
  fs.writeFileSync(`file_changed_nodes.json`, JSON.stringify(next));
}
  
asyncMap();
  
