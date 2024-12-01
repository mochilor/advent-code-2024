import * as fs from 'fs';

export default function readFile(distPath: string): string {
  // Input file is copied to dist
  return fs.readFileSync(distPath).toString();
}
