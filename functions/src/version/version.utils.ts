import {findUpSync} from 'find-up';
import * as fs from 'fs';

export function getVersionFromPackageJson(startPath = '.'): string {
  const packageJsonPath = findUpSync('package.json', {
    cwd: startPath,
  });
  if (!packageJsonPath) {
    return '0.0.0';
  }

  const file = fs.readFileSync(packageJsonPath);
  const json = JSON.parse(file.toString());
  return json.version;
}
