// # 3rd Party Library
// If the library doesn't have typings available at `@types/`,
// you can still use it by manually adding typings for it

// G2

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface WebpackRequire {
  <T>(path: string): T;

  (paths: string[], callback: (...modules: any[]) => void): void;

  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface NodeRequire extends WebpackRequire {
}

declare var require: NodeRequire;

declare var Slider: any;
declare var Cloud: any;
declare var SERVICE_URL: string;
declare var UPLOAD_URL: string;
declare var DOWNLOAD_URL: string;
declare var saikuAPI: string;
declare var hdfsMonitor: string;
declare var hmrMonitor: string;
declare var hbaseMonitor: string;
declare var hsparkMonitor: string;
declare var hkylinMonitor: string;
declare var dateFormat: string;
declare var BDP_URL: string;
declare var SOCKET_URL: string;


interface JQueryStatic {
  cookie(key, value?, options?): any;

  removeCookie(key, options?);

  clearAllCookie();

  sidebarMenu(menu);
}

interface Date {
  format(param): string;
}

interface Array<T> {
  groupBy(iteratee): any;

  uniqBy(iteratee): Array<any>;

  insert(index, item): any;
}

interface JQuery {
  mousewheel(callback: Function): any;

  animateCss(name: string, callback?: Function): any;

  transitionEnd(callback?: Function): any;

  transitionOnce(cssMap?: any): any;
}

declare const BMap: any;
declare const BMAP_STATUS_SUCCESS: any;



declare var G2: any;
declare var DataSet: any;
declare var Slider: any;
