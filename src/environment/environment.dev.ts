import PackageJSON from './../../package.json';

export const environment = {
  appversion: PackageJSON.version,
  apiUrl: 'http://127.0.0.1:8080',
  production: false
};