import * as _ from 'lodash';
import { Mesh, MeshLambertMaterial } from 'three';

const NODE_TYPE = {
  MENU: 'menu',
  BUTTON: 'change-theme.less',
};

export class TreeUtil {

  static build(srcArr: Array<any>, srcKey: string, srcText: string,
    parentKey: string, targetKey: string, targetText: string, childrenKey: string, hasChildren: string): Array<any> {

    const totalMap = {}, retArr = [];

    let item, newItem, parentNode;

    for (let index = 0, length = srcArr.length; index < length; index++) {
      item = srcArr[index];
      newItem = {};
      newItem[targetKey] = item[srcKey];
      newItem[targetText] = item[srcText];
      if (item[hasChildren]) {
        newItem[hasChildren] = true;
      } else {
        newItem[hasChildren] = false;
      }
      newItem.parentNo = item[parentKey];
      totalMap[item[srcKey]] = newItem;
    }
    for (let iterator in totalMap) {
      if (!totalMap[iterator]) {
        return;
      } else {
        iterator = totalMap[iterator];
        if (iterator['parentNo']) {
          if (parentNode = totalMap[iterator['parentNo']]) {
            parentNode[childrenKey] = parentNode[childrenKey] || [];
            parentNode[childrenKey].push(iterator);
            delete iterator['parentNo'];
          } else {
            retArr.push(iterator);
          }
        } else {
          delete iterator['parentNo'];
          retArr.push(iterator);
        }
      }

    }
    return retArr;
  }
}

/**
 * @description 先把父亲节点取出来，放进一个数组dataArray
 * @param {Object} datas 所有数据
 * @param {Array} btnList 按钮列表
 * @param {boolean} isLogin 用于判断是否登陆功能调用，登陆时菜单树去始祖节点为web节点，角色管理时菜单数始祖节点为0节点（包括web、ipad）
 */
export function data2tree(datas, btnList = [], isLogin = true) {
  const dataArray = [];
  datas.forEach(function (data) {
    data.type = NODE_TYPE.MENU;
    if (data.menuFather === '0' && isLogin) {
      dataArray.push(data);
    } else if (_.isNull(data.menuFather) && !isLogin) {
      dataArray.push(data);

    }
  });
  btnList.forEach(item => {
    item.text = item.name;
    item.type = NODE_TYPE.BUTTON;
  });
  return data2treeDG(datas, dataArray, btnList);
}

/**
 *
 * @param {Object} datas  所有数据
 * @param {Object} dataArray 父节点组成的数组
 */
function data2treeDG(datas, dataArray, btnList) {
  for (let j = 0; j < dataArray.length; j++) {
    const dataArrayIndex = dataArray[j];
    let childrenArray = [];
    const noP = dataArrayIndex.no;

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.menuFather === noP) {  // 判断是否为儿子节点
        childrenArray.push(data);
      }

    }

    childrenArray = _.sortBy(childrenArray, ['menuOrder']);
    dataArrayIndex.children = childrenArray;
    if (childrenArray.length > 0) { // 有儿子节点则递归
      data2treeDG(datas, childrenArray, btnList);
    } else if (btnList.length > 0) {
      const btnChildren = _.filter(btnList, item => item.menu === dataArrayIndex.no);
      dataArrayIndex.children = _.sortBy(btnChildren, 'buttonOrder');
      _.pullAllBy(btnList, [{ menu: dataArrayIndex.no }], 'menu');
    }

  }
  return dataArray;
}

/**
 * @description 获取IE浏览器版本
 * @returns IE浏览器版本，非IE浏览器返回-1
 */
export function IEVersion() {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) {
      return 7;
    } else if (fIEVersion === 8) {
      return 8;
    } else if (fIEVersion === 9) {
      return 9;
    } else if (fIEVersion === 10) {
      return 10;
    } else {
      return 6;       // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';    // edge
  } else if (isIE11) {
    return 11;        // IE11
  } else {
    return -1;        // 不是ie浏览器
  }
}

/**
 * @description 获取指定间隔天数的日期
 * @param {number} interval 间隔天数，负数为当前时间以前，正数为当前时间以后
 * @returns {Date} 返回指定日期
 */
export function getDateOfInterval(interval: number): Date {
  const day = new Date();
  day.setDate(day.getDate() + interval);
  return day;
}

export function disposeNode(node) {
  if (node instanceof Mesh) {
    if (node.geometry) {
      node.geometry.dispose();
    }
    if (node.material instanceof MeshLambertMaterial) {
      if (node.material.map) {
        node.material.map.dispose();
      }
      if (node.material.lightMap) {
        node.material.lightMap.dispose();
      }
      if (node.material.specularMap) {
        node.material.specularMap.dispose();
      }
      if (node.material.envMap) {
        node.material.envMap.dispose();
      }

      node.material.dispose();
    }
  }
}

export function disposeHierarchy(node, callback) {
  for (let i = node.children.length - 1; i >= 0; i--) {
    const child = node.children[i];
    disposeHierarchy(child, callback);
    callback(child);
  }
}

