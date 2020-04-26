export const environment = {
  production: true,
  useHash: true,
  hmr: false,
  _SERVICE_URL: `http://10.2.72.156:8080/`,
  _BDP_URL: '',
  get SERVICE_URL() {
    return SERVICE_URL || this._SERVICE_URL;
  },
  get BDP_URL() {
    return BDP_URL || this._BDP_URL;
  }
};
