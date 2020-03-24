import split = require('split2');
import * as fs from 'fs';
import {NameChecker} from './NameChecker';

const nameChecker = new NameChecker([
  {
    name: 'Lab',
    regexp: /^lab(.*)\d$/
  },
  {
    name: 'Austin',
    regexp: /^atx/
  }
  ]);
const stream = fs.createReadStream('test/names.list');
stream
  .pipe(split())
  .pipe(nameChecker)
  .pipe(process.stdout);
