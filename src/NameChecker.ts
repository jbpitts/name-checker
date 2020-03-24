import {Transform, TransformCallback, TransformOptions} from "stream";
import {Standard} from './Standard';

export class NameChecker extends Transform {

  constructor(private standards: Standard[], opts?: TransformOptions) {
    super(opts);
  }

  public _transform(message: Buffer | string, encoding: string, callback: TransformCallback) {
    try {
      const data = message.toString();

      let value = undefined;
      for (const standard of this.standards) {
        if (standard.regexp.test(data)) {
          value = standard.name;
          break;
        }
      }
      value = value || 'Unknown';

      this.push(JSON.stringify({data, value}) + '\n');
      callback();
    } catch (error) {
      callback(error);
    }
  }

  public _final(callback: (error?: Error | null) => void) {
    callback();
  }
}
