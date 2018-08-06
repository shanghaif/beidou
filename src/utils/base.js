export const dict = {
  //全局字典
  plate_color: {
    "1": {
      backgroundColor: "#FFBF00",
      borderColor: "#ffa500",
      name: "黄色",
      style: "background:#FFBF00;border:1px solid #ffa500;"
    },
    "2": {
      backgroundColor: "#005aff",
      borderColor: "#005aff",
      name: "蓝色",
      style: "background:#005aff;border:1px solid #005aff;"
    },
    "3": {
      backgroundColor: "#18ce65",
      borderColor: "#000",
      name: "绿色",
      style: "background:#18ce65;border:1px solid #000;"
    }
  },
  get_plate_color: function(key) {
    return this.plate_color[key] || {};
  },
  fule_type: {
    "1": { name: "柴油" },
    "2": { name: "汽油" },
    "3": { name: "电" },
    "4": { name: "乙醇" },
    "5": { name: "液化天然气(LNG)" },
    "6": { name: "压缩天然气(CNG)" }
  },
  get_fule_type: function(key) {
    return this.fule_type[key] || {};
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
    "3": "维修中"
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
    "1": "维修",
    "2": "已修复",
    "3": "报废",
    "4": "更换"
  },
  get_repair_state: function(key) {
    return this.repair_state[key] || "--";
  },
  company_type: {
    "1": "前装厂商",
    "2": "后装厂商"
  },
  get_company_type: function(key) {
    return this.company_type[key] || "--";
  },
  //所属行业(单纯记录 非必填):普货，长途，出租，校车，公交车等等
  industry: {
    "1": "物流运输（普货）",
    "2": "危险品车辆",
    "3": "长途客运、班线车辆",
    "4": "出租车",
    "5": "私家车",
    "6": "校车",
    "7": "城市公共交通车辆",
    "8": "网约车",
    "9": "警务车辆",
    "10": "其他车辆"
  },
  get_industry: function(key) {
    return this.industry[key] || "--";
  },
  sim_state: {
    "1": "已使用",
    "2": "未使用"
  },
  get_sim_state: function(key) {
    return this.sim_state[key] || "未使用";
  }
};
import utils from "@/utils/utils";
export { utils };
