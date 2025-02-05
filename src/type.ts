type IAddressMsg = {
  firstLevelTagCategory: string;
  secondLevelTagType: string;
  secondLevelTagTypeLabel: string;
  firstLevelTagType: string;
  firstLevelTagTypeLabel: string;
  tag: string;
  tagLabel: string;

  address: string;
  tokenName: string;
  isContract: boolean;
  sysTag: string | null;
  sysTagId: number | null;
  imageName: string;
  tagTypeImageName: string;
  note: string | null;
  platform: string;
  ens: string;
};

export interface INode extends IAddressMsg {
  // pos
  x: number;
  y: number;
  fx: any;
  fy: any;
  // flag
  renderConfig: {
    /*****  点边通用属性 *******/
    /**  节点、边的大小 */
    size: number;
    /**  节点、边的颜色 */
    color: string | string[];
    /**  节点底部文字 边的文字 */
    label: string | string[];
    /**  虚线（手续费边等）*/
    dash?: number[];
    /**  调证图标 */
    iconInvest?: string | boolean;

    /*****  node通用属性 *******/
    /**  点中心的文字 */
    name: string;
    /** 点中心的图标 */
    image: any;
    /**  点右下角的图标(平台) */
    icon?: string;
    /**  显示vip图标 */
    vip?: boolean;
    /**  点顶部的图片 */
    topImage?: string;
    /**  点顶部的文字 */
    topLabel: string;
    /**  点底部的二级文字 */
    subLabel: string;
    /**  点顶上的系统标签 */
    tag: string;
    /**  点顶上的系统标签描述 */
    tagMsg: string;
    /**  是否是菱形（虚拟点）*/
    isDiamond: boolean;
    /**  节点中间的数字 */
    count: number;
    /**  节点中间的数字颜色反正(用于研判的group) */
    countInvert: boolean;
    /**  更多数字 */
    countCache: number;
    //
    ens: string;

    /*****  edge通用属性 *******/
    /**  边箭头颜色 */
    arrowColor: string;
    /**  曲线边弯曲程度 */
    curveOffset: number;

    // config
    noClip?: boolean;
  };

  showVip: boolean;
  showTag: boolean;
  // temp
  // 层级pos
  tex?: number;
  tey?: number;
  type?: any;
  isShare?: boolean;
  _expand: number;
  _layerFlag?: boolean;
  contractName?: string;
  _dragStart?: {
    x: number;
    y: number;
  };

  id: string;
  // root
  isRoot?: boolean;

  // 穿透相关的属性
  // 实名信息节点
  isRealNameNode?: boolean;
  exchangeNames?: string[]; // 交易所名称
  idCardCode?: string; // 实名身份id
  name?: string; // 实名人姓名
  /**普通节点实名标记:1、在此实名分析任务有标记，2、在其他实名分析任务有标记，3、都有标记 */
  hasRealNameTag?: 0 | 1 | 2 | 3;

  // 信息

  role?: string;
  tagName?: string;

  // 已经分析完的hash
  analyzedHashes?: string[];
  // 还没有分析完的hash
  analyzingHashes?: string[];

  // 跨链兑币
  isDex?: boolean;
  dexName?: string;
  isCrossBridge?: boolean;
  crossBridgeName?: string;
  isVirtualNode?: boolean;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  sourceAddress: string;
  targetAddress: string;
  platform: string;
  // hash tx
  tokenStats: {
    platform: string;
    tokenAddress: string;
    tokenName: string;
    txUnitName: string;
    value: number;
    valueCNY: number;
    txCount: number;
    disabled?: boolean;
  }[];
  value: number;
  valueCNY: number;
  txCount: number;

  isVirtualTarget?: boolean;
  isVirtualEdge?: boolean;
  disabled?: boolean;
  // 实名信息边
  isRealNameEdge?: boolean;

  hasSysTag?: boolean;
  hasMemo?: boolean; // 是否有备注

  // token
  tokenAddress: string;
  tokenName: string;
  // 是否支持调证
  isInvest?: boolean;
  // 手续费或者合约创建
  isFirstTran?: boolean;

  virtualEnd?: "source" | "target";

  // 研判group
  isSmartGroup?: boolean;
  isSourceSg?: boolean;
  isTargetSg?: boolean;
  // group
  isGroup: boolean;
  groupTokenNames: string[];
  group: string;
  children?: IEdge[];
  // render
  // temp
  _oldFlag?: boolean;
  // 分享相关的
  isShare?: boolean;
  _weakEdge?: boolean;
  updateTime?: number;
  type?: any;
}
