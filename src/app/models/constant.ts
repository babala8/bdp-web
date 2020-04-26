import { environment } from '@env/environment';
import { IOrgType } from '../models/orgType';
import { findFirstNotEmptyNode } from 'ng-zorro-antd';

export const RET_CODE = {
  SUCCESS: '00', // 请求成功
  FAIL: 'FF', // 请求失败
  PARAM_LACK: 'E1', // 缺少参数
  PARAM_ERROR: 'E2', // 参数错误
  SYS_BUSY: 'F3', // 系统正忙，请稍后再试
  TIME_OUT: 'TT', // 系统超时
  AUDIT_OBJECT_EXIST: '98', // 对象已存在，请勿重复添加
  AUDIT_OBJECT_DELETED: '97', // 对象不存在
};

export const TOKEN_NAME = 'TokenID';

export const URL_MAPPING = {
  LOGIN: environment.SERVICE_URL + 'system/login',
  ORG: {
    qryAuthOrgs: environment.SERVICE_URL + 'system/org/qryAuthOrgs',
  },
  REFRESH: environment.SERVICE_URL + 'system/refresh',
};

export const REGIONS = [
  // { no: 'beijing', name: '北京' },
  // { no: 'shanghai', name: '上海' },
  // { no: 'tianjing', name: '天津' },
  // { no: 'chongqing', name: '重庆' },
  // { no: 'zhejiang', name: '浙江' },
  // { no: 'jiangsu', name: '江苏' },
  // { no: 'guangdong', name: '广东' },
  // { no: 'fujiang', name: '福建' },
  // { no: 'hunan', name: '湖南' },
  // { no: 'hubei', name: '湖北' },
  // { no: 'liaoning', name: '辽宁' },
  // { no: 'jilin', name: '吉林' },
  // { no: 'hebei', name: '河北' },
  // { no: 'henan', name: '河南' },
  // { no: 'shandong', name: '山东' },
  // { no: 'shangxi', name: '陕西' },
  // { no: 'gansu', name: '甘肃' },
  // { no: 'xinjiang', name: '新疆' },
  // { no: 'qinghai', name: '青海' },
  // { no: 'shanxi', name: '山西' },
  { no: 'sichuan', name: '四川省' },
  // { no: 'guizhou', name: '贵州' },
  // { no: 'anhui', name: '安徽省' },
  // { no: 'jiangxi', name: '江西' },
  // { no: 'yunnan', name: '云南' },
  // { no: 'xizang', name: '西藏' },
  // { no: 'guangxi', name: '广西' },
  // { no: 'ningxia', name: '宁夏' },
  // { no: 'hainan', name: '海南' },
  // { no: 'xianggang', name: '香港' },
  // { no: 'aomeng', name: '澳门' },
  // { no: 'taiwan', name: '台湾' },
  // { no: 'neimenggu', name: '内蒙古' },
  // { no: 'heilongjiang', name: '黑龙江' }
];

export const CITIES = {
  beijing: ['东城区', '西城区', '海淀区', '朝阳区', '丰台区', '石景山区', '通州区', '顺义区', '房山区',
    '大兴区', '昌平区', '怀柔区', '平谷区', '门头沟区', '延庆县', '密云县'],
  shanghai: ['浦东新区', '徐汇区', '长宁区', '普陀区', '闸北区', '虹口区', '杨浦区', '黄浦区',
    '卢湾区', '静安区', '宝山区', '闵行区', '嘉定区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区',
    '崇明县'],
  tianjing: ['河东', '南开', '河西', '河北', '和平', '红桥', '东丽', '津南', '西青', '北辰',
    '塘沽', '汉沽', '大港', '蓟县', '宝坻', '宁河', '静海', '武清'],
  chongqing: ['渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '万盛区',
    '双桥区', '渝北区', '巴南区', '万州区', '涪陵区', '黔江区', '长寿区', '江津区', '合川区', '永川区',
    '南川区'],
  jiangsu: ['南京市', '无锡市', '常州市', '徐州市', '苏州市', '南通市', '连云港市', '淮安市', '扬州市', '盐城市',
    '镇江市', '泰州市', '宿迁市'],
  zhejiang: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '利水市'],
  guangdong: ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市',
    '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市'],
  fujiang: ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
  hunan: ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市',
    '永州市', '怀化市', '娄底市', '湘西土家苗族自治区'],
  hubei: ['武汉市', '襄阳市', '黄石市', '十堰市', '宜昌市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市',
    '随州市', '恩施土家族苗族自治州'],
  liaoning: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛'],
  jilin: ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治区'],
  heilongjiang: ['哈尔滨市', '齐齐哈尔市', '鸡西市', '牡丹江市', '佳木斯市', '大庆市', '伊春市', '黑河市', '大兴安岭'],
  hebei: ['石家庄市', '保定市', '唐山市', '邯郸市', '承德市', '廊坊市', '衡水市', '秦皇岛市', '张家口市'],
  henan: ['郑州市', '洛阳市', '商丘市', '安阳市', '南阳市', '开封市', '平顶山市', '焦作市', '新乡市', '鹤壁市',
    '许昌市', '漯河市', '三门峡市', '信阳市', '周口市', '驻马店市', '济源市'],
  shandong: ['济南市', '青岛市', '菏泽市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '滨州市', '德州市', '聊城市', '临沂市'],
  shangxi: ['西安市', '宝鸡市', '咸阳市', '渭南市', '铜川市', '延安市', '榆林市', '汉中市', '安康市', '商洛市'],
  gansu: ['兰州市', '嘉峪关市', '金昌市', '金川市', '白银市', '天水市', '武威市', '张掖市', '酒泉市', '平凉市',
    '庆阳市', '定西市', '陇南市', '临夏市', '合作市'],
  qinghai: ['西宁市', '海东地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州',
    '玉树藏族自治州', '海西蒙古族藏族自治州'],
  xinjiang: ['乌鲁木齐市', '奎屯市', '石河子市', '昌吉市', '吐鲁番市', '库尔勒市', '阿克苏市', '喀什市', '伊宁市',
    '克拉玛依市', '塔城市', '哈密市', '和田市', '阿勒泰市', '阿图什市', '博乐市'],
  shanxi: ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  sichuan: [
    '成都市',
    // '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市',
    // '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州',
    // '凉山彝族自治州'
  ],
  guizhou: ['贵阳市', '六盘水市', '遵义市', '安顺市', '黔南布依族苗族自治州', '黔西南布依族苗族自治州',
    '黔东南苗族侗族自治州', '铜仁市', '毕节市'],
  anhui: ['合肥市', '芜湖市', '安庆市', '马鞍山市', '阜阳市', '六安市', '滁州市', '宿州市', '蚌埠市', '巢湖市',
    '淮南市', '宣城市', '亳州市', '淮北市', '铜陵市', '黄山市', '池州市'],
  jiangxi: ['南昌市', '九江市', '景德镇市', '萍乡市', '新余市', '鹰潭市', '赣州市', '宜春市', '上饶市', '吉安市',
    '抚州市'],
  yunnan: ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州',
    '大理白族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '德宏傣族景颇族自治州',
    '怒江傈僳族自治州', '迪庆藏族自治州'],
  neimenggu: ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市',
    '乌兰察布市'],
  guangxi: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市',
    '贺州市', '河池市', '崇左市'],
  xizang: ['拉萨', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '那曲地区', '阿里地区'],
  ningxia: ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
  hainan: ['海口市', '三亚市'],
  xianggang: ['中西区', '湾仔区', '东区', '南区', '九龙城区', '油尖旺区', '观塘区', '黄大仙区',
    '深水埗区', '北区', '大埔区', '沙田区', '西贡区', '元朗区', '屯门区', '荃湾区', '葵青区', '离岛区'],
  taiwan: ['台北市', '高雄市', '基隆市', '台中市', '台南市', '新竹市', '嘉义市'],
  aomeng: ['澳门半岛', '氹仔岛', '路环岛'],
};

export const ORGGRADES: IOrgType[] = [
  { no: 'ZH', name: '总行', grade: 1 },
  { no: 'FH', name: '省分行', grade: 2 },
  { no: 'SFH', name: '市分行', grade: 3 },
  { no: 'ZHH', name: '支行', grade: 4 },
  { no: 'WD', name: '网点', grade: 5 },
  { no: 'FLC', name: '分理处', grade: 6 },
  // { no: '1', name: '公司', grade: 100 },
];

export const SYS_CONS = {
  OPERATE_TYPE: {
    ADD: 'add',
    MOD: 'mod',
    DETAIL: 'detail',
  },
  ADDNOTE_MODE: {
    DYNAMIC: '1',
    FIX: '2',
  },
  STATE: {
    ADDNOTE_TASK: [
      { name: '已创建', value: 201 },
      { name: '已取消', value: 200 },
      { name: '已过期', value: 208 },
      { name: '已配钞', value: 501 },
      { name: '备钞已入库', value: 401 },
      { name: '备钞已出库', value: 301 },
      { name: '已出库交接', value: 308 },
      { name: '已入库交接', value: 309 },
      { name: '尾箱已入库', value: 304 },
      { name: '尾钞已调出', value: 402 },
      { name: '尾钞已清点', value: 502 },
      { name: '已完成', value: 205 },
    ],
    ADDNOTE_PLAN: [
      { label: '未选择设备', value: 0, badge: 'default' },
      { label: '已选择设备', value: 1, badge: 'processing' },
      { label: '已预测金额', value: 2, badge: 'processing' },
      { label: '已分组', value: 3, badge: 'processing' },
      { label: '待审批', value: 4, badge: 'processing' },
      { label: '退回调整', value: 5, badge: 'warning' },
      // { label: '审批通过', value: 6, badge: 'success' },
      { label: '审批通过(已出单)', value: 7, badge: 'success' },
      { label: '已过期', value: 8, badge: 'error' },
    ],
    NET_DEPOSIT_TASK: [
      { label: '已创建', value: 201, badge: 'default' },
      { label: '网点已审批', value: 204, badge: 'success' },
      { label: '金库已确认', value: 207, badge: 'success' },
      { label: '经警已接库', value: 305, badge: 'processing' },
      { label: '已入库交接', value: 306, badge: 'processing' },
      { label: '已入库', value: 304, badge: 'processing' },
      { label: '解现箱已调出', value: 402, badge: 'processing' },
      { label: '已清点', value: 403, badge: 'processing' },
      { label: '已完成', value: 205, badge: 'success' },
      { label: '已退回', value: 202, badge: 'warning' },
      { label: '已过期', value: 208, badge: 'error' },
      { label: '已拆分', value: 206, badge: 'warning' },
      { label: '已合并', value: 209, badge: 'warning' },
    ],
    NET_OUT_TASK: [
      // 网点出库任务单状态
      { label: '已创建', value: 201, badge: 'default' },
      { label: '已门禁审核出库', value: 300, badge: 'processing' },
      { label: '物流已出库', value: 301, badge: 'processing' },
      { label: '网点已接库', value: 307, badge: 'success' },
      { label: '已出库交接', value: 308, badge: 'processing' },
    ],
    NET_CASH_TASK: [
      { label: '已创建', value: 201, badge: 'default' },
      { label: '网点已审批', value: 204, badge: 'success' },
      { label: '已分配配款计划', value: 400, badge: 'success' },
      { label: '金库已确认', value: 207, badge: 'success' },
      { label: '配款已领现', value: 209, badge: 'success' },
      { label: '已配款', value: 501, badge: 'processing' },
      { label: '已入库', value: 304, badge: 'processing' },
      { label: '已出库', value: 301, badge: 'processing' },
      { label: '已出库交接', value: 308, badge: 'processing' },
      { label: '网点已接库', value: 307, badge: 'success' },
      { label: '已退回', value: 202, badge: 'error' },
      { label: '已过期', value: 208, badge: 'error' },
    ],
    SELF_PRODUCT_TASK: [
      { label: '已创建', value: 201, badge: 'default' },
      { label: '网点已审批', value: 204, badge: 'success' },
      { label: '金库已确认', value: 207, badge: 'success' },
      { label: '经警已接库', value: 305, badge: 'processing' },
      { label: '已入库交接', value: 306, badge: 'processing' },
      { label: '已入库', value: 304, badge: 'processing' },
      { label: '已完成', value: 205, badge: 'success' },
      { label: '已退回', value: 202, badge: 'warning' },
      { label: '已过期', value: 208, badge: 'error' },
      { label: '已拆分', value: 206, badge: 'warning' },
      { label: '已合并', value: 209, badge: 'warning' },
    ],
    NOTES_RECEIPT_TASK: [
      { label: '已创建', value: 201, badge: 'default' },
      { label: '金库已确认', value: 207, badge: 'success' },
      { label: '金库退回', value: 202, badge: 'warning' },
      { label: '网点已审批', value: 204, badge: 'default' },
      { label: '已取消', value: 200, badge: 'warning' },
      { label: '已过期', value: 208, badge: 'error' },
      { label: '已门禁审核出库', value: 300, badge: 'processing' },
      { label: '物流已出库', value: 301, badge: 'processing' },
      { label: '网点已接库', value: 307, badge: 'default' },
      { label: '已钞处出库交接', value: 309, badge: 'processing' },
      { label: '已清点', value: 502, badge: 'success' },
      { label: '已门禁审核入库', value: 503, badge: 'processing' },
    ],
    NOTES_ALLOCATION_TASK: [
      { label: '已创建', value: 201, badge: 'default' },
      { label: '网点已审批', value: 204, badge: 'default' },
      { label: '已拆分', value: 206, badge: 'default' },
      { label: '金库已确认', value: 207, badge: 'default' },
      { label: '已合并', value: 209, badge: 'default' },
      { label: '已钞处入库交接', value: 303, badge: 'success' },
      { label: '钞处已出库', value: 402, badge: 'success' },
      { label: '已确认入库', value: 302, badge: 'success' },
      { label: '已钞处出库交接', value: 309, badge: 'success' },
      { label: '已分配配款计划', value: 400, badge: 'success' },
      { label: '已取消', value: 200, badge: 'warning' },
      { label: '已过期', value: 208, badge: 'error' },
      { label: '已配款', value: 501, badge: 'processing' },
      { label: '已清点', value: 502, badge: 'default' },
      { label: '已门禁审核入库', value: 503, badge: 'processing' },
    ],
    STORAGE_SITE: [
      { label: '空置', value: 0 },
      { label: '占用', value: 1 },
      { label: '已删除', value: 2 },
    ],
    IN_STORAGE_STATE: [
      // PRODUCT_SERVICE_STATUS 表中service_no为9，对应的状态和状态码
      { label: '已创建', value: 201 },
      { label: '入库中', value: 203 },
      { label: '物流已入库', value: 304 },
    ],
    OUT_STORAGE_STATE: [
      // PRODUCT_SERVICE_STATUS 表中service_no为8，对应的状态和状态码
      { label: '已创建', value: 201 },
      { label: '金库退回', value: 202 },
      // { label: '钞处已审批', value: 204 },
      { label: '出库确认', value: 207 },
      { label: '领现箱出库', value: 301 },
    ],
  },
  FLOOR: ['一层', '二层'],
  TRANSFER_TYPE: [
    { name: '上缴', value: 1 },
    { name: '领用', value: 2 },
  ],
  DEV_TYPE_CASH: [
    { name: '未分类', no: '0' },
    { name: '存大于取型', no: '1' },
    { name: '存取均衡型', no: '2' },
    { name: '取大于存型', no: '3' },
    { name: '取款机型', no: '4' },
  ],
  ADDNOTE_TACTIC_TYPE: [
    { label: '待选择', value: 0, amount: 0 },
    { label: '激进型', value: 1, amount: 12 },
    { label: '平稳型', value: 2, amount: 15 },
    { label: '保守型', value: 3, amount: 18 },
  ],
  LINE_MODE: [
    { label: '自动分组', no: 1 },
    { label: '手动分组', no: 2 },
  ],
  PAGESIZE_SELECTOR: [
    10, 15, 20, 25, 30,
  ],
  GROUPTYPE: [
    { no: 1, name: '清机组' },
    { no: 2, name: '加钞组' },
    { no: 3, name: '管理组' },
  ],
  CASSETTE_TYPE: [
    { name: '循环箱', no: '0' },
    { name: '回收箱', no: '1' },
    { name: '废钞箱', no: '2' },
    { name: '存款箱', no: '3' },
    { name: '取款箱', no: '4' },
  ],
  CASSETTE_NOTE_VALUE: [
    { name: '100', no: '0' },
    { name: '50', no: '1' },
    { name: '20', no: '2' },
    { name: '10', no: '3' },
    { name: '5', no: '4' },
  ],
  CASSETTE_CURRENCY: [
    { name: '人民币', no: 'CNY' },
    { name: '美元', no: 'USD' },
  ],
  CASSETTE_STATUS: [
    { name: '未启用', no: '-1' },
    { name: '启用', no: '0' },
    { name: '已装填', no: '1' },
    { name: '出库待审核', no: '20' },
    { name: '已出库/已交接', no: '2' },
    { name: '虚拟签收待审核', no: '30' },
    { name: '已虚拟签收', no: '3' },
    { name: '已落地', no: '4' },
    { name: '虚拟回收待审核', no: '50' },
    { name: '已虚拟回收', no: '5' },
    { name: '入库待审核', no: '60' },
    { name: '已入库/已交接', no: '6' },
    { name: '纸币已回收', no: '7' },
    { name: '损坏', no: '8' },
    { name: '维修', no: '9' },
    { name: '报废', no: '10' },
  ],
  CAR_STATUS: [
    { name: '在库', no: '1' },
    { name: '在途', no: '2' },
  ],
  CASSETTE_BAG_VENDOR: [
    { name: '默认', no: '0' },
  ],
  CASSETTE_BAG_STATUS: [
    { name: '启用', no: '0' },
    { name: '未启用', no: '-1' },
  ],
  KEY_RANGE: [
    { no: 1, 'name': '金库' },
    { no: 2, 'name': '网点' },
    { no: 3, 'name': '设备' },
  ],
  READER_TYPE: [
    { no: 1, 'name': '固定式' },
    { no: 2, 'name': '手持式' },
    { no: 3, 'name': '发卡器' },
  ],
  READER_STATUS: [
    { no: 1, 'name': '未领用' },
    { no: 2, 'name': '已申请' },
    { no: 3, 'name': '已领用' },
    { no: 4, 'name': '已遗失' },
    { no: 5, 'name': '已损坏' },
  ],
  READER_MOD_STATUS: [
    { no: 1, 'name': '未领用' },
    { no: 4, 'name': '已遗失' },
    { no: 5, 'name': '已损坏' },
  ],
  AREA_TYPES: [
    { name: '金库', no: '1' },
    { name: '网点', no: '2' },
    { name: '设备', no: '3' },
  ],
  KEY_PROPERTYS: [
    { name: '正常', no: '0' },
    { name: '备用', no: '1' },
  ],
  KEY_STATUS: [
    { name: '已停用', no: '0' },
    { name: '未分配（钥匙资源被释放）', no: '1' },
    { name: '已分配（钥匙资源被占用）', no: '2' },
    { name: '已申请（废止）', no: '3' },
    { name: '已领用', no: '4' },
    { name: '已遗失', no: '5' },
    { name: '已损坏', no: '6' },
  ],
  TAG_TYPE: [
    { name: '钞箱标签', no: 1 },
    { name: '钞箱袋标签', no: 2 },
    { name: '设备标签', no: 3 },
  ],
  TAG_STATUS: [
    { name: '未启用', no: 0 },
    { name: '启用', no: 1 },
    { name: '停用', no: 2 },
  ],
  KEY_GROUP_STATUS: [
    { name: '未分配（资源被释放）', no: 1 },
    { name: '已分配（资源被占用）', no: 2 },
    { name: '已申请（废止）', no: 3 },
    { name: '已领用', no: 4 },
    { name: '钥匙串整体遗失', no: 5 },
    { name: '有子钥匙遗失', no: 6 },
    { name: '有子钥匙损坏', no: 6 },
  ],
  TAGREADER_USE_STATUS: [
    { name: '已领用', no: '2' },
    { name: '已归还', no: '4' },
  ],
  CRASH_FLAG: [
    { name: '正常', no: '0' },
    { name: '紧急', no: '1' },
  ],
  REVIEW_RESULT: [
    { name: '通过', no: 1 },
    { name: '拒绝', no: 2 },
  ],
  BAG_EX_FLAG: [ // 钞袋执行异常标志位
    { name: '正常', no: 0 },
    { name: '领错异常', no: 1 },
  ],
  BAG_DATA_SRC_TYPE: [ // 钞袋数据来源类型
    { no: 0, name: '系统任务单' },
    { no: 1, name: '验收任务单' },
    { no: 2, name: '补录' },
  ],
  BAG_STATUS: [ // 钞袋状态
    { no: 20, name: '出库待审核' },
    { no: 2, name: '出库' },
    { no: 60, name: '入库待审核' },
    { no: 6, name: '入库' },
  ],
  BAG_TYPE: [ // 钞袋类型
    { no: 1, name: '计划内钞箱袋' },
    { no: 2, name: '备用钞箱袋' },
    { no: 3, name: '空钞箱袋' },
    { no: 4, name: '未知' },
  ],
  CASSETTE_OP_TYPE: [ // 钞箱操作类型
    { no: 1, name: '装填' },
    { no: 20, name: '出库待审核' },
    { no: 2, name: '出库/交接' },
    { no: 30, name: '虚拟签收待审核' },
    { no: 3, name: '虚拟签收' },
    { no: 4, name: '落地' },
    { no: 50, name: '虚拟回收待审核' },
    { no: 5, name: '虚拟回收' },
    { no: 60, name: '入库待审核' },
    { no: 6, name: '入库/交接' },
    { no: 7, name: '纸币回收' },
  ],
  EX_FLAG: [
    { no: 0, name: '正常' },
    { no: 1, name: '领错异常' },
    { no: 2, name: '流转异常' },
  ],
  LOCK_STATUS: [
    { no: 0, name: '未激活' },
    { no: 1, name: '已激活' },
    { no: 2, name: '移机' },
    { no: 3, name: '激活中(未下载保护密钥)' },
    { no: 4, name: '激活中（已下载保护密钥)' },
  ],
  LOCK_TRANS_TYPE: [
    { no: 1, name: '锁具获取时间' },
    { no: 2, name: '上传锁具状态【暂不考虑】' },
    { no: 3, name: '锁具主动激活' },
    { no: 4, name: '下载密钥' },
    { no: 5, name: '激活成功请求' },
    { no: 6, name: '校验闭锁码' },
    { no: 7, name: '查询网络状态' },
    { no: 8, name: '验证用户信息' },
  ],
  CLR_TIME_INTERVAL: [
    { no: 1, name: '上午' },
    { no: 2, name: '下午' },
    { no: 3, name: '全天' },
  ],
  DISPATCH_STATUS: [
    { no: 1, name: '未配钞' },
    { no: 2, name: '已配钞' },
    { no: 3, name: '已取消' },
    { no: 4, name: '已过期' },
    { no: 5, name: '流转中' },
    { no: 6, name: '流转完成' },
    { no: 7, name: '已完成' },
  ],
  URGRNT_FLAG: [
    { name: '正常任务', no: '0' },
    { name: '紧急任务', no: '1' },
  ],
  ADD_FLAG: [
    { name: '未加钞', no: '0' },
    { name: '已加钞', no: '1' },
  ],
  GOODS_TYPE: [
    { name: '寄库款箱', value: 4 },
    { name: '现金款箱', value: 3 },
  ],
  PRODUCT_TYPE: [
    { name: '寄存款箱', value: 'R0001' },
    { name: '现金款箱', value: 'R0003' },
  ],
  TASK_TYPE: [
    { name: '加钞任务单', no: '1' },
    { name: '网点调缴任务单', no: '2' },
    { name: '网点出库任务单', no: '3' },
    { name: '人行调缴任务单', no: '4' },
    { name: '同业现金任务单', no: '5' },
    { name: '钞处领现任务单', no: '8' },
  ],
  DEPOSITE_TYPE: [
    { name: '长寄库', value: 1 },
    { name: '短寄库', value: 2 },
  ],
  CURRENCY_CODE: [
    { name: '人民币', value: '1', code: 'CNY' },
    { name: '港币', value: '13', code: 'HKD' },
    { name: '美元', value: '14', code: 'USD' },
    { name: '欧元', value: '38', code: 'EUR' },
    { name: '日元', value: '27', code: 'JPY' },
    { name: '英镑', value: '12', code: 'GBP' },
    { name: '加拿大元', value: '28', code: 'CAD' },
    { name: '澳大利亚元', value: '29', code: 'AUD' },
    { name: '新加坡元', value: '18', code: 'SGD' },
    { name: '瑞士法郎', value: '15', code: 'CHF' },
    { name: '泰国铢', value: '84', code: 'THB' },
    { name: '台币', value: '107', code: 'TWD' },
    { name: '韩元', value: '103', code: 'KRW' },
    { name: '澳门元', value: '81', code: 'MOP' },
    { name: '菲律宾比索铢', value: '82', code: 'PHP' },
    { name: '新西兰元', value: '87', code: 'NZD' },
    { name: '挪威克朗', value: '23', code: 'NOK' },
    { name: '瑞典克朗', value: '21', code: 'SEK' },
    { name: '丹麦克朗', value: '22', code: 'DKK' },
    { name: '卢布', value: '70', code: 'RUB' },
  ],
  CURRENCY_TYPE: [
    { name: '完整券', value: '1' },
    { name: '流通券', value: '2' },
    { name: '破损券', value: '3' },
    { name: '假钞', value: '4' },
  ],
  DENOMINATION: [
    { name: '100元', value: '1', amount: 100 },
    { name: '50元', value: '2', amount: 50 },
    { name: '20元', value: '3', amount: 20 },
    { name: '10元', value: '4', amount: 10 },
    { name: '5元', value: '5', amount: 5 },
    { name: '2元', value: '6', amount: 2 },
    { name: '纸1元', value: '7', amount: 1 },
    { name: '硬1元', value: '8', amount: 1 },
    { name: '纸5角', value: '9', amount: 0.5 },
    { name: '硬5角', value: '10', amount: 0.5 },
    { name: '纸1角', value: '11', amount: 0.1 },
    { name: '硬1角', value: '12', amount: 0.1 },
    { name: '纪念币', value: '13', amount: 0.05 },
  ],
  SECURITY_WARN_TYPE: [
    { label: '可疑人员滞留', value: '1' },
    { label: '人员、车俩闯入', value: '2' },
    { label: '110报警', value: '999' },
  ],
  POST_TYPE: [
    { label: '总行', value: 1 },
    { label: '分行', value: 2 },
    { label: '支行', value: 3 },
    { label: '网点', value: 4 },
    { label: '金库', value: 5 },
  ],
  DEV_STATUS: [
    { label: '正在工作', value: 1 },
    { label: '未工作', value: 2 },
  ],
  DEV_TYPE: [
    { label: '清分机', value: 1 },
    { label: '点钞机', value: 2 },
  ],
  COUNT_STATUS: [
    { label: '等待执行', value: 1 },
    { label: '失败', value: 2 },
    { label: '已完成', value: 3 },
    { label: '正在执行', value: 4 },
  ],
  TX_TYPES: [
    { label: '联动记账', value: 1 },
    { label: '联动重发', value: 2 },
    { label: '联动冲正', value: 3 },
  ],
  FLAGS: [
    { label: '一致', value: 1 },
    { label: '不一致', value: 0 }
  ],
  CENTER_TYPES: [
    { name: '总库', no: 0 },
    { name: '业务库', no: 1 },
    { name: '营运库', no: 2 },
    { name: '代理库', no: 3 },
    { name: '黄金交割库', no: 4 },
    { name: '备用库', no: 5 },
  ],
  AUTO_FLAGS: [
    { name: '非自动化库', no: 0 },
    { name: '自动化库', no: 1 },
  ],
  CENTER_LINE_MODE: [
    { name: '自动规划', no: 1 },
    { name: '固定线路', no: 2 },
  ],
  MOULD_TYPES: [
    { name: '周', no: 1 },
    { name: '月', no: 2 },
  ],
  LINE_TYPE: {
    // 加钞线路类型
    atmAddnoteLine: '0',
    netAddnoteLine: '1',
    visitCollectionAddnoteLine: '2',
    urgentAddnoteLine: '3',
  },
  callCustomerTypes: [
    // 客户类型
    { 'label': '人民银行', 'value': '1' },
    { 'label': '金交所客户', 'value': '2' },
    { 'label': '同业客户', 'value': '3' },
    { 'label': '零售客户', 'value': '4' },
    { 'label': '上门收款客户', 'value': '5' }
  ],
  messageType: [
    { name: '预警信息', no: 1 },
    { name: '推送信息', no: 2 },

  ],
  MERGE_FLAG: [
    // 任务单是否可合并标志
    { no: 1, name: '可合并' },
    { no: 2, name: '不可合并' }
  ],
  CONTAINER_STATUS: [
    {value: '0', name: '未启用'},
    {value: '1', name: '启用'},
    {value: '2', name: '停用'},
  ]

};

// 押运车
export const CAR = {
  SINGING_TYPE: [
    // 押运车签约方式
    { value: '0', label: '计次' },
    { value: '1', label: '月付' },
    { value: '2', label: '里程付' }
  ],
  CAR_STATUS: [
    // 车辆状态
    { value: '0', label: '故障' },
    { value: '1', label: '正常' }
  ],
  CAR_TYPE: [
    // 车辆类型
    { value: '0', label: '小型' },
    { value: '1', label: '中型' },
    { value: '2', label: '大型' }
  ]
};

export const ServiceProvider = {
  PROVIDER_TYPE: {
    devProvider: 1,
    escortCompany: 2
  },
  SERVICE_PROVIDER_TYPE: [
    // 服务商类型
    { value: '1', label: '设备服务商' },
    { value: '2', label: '押运公司' }
  ]
}

export const SHELF = {
  // 笼车/托盘类型
  SHELF_TYPE: [
    { nzValue: 1, nzLabel: "普通笼车" },
    { nzValue: 2, nzLabel: "托盘" },
    { nzValue: 3, nzLabel: "多层笼车" },
  ],
  // 笼车/托盘状态
  SHELF_STATUS: [
    {nzValue: 0, nzLabel: "已停用"},
    {nzValue: 1, nzLabel: "未启用"},
    {nzValue: 2, nzLabel: "已启用"},
  ]
}

export enum OPERATETYPE {
  ChaoChuRuKu = 'ChaoChuRuKu',
  ChaoChuShenQingChuKu = 'ChaoChuShenQingChuKu',
  QingDian = 'QingDian',
  Finish = 'Finish',
  RuKuJiaoJie = 'RuKuJiaoJie',
  WangDianJieKu = 'WangDianJieKu',
  Overdue = 'Overdue',
  WuLiuChuKu = 'WuLiuChuKu',
  JingJingJieKu = 'JingJingJieKu',
  WuLiuRuKu = 'WuLiuRuKu',
  ChaoChuChuKu = 'ChaoChuChuKu',
  ChuKuJiaoJie = 'ChuKuJiaoJie',
  Cancel = 'Cancel',
  Create = 'Create',
  LoadNote = 'LoadNote',
  Return = 'Return',
  WangDianShenPi = 'WangDianShenPi',
  JinKuQueRen = 'JinKuQueRen',
  Split = 'Split',
  Merge = 'Merge',
  JinJiJiaChao = 'JinJiJiaChao',
  ChaoChuChuKuJiaoJie = 'ChaoChuChuKuJiaoJie',
  Mod = 'Mod',
  ChaoChuRuKuJiaoJie = 'ChaoChuRuKuJiaoJie',
  QueRenRuKu = 'QueRenRuKu',
  MenJinShenHeRuKu = 'MenJinShenHeRuKu',
  MenJinShenHeChuKu = 'MenJinShenHeChuKu',
  FenPeiPeiKuan = 'FenPeiPeiKuan',
  FenPeiQingDian = 'FenPeiQingDian'
}

export const CONTAINER_TYPE = {
  CASHBOX: 'R0003', // 款箱
  CASSETTE: 'R0004', // 钞箱
  CASSETTE_BAG: 'R0002'  // 钞袋
}

