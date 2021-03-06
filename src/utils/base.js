// var BASE_URL = "http://60.10.139.121:51024/";
// var API_URL = "http://60.10.139.121:51024/api";
// var MONITOR_URL = "ws://60.10.139.121:5002";
// var INSTRUCTION_URL = "ws://60.10.139.121:5000";
var VIDEO_REPLAY_URL = "http://60.10.139.122:9998/play";

var BASE_URL = "http://192.168.88.100:10029/";
var API_URL = "http://192.168.88.100:10029/api";
var MONITOR_URL = "ws://192.168.88.125:5002";
var INSTRUCTION_URL = "ws://192.168.88.125:5000";
// || true
if (process.env.NODE_ENV == "production") {
  // public/index.html中 最下方的script中会配置全局config
  BASE_URL = "http://60.10.139.110:51023/";
  API_URL = "http://60.10.139.110:51023/api";
  INSTRUCTION_URL = "ws://60.10.139.108:5000";
  MONITOR_URL = "ws://60.10.139.108:5002";
  VIDEO_REPLAY_URL = "http://60.10.139.122:9998/play";
}
var dict = {
  //全局字典
  AMAP_KEY: "bce86b9b523a60714211899fa89b072c", //高德 key
  BMAP_KEY: "E6CTjsauEoavEzCYG4WM1zt0S5OB6dAf", //百度key
  BASE_URL: BASE_URL, //web站点路径
  API_URL: API_URL, //API具体路径
  MONITOR_URL: MONITOR_URL, //监控端websocket地址
  INSTRUCTION_URL: INSTRUCTION_URL, //指令websocket地址
  VIDEO_REPLAY_URL: VIDEO_REPLAY_URL, //视频回放地址
  ONLINE_TIMEOUT: "300000", //300000 = 5分钟上线超时时间（当前系统时间-定为时间 < 5分钟  即为上线）
  license_color: {
    "1": {
      backgroundColor: "#006DD9",
      borderColor: "#0b64bd",
      name: "蓝色",
      style: "background:#006DD9;border:1px solid #0b64bd;color:#FFF;"
    },
    "2": {
      backgroundColor: "#ffbf00",
      borderColor: "#efb404",
      name: "黄色",
      style: "background:#ffbf00;border:1px solid #ffa500;color:#000;"
    },

    // "3": {
    //   backgroundColor: "#fff",
    //   borderColor: "#fff",
    //   name: "白色",
    //   style: "background:#fff;border:1px solid #fff;color:#000; "
    // },
    // "4": {
    //   backgroundColor: "#000",
    //   borderColor: "#000",
    //   name: "黑色",
    //   style: "background:#000;border:1px solid #000;color:#FFF; "
    // },
    "5": {
      backgroundColor: "#79bb0f",
      borderColor: "#669e0b",
      name: "黄绿色",
      style: "background:#79bb0f;border:1px solid #669e0b;color:#000;"
    },
    "6": {
      backgroundColor: "#79bb0f",
      borderColor: "#669e0b",
      name: " 渐变绿",
      style: "background:#79bb0f;border:1px solid #669e0b;color:#000;"
    }
  },
  color: {
    "1": "蓝色",
    "2": "黄色",
    "3": "黑色",
    "4": "白色",
    "9": "其他"
  },
  get_color: function(key) {
    return this.color[key] || "--";
  },
  logical_channel: {
    "1": "驾驶员",
    "2": "车辆正前方",
    "3": "车前门",
    "4": "车厢前部",
    "5": "车厢后部",
    "6": "车后门",
    "7": "行李舱",
    "8": "车辆左侧",
    "9": "车辆右侧",
    "10": "车辆正后方",
    "11": "车厢中部",
    "12": "车中门",
    "13": "驾驶席车门",
    "33": "驾驶员",
    "36": "车厢前部",
    "37": "车厢后部"
  },
  get_logical_channel: function(key) {
    return this.logical_channel[key] || "--";
  },
  permissions: {
    "1-1-1": "车辆-添加",
    "1-1-2": "车辆-删除",
    "1-1-3": "车辆-修改",
    "1-1-4": "车辆-查看",
    "1-1-5": "车辆-导出",
    "1-1-6": "车辆-导入",
    "1-1-7": "车辆-车辆位置",
    "1-1-8": "车辆-更新定位",
    "1-2-1": "故障车辆-添加",
    "1-2-2": "故障车辆-故障排除",
    "1-2-3": "故障车辆-查看",
    "1-3-1": "车辆数据连接",
    "1-4-2": "车辆参数设置",
    "2-1-1": "终端管理-添加",
    "2-1-2": "终端管理-删除",
    "2-1-3": "终端管理-修改",
    "2-1-4": "终端管理-查看",
    "2-1-5": "终端管理-导入",
    "2-1-6": "终端管理-导出",
    "2-1-7": "终端管理-分配用户",
    "2-2-1": "设备维修-添加",
    "2-2-2": "设备维修-修改",
    "2-2-3": "设备维修-查看",
    "2-3-1": "SIM卡-添加",
    "2-3-2": "SIM卡-删除",
    "2-3-3": "SIM卡-修改",
    "2-3-4": "SIM卡-查看",
    "2-3-5": "SIM卡-充值",
    "2-3-6": "SIM卡-导入",
    "2-3-7": "SIM卡-导出",
    "2-3-8": "SIM卡-分配用户",
    "2-4-1": "终端厂商管理-添加",
    "2-4-2": "终端厂商管理-删除",
    "2-4-3": "终端厂商管理-修改",
    "2-4-4": "终端厂商管理-查看",
    "3-1-1": "产品管理-添加",
    "3-1-2": "产品管理-删除",
    "3-1-3": "产品管理-修改",
    "3-1-4": "产品管理-查看",
    "3-1-5": "产品管理-分配用户",
    "3-2-1": "订单管理-取消",
    "3-2-2": "订单管理-查看",
    "3-2-3": "订单管理-厂商激活",
    "3-2-4": "订单管理-厂商续费",
    "3-2-5": "订单管理-平台续费",
    "3-3-1": "充值管理-充值",
    "3-3-2": "充值管理-查看",
    "3-3-3": "充值管理-取消",
    "3-4-1": "订单审核-审核",
    "3-4-2": "订单审核-查看",
    "3-4-3": "订单审核-取消",
    "4-1-1": "企业管理-添加",
    "4-1-2": "企业管理-删除",
    "4-1-3": "企业管理-修改",
    "4-1-4": "企业管理-查看",
    "4-2-1": "角色管理-添加",
    "4-2-2": "角色管理-删除",
    "4-2-3": "角色管理-修改",
    "4-2-4": "角色管理-查看",
    "5-1-1": "车辆分组-添加",
    "5-1-2": "车辆分组-删除",
    "5-1-3": "车辆分组-修改",
    "5-1-4": "车辆分组-查看",
    "5-1-5": "分车管理",
    "6-1-1": "司机管理-添加",
    "6-1-2": "司机管理-删除",
    "6-1-3": "司机管理-修改",
    "6-1-4": "司机管理-查看",
    "7-1-1": "报表-报警报表",
    "7-1-2": "报表-行车报表",
    "7-1-3": "报表-驾驶行为分析",
    "7-1-4": "报表-电子围栏报表",
    "7-1-5": "报表-故障报警报表",
    "7-1-6": "报表-里程报表",
    "7-1-7": "报表-数据查询",
    "7-1-8": "报表-用户行为分析表",
    "7-1-9": "报表-车辆连接统计表",
    "7-1-10": "报表-视频报警报表"
    // "8-1-1": "报警信息管理-查看",
    // "8-1-2": "报警信息管理-报警联动设置",
    // "9-1-1": "视频监控-报警",
    // "9-1-2": "视频监控-休眠唤醒",
    // "9-1-3": "视频监控-音视频流量统计",
    // "9-1-4": "视频监控-视频抓拍",
    // "10-1-1": "云镜控制-云镜控制",
    // "10-1-2": "云镜控制-预置位设置",
    // "10-1-3": "云镜控制-辅助功能",
    // "11-1-1": "录像管理-查看录像",
    // "12-1-1": "系统管理-登录账号/密码修改"
  },
  get_permissions: function(key) {
    return this.permissions[key] || "--";
  },
  // 常规终端报警类型
  alarm: {
    "1": "紧急报警",
    "2": "超速报警",
    "4": "疲劳驾驶",
    "8": "危险预警", //原 危险预警
    "16": "GNSS模块发生故障",
    "32": "GNSS天线未接或被剪断",
    "64": "GNSS天线短路",
    "128": "终端主电源欠压",
    "256": "终端主电源掉电",
    "512": "终端LCD或显示器故障",
    "1024": "TTS模块故障",
    "2048": "摄像头故障",
    "4096": "道路运输证IC卡模块故障",
    "8192": "超速预警",
    "16384": "疲劳驾驶预警",
    "262144": "当天累计驾驶超时",
    "524288": "超时停车",
    "1048576": "进出区域",
    "2097152": "进出路线",
    "4194304": "路段行驶时间不足/过长",
    "8388608": "路线偏离报警",
    "16777216": "车辆VSS故障",
    "33554432": "车辆油量异常",
    "67108864": "车辆被盗",
    "134217728": "车辆非法点火",
    "268435456": "车辆非法位移",
    "536870912": "碰撞侧翻报警", //原 碰撞预警
    "1073741824": "侧翻预警",
    "2147483648": "非法开门报警"
  },
  additional_alarm_64: {
    //省标协议中0x64报警类型
    "1": "前向碰撞报警",
    "2": "车道偏离报警",
    "3": "车距过近报警",
    "4": "行人碰撞报警",
    "5": "频繁变道报警",
    "6": "道路标识超限报警",
    "7": "障碍物报警",
    "16": "道路标志识别事件",
    "17": "主动抓拍事件"
  },
  get_additional_alarm_64: function(key) {
    return this.additional_alarm_64[key] || "";
  },
  additional_alarm_64_road_sign: {
    //省标协议中0x64 道路标志识别类型
    "1": "限速标志",
    "2": "限高标志",
    "3": "限重标志"
  },
  additional_alarm_65: {
    //省标协议中0x65报警类型
    "1": "疲劳驾驶报警",
    "2": "接打电话报警",
    "3": "抽烟报警",
    "4": "分神驾驶报警",
    "5": "驾驶员异常报警",
    "6": "无驾驶员",
    "16": "自动抓拍事件",
    "17": "驾驶员变更事件"
  },
  get_additional_alarm_65: function(key) {
    return this.additional_alarm_65[key] || "";
  },
  // 视频报警类型
  video_alarm: {
    "1": "视频信号丢失",
    "2": "视频信号遮挡",
    "4": "存储单元故障",
    "8": "其他视频设备故障",
    "16": "客车超员",
    "32": "异常驾驶行为",
    "64": "特殊录像报警达到存储阈值"
  },
  // 扩展报警类型
  additional_alarm: {
    "1": "违规行驶报警",
    "2": "前撞报警",
    "4": "胎压异常报警",
    "8": "车道偏离报警"
  },
  // 其他报警类型
  other_alarm: {
    "1": "ACC信号异常报警",
    "2": "位置信息异常报警",
    "3": "平台（疲劳驾驶）报警"
  },
  // 平台报警类型
  fence_alarm: {
    inAlarm: "禁入",
    outAlarm: "禁出",
    lineOut: "线路偏移",
    splitPolylineSpeed: "分段限速",
    keyPoint: "关键点"
  },
  get_fence_alarm: function(num) {
    return this.fence_alarm[num] || "";
  },
  get_other_alarm: function(num) {
    return this.other_alarm[num] || "";
  },
  getAdditionalAlarmKey: function(num) {
    var keys = [];
    for (var key in this.additional_alarm) {
      if ((num & key) == key) {
        keys.push(key);
      }
    }
    return keys;
  },
  get_additional_alarm: function(num) {
    var str = [];
    for (var key in this.additional_alarm) {
      if ((num & key) == key) {
        str.push(this.additional_alarm[key]);
      }
    }
    return str.join(",");
  },
  get_additional_alarms: function(num) {
    return this.additional_alarm[num] || "";
  },
  get_additional_alarmList: function(data) {
    var str = [];
    data.map(item => {
      str.push(this.additional_alarm[item]);
    });
    return str.join(",");
  },
  get_video_alarm: function(num) {
    var str = [];
    for (var key in this.video_alarm) {
      if ((num & key) == key) {
        str.push(this.video_alarm[key]);
      }
    }
    return str.join(",");
  },
  getAlarmList: function(str) {
    str = str.split(",");
    var bunch = [];
    str.map(item => {
      bunch.push(this.alarm[item]);
    });
    return bunch.join();
  },
  getAlarms: function(key) {
    return this.alarm[key] || "--";
  },
  getAlarm: function(num) {
    var str = [];
    for (var key in this.alarm) {
      if ((num & key) == key) {
        str.push(this.alarm[key]);
      }
    }
    return str.join(",");
  },
  getAlarmKey: function(num) {
    var keys = [];
    for (var key in this.alarm) {
      if ((num & key) == key) {
        keys.push(key);
      }
    }
    return keys;
  },
  vehicle_alarm: {
    "1": "超速报警",
    "2": "疲劳驾驶报警",
    "3": "紧急报警",
    "4": "进入指定区域报警",
    "5": "离开指定区域报警",
    "6": "路段赌赛报警",
    "7": "危险路段报警",
    "8": "越界报警",
    "9": "盗警",
    "10": "劫警",
    "11": "偏离路线报警",
    "12": "车辆移动报警",
    "13": "超时驾驶报警",
    "14": "其他报警"
  },
  get_vehicle_alarm: function(key) {
    return this.vehicle_alarm[key] || "--";
  },
  get_license_color: function(key) {
    return this.license_color[key] || {};
  },
  fuel_type: {
    "1": "柴油",
    "2": "汽油",
    "3": "电",
    "4": "乙醇",
    "5": "液化天然气(LNG)",
    "6": "压缩天然气(CNG)"
  },
  get_fuel_type: function(key) {
    return this.fuel_type[key] || {};
  },
  device_type: {
    "1": "定位终端",
    "2": "视频终端"
  },
  get_device_type: function(key) {
    return this.device_type[key] || "--";
  },
  protocol_type: {
    "1": "808部标协议",
    "2": "1078部标协议"
  },
  get_protocol_type: function(key) {
    return this.protocol_type[key] || "--";
  },
  device_state: {
    "1": "未安装",
    "2": "已安装",
    "3": "维修中",
    "4": "报废"
  },
  get_device_state: function(key) {
    return this.device_state[key] || "--";
  },
  save_media: {
    "1": "硬盘",
    "2": "sd卡"
  },
  get_save_media: function(key) {
    return this.save_media[key] || "--";
  },
  repair_state: {
    "1": "安装",
    "2": "解绑",
    "3": "维修",
    "4": "修复",
    "5": "报废"
  },
  get_repair_state: function(key) {
    return this.repair_state[key] || "--";
  },
  company_type: {
    "1": "前装厂商",
    "2": "后装厂商"
  },
  vehiclerepair_state: {
    "1": "未处理",
    "2": "已修复",
    "3": "已更换"
  },
  get_vehiclerepair_state: function(key) {
    return this.vehiclerepair_state[key] || "--";
  },
  get_company_type: function(key) {
    return this.company_type[key] || "--";
  },
  fence_type: {
    "1048576": "进出区域 ",
    "2097152": "进出路线",
    "4194304": "路段行驶时间不足/过长",
    "8388608": "路线偏离"
  },
  get_fence_type: function(key) {
    return this.fence_type[key] || "--";
  },
  alarm_type: {
    "1": "紧急报警",
    "2": "超速报警",
    "4": "疲劳驾驶",
    "8": "危险预警",
    "8192": "超速预警",
    "16384": "疲劳驾驶预警",
    "262144": "当天累计驾驶超时",
    "524288": "超时停车",
    "1048576": "进出区域",
    "2097152": "进出路线",
    "4194304": "路段行驶时间不足/过长",
    "8388608": "路线偏离报警",
    "33554432": "车辆油量异常",
    "67108864": "车辆被盗(通过车辆防盗器)",
    "134217728": "车辆非法点火",
    "268435456": "车辆非法位移",
    "536870912": "碰撞预警",
    "1073741824": "侧翻预警",
    "2147483648": "非法开门报警"
  },
  fault_type: {
    "16": "GNSS 模块发生故障",
    "32": "GNSS 天线未接或被剪断",
    "64": "GNSS 天线短路",
    "128": "终端主电源欠压",
    "256": "终端主电源掉电",
    "512": "终端 LCD 或显示器故障",
    "1024": "TTS 模块故障",
    "2048": "摄像头故障",
    "4096": "道路运输证 IC 卡模块故障",
    "16777216": "车辆 VSS 故障"
  },
  get_fault_type: function(key) {
    return this.fault_type[key] || "--";
  },
  vehiclefault_type: {
    "1": "设备故障"
  },
  get_vehiclefault_type: function(key) {
    return this.vehiclefault_type[key] || "--";
  },
  get_alarm_type: function(key) {
    return this.alarm_type[key] || "--";
  },
  //所属行业(单纯记录 非必填):普货，长途，出租，校车，公交车等等
  industry: {
    "010": "道路旅客运输",
    "020": "道路货物运输",
    "030": "道路维修货物运输"
  },
  get_industry: function(key) {
    return this.industry[key] || "--";
  },
  industry_son: {
    "011": "班车客运",
    "012": "包车客运",
    "013": "定线旅游",
    "014": "非定线旅游",
    "021": "道路普通货物运输",
    "022": "货物专用运输",
    "023": "大型物件运输",
    "031": "营运性危险货物运输",
    "032": "非经营性危险货物运输"
  },
  get_industry_son: function(key) {
    return this.industry_son[key] || "--";
  },
  sim_state: {
    "1": "已使用",
    "2": "未使用"
  },
  get_sim_state: function(key) {
    return this.sim_state[key] || "未使用";
  },
  order_paytype: {
    "1": "计费",
    "2": "扣费"
  },
  get_order_paytype: function(key) {
    return this.order_paytype[key] || "--";
  },
  order_state: {
    "1": "前装车待审核",
    "2": "正常",
    "3": "拒绝开通前装车",
    "4": "取消订单审核通过",
    "5": "取消订单审核",
    "6": "取消订单审核未通过"
  },
  get_order_state: function(key) {
    return this.order_state[key] || "--";
  },
  order_detailtype: {
    "1": "授权车辆",
    "2": "授权厂商",
    "3": "短信",
    "4": "SIM卡"
  },
  get_order_detailtype: function(key) {
    return this.order_detailtype[key] || "--";
  },
  license_species: {
    "1": "大型汽车号牌",
    "2": "挂车号牌",
    "3": "小型汽车号牌",
    "4": "使馆汽车号牌",
    "5": "领馆汽车号牌",
    "6": "港澳入出境车号牌",
    "7": "教练汽车号牌",
    "8": "警用汽车号牌",
    "9": "普通摩托车号牌",
    "10": "轻便摩托车号牌",
    "11": "使馆摩托车号牌",
    "12": "领馆摩托车号牌",
    "13": "教练摩托车号牌",
    "14": "警用摩托车号牌",
    "15": "低速车号牌",
    "16": "临时行驶车号牌",
    "17": "临时入境汽车号牌",
    "18": "临时入境摩托车号牌",
    "19": "拖拉机号牌"
  },
  get_license_species: function(key) {
    return this.license_species[key] || "--";
  },
  vehicle: {
    "10": "客车",
    "11": "大型客车",
    "12": "中型客车",
    "13": "小型客车",
    "14": "轿车",
    "15": "大型卧铺客车",
    "16": "中兴卧铺客车",
    "20": "普通客车",
    "21": "大型普通客车",
    "22": "中型普通客车",
    "23": "小型普通客车",
    "30": "专用运输车",
    "31": "集装箱车",
    "32": "大件运输车",
    "33": "保温冷藏车",
    "34": "商品车运输车专用车辆",
    "35": "罐车",
    "36": "牵引车",
    "37": "挂车",
    "38": "平板车",
    "39": "其他专用车",
    "40": "危险品运输车",
    "50": "农用车",
    "60": "拖拉机",
    "61": "轮式拖拉机",
    "62": "手扶拖拉机",
    "63": "履带拖拉机",
    "64": "特种拖拉机",
    "90": "其他车辆"
  },
  get_vehicle: function(key) {
    return this.vehicle[key] || "--";
  },
  //所属行业(单纯记录 非必填):普货，长途，出租，校车，公交车等等
  vehicle_type: {
    "1": "物流运输（普货）",
    "2": "危险品车辆",
    "3": "长途客运、班线车辆"
    // "4": "出租车",
    // "5": "私家车",
    // "6": "校车",
    // "7": "城市公共交通车辆",
    // "8": "网约车",
    // "9": "警务车辆",
    // "10": "其他车辆"
  },
  get_vehicle_type: function(key) {
    return this.vehicle_type[key] || "--";
  },
  vtype: {
    t105: "半挂车",
    t115: "爆破器材运输车",
    t120: "仓栅式货车",
    t136: "仓栅式运输车",
    t156: "大型非载货专项作业车",
    t108: "大型货车",
    t26: "大型载货专项作业车",
    t119: "大型专项作业车",
    t110: "低速载货汽车",
    t128: "非封闭厢式",
    t129: "非厢式",
    t123: "粉粒物料运输车",
    t127: "封闭厢式",
    t133: "挂车",
    t102: "罐车",
    t137: "混凝土搅拌运输车",
    t104: "集装箱车",
    t131: "农用车",
    t121: "平头柴油载货汽车",
    t153: "平头柴油自卸货车",
    t101: "普通货车",
    t103: "牵引车",
    t148: "轻型仓栅式货车",
    t162: "轻型非载货专项作业车",
    t161: "轻型普通货车",
    t163: "轻型特殊结构货车",
    t159: "轻型厢式货车",
    t157: "轻型自卸货车",
    t122: "洒布车",
    t109: "厢式货车",
    t130: "载货汽车",
    t132: "整车",
    t138: "中型半挂牵引车",
    t143: "中型仓栅式货车",
    t24: "中型非载货专项作业车",
    t149: "中型罐式货车",
    t22: "中型普通货车",
    t140: "中型特殊结构货车",
    t146: "中型厢式货车",
    t160: "中型载货专项作业车",
    t145: "中型专项作业车",
    t116: "中型自卸货车",
    t124: "重型半挂牵引车",
    t25: "重型仓栅式半挂车",
    t135: "重型仓栅式货车",
    t164: "重型车辆运输车",
    t144: "重型非载货专项作业车",
    t139: "重型封闭货车",
    t158: "重型罐式半挂车",
    t113: "重型罐式货车",
    t29: "重型罐式自卸货车",
    t114: "重型货车",
    t154: "重型集装箱半挂车",
    t142: "重型集装箱车",
    t28: "重型平板半挂车",
    t125: "重型平板货车",
    t155: "重型平板自卸货车",
    t152: "重型普通半挂车",
    t126: "重型普通货车",
    t118: "重型特殊结构货车",
    t165: "重型特殊结构自卸货车",
    t27: "重型厢式半挂车",
    t112: "重型厢式货车",
    t23: "重型载货专项作业车",
    t117: "重型专项作业车",
    t134: "重型自卸货车",
    t111: "专用运输车",
    t106: "自卸车"
  },
  get_vtype: function(key) {
    // key = key.slice(1);
    return this.vtype[key] || "--";
  },
  communication: {
    Ox0001: "终端心跳发送间隔",
    Ox0002: "TCP消息应答超时时间",
    Ox0003: "TCP消息重传次数",
    Ox0004: "UDP消息应答超时时间",
    Ox0005: "UDP消息重传次数",
    Ox0006: "SMS消息应答超时时间",
    Ox0007: "SMS消息重传次数",
    Ox0010: "主服务器APN",
    Ox0013: "主服务器地址IP或域名",
    Ox0014: "备份服务器APN",
    Ox0017: "备份服务器地址IP或域名",
    Ox0018: "服务器TCP端口",
    Ox0019: "服务器UDP端口",
    Ox0020: "位置汇报策略",
    Ox0021: "位置汇报方案",
    Ox0022: "驾驶员未登录汇报时间间隔",
    Ox0027: "休眠时汇报时间间隔",
    Ox0028: "紧急报警时汇报时间间隔",
    Ox0029: "缺省时间汇报时间间隔",
    Ox002c: "缺省距离汇报距离间隔",
    Ox002d: "驾驶员未登录汇报距离间隔",
    Ox002e: "休眠时汇报距离间隔",
    Ox002f: "紧急报警时汇报距离间隔",
    Ox0040: "监控平台电话号码",
    Ox0041: "复位电话号码",
    Ox0042: "恢复出厂设置电话号码",
    Ox0043: "监控平台SMS电话号码",
    Ox0044: "接收终端SMS文本报警号码",
    Ox0045: "终端电话接听策略",
    Ox0046: "每次最长通话时间",
    Ox0047: "当月最长通话时间",
    Ox0048: "监听电话号码",
    Ox0049: "监管平台特权短信号码",
    Ox0050: "报警屏蔽字",
    Ox0051: "报警发送文本SMS开关",
    Ox0052: "报警拍摄开关",
    Ox0053: "报警拍摄存储标志",
    Ox0054: "关键标志",
    Ox0055: "最高速度",
    Ox0056: "超速持续时间",
    Ox0057: "连续驾驶时间门限",
    Ox0058: "当天累计驾驶时间门限",
    Ox0059: "最小休息时间",
    Ox005a: "最长停车时间",
    Ox005b: "超速报警预警差值",
    Ox005c: "疲劳驾驶预警差值",
    Ox005d: "碰撞报警参数设置",
    Ox005e: "侧翻报警参数设置",
    Ox0064: "定时拍照控制",
    Ox0065: "定距拍照控制",
    Ox0070: "图像/视频质量",
    Ox0071: "亮度",
    Ox0072: "对比度",
    Ox0073: "饱和度",
    Ox0074: "色度",
    Ox0081: "车辆所在的省域ID",
    Ox0082: "车辆所在的市域ID",
    Ox0083: "机动车号牌",
    Ox0084: "车牌颜色"
  },
  get_communication: function(key) {
    return this.communication[key] || "";
  },
  special: {
    "1": "雷雨天气",
    "2": "路面潮湿",
    "3": "雾天",
    "4": "山体滑坡",
    "5": "台风",
    "6": "地震",
    "7": "隧道冒顶",
    "8": "洪水",
    "9": "风沙",
    "10": "泥石流"
  },
  get_special: function(key) {
    return this.special[key] || "--";
  },
  demand: {
    "1": "每日新闻",
    "2": "天气预报"
  },
  get_demand: function(key) {
    return this.demand[key] || "--";
  },
  access_vehicletype: {
    "1": "道路旅客运输",
    "2": "道路货物运输",
    "3": "道路危险货物运输"
  },
  get_access_vehicletype: function(key) {
    return this.access_vehicletype[key] || "--";
  },
  number: {
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten",
    "11": "Eleven",
    "12": "Twelve",
    "13": "Thirteen",
    "14": "Fourteen",
    "15": "Fifteen",
    "16": "Sixteen",
    "17": "Sevevteen",
    "18": "Eighteen",
    "19": "Nineteen",
    "20": "Twenty"
  },
  get_number: function(key) {
    return this.number[key] || "--";
  }
};
if (process.env.NODE_ENV == "production") {
  dict = Object.assign(dict, window.BEIDOU_CONFIG);
}
import utils from "@/utils/utils";
export { utils, dict };
