// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useHash: true,
  hmr: true,
  _SERVICE_URL: `http://10.2.72.156:8080/`,
  _BDP_URL: '',
  get SERVICE_URL() {
    return SERVICE_URL || this._SERVICE_URL;
  },
  get BDP_URL() {
    return BDP_URL || this._BDP_URL;
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
