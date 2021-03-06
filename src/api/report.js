import ajax from "./ajax.js";
// eslint-disable-next-line
import qs from "qs";
// 根据子用户查询
export const getUserChildrenList = query => {
  return ajax.get("/user/GetUserChildrenList", {
    params: query
  });
};
// 行驶轨迹明细
export const getReport = query => {
  return ajax.get("/Report/GetLocationDetailByPage", {
    params: query
  });
};
// 轨迹超速汇总表
export const getDrivingSummary = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetOverspeedSummaryByPage", queryQS, {
    params: query
  });
};
// 轨迹超速明细表
export const getDrivingDetails = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetOverspeedDetailByPage", queryQS, {
    params: query
  });
};
// 查询车辆分页（报表）
export const getVehicleByPage = query => {
  return ajax.get("/vehicle/GetVehicleByPage", {
    params: query
  });
};
// 报警统计表
export const getAlarmSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetAlarmSummaryByPage", queryQS, {
    params: query
  });
};
// 报警明细表
export const getAlarmDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetAlarmDetailByPage", queryQS, {
    params: query
  });
};
// 里程汇总表
export const getMileageSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetMileageSummaryByPage", queryQS, {
    params: query
  });
};
// 里程明细表
export const getMileageDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetMileageDetailByPage", queryQS, {
    params: query
  });
};
// 故障报警统计表
export const getFaultSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetFaultSummaryByPage", queryQS, {
    params: query
  });
};
// 故障报警明细表
export const getFaultDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetFaultDetailByPage", queryQS, {
    params: query
  });
};
// ACC点火统计表
export const getACCSumaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetACCSumaryByPage", queryQS, {
    params: query
  });
};
// ACC点火明细表
export const getACCDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetACCDetailByPage", queryQS, {
    params: query
  });
};
// 围栏报警统计表
export const getFenceSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetFenceSummaryByPage", queryQS, {
    params: query
  });
};
// 围栏报警明细表
export const getFenceDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetFenceDetailByPage", queryQS, {
    params: query
  });
};
// 在线时长统计
export const getLoginSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetLoginSummaryByPage", queryQS, {
    params: query
  });
};
// 用户登录明细
export const getLoginDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetLoginDetailByPage", queryQS, {
    params: query
  });
};
// 用户操作日志
export const getUserOperateLogByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetUserOperateLogByPage", queryQS, {
    params: query
  });
};
// 停车汇总表
export const getStopSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetStopSummaryByPage", queryQS, {
    params: query
  });
};
// 停车明细表
export const getStopDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetStopDetailByPage", queryQS, {
    params: query
  });
};
// 夜间行车汇总表
export const getNightSummaryByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetNightSummaryByPage", queryQS, {
    params: query
  });
};
// 夜间行车明细表
export const getNightDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetNightDetailByPage", queryQS, {
    params: query
  });
};
// 车辆维护记录
export const getVehicleLogByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetVehicleLogByPage", queryQS, {
    params: query
  });
};
// 设备变更报表
export const getDeviceLogByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/Report/GetDeviceLogByPage", queryQS, {
    params: query
  });
};
// 车辆上下线统计表
export const GetOnlineRateByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/report/GetOnlineRateByPage", queryQS, {
    params: query
  });
};
// 车辆上下线明细表
export const GetOnlineDetailByPage = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/report/GetOnlineDetailByPage", queryQS, {
    params: query
  });
};
//报警信息处理
export const UpdateAlarmHandler = query => {
  query = Object.assign(
    {
      id: "",
      state: "",
      remark: ""
    },
    query
  );
  var queryQS = qs.stringify(query);
  return ajax.post("/report/UpdateAlarmHandler", queryQS, {
    params: query
  });
};

/**
 * 省标0x64 0x65报警 分析图接口
 */
// 基本情况
export const getAdditionalAlarmChartBase = query => {
  return ajax.get("/AdditionalAlarmChart/GetBase", {
    params: query
  });
};
// 高级驾驶辅助系统报警分布(车辆饼状图)x64
export const getAdditionalAlarmChartPieVehicle = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/AdditionalAlarmChart/PieVehicle", queryQS, {
    params: query
  });
};
// 车辆报警TOP5(车辆柱状图)x64
export const getAdditionalAlarmChartBarVehicle = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/AdditionalAlarmChart/BarVehicle", queryQS, {
    params: query
  });
};
// 驾驶员状态监测系统报警分布(司机饼状图)x65
export const getAdditionalAlarmChartPieDriver = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/AdditionalAlarmChart/PieDriver", queryQS, {
    params: query
  });
};
// 驾驶员报警TOP5(司机柱状图)x65
export const getAdditionalAlarmChartBarDriver = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/AdditionalAlarmChart/BarDriver", queryQS, {
    params: query
  });
};
// 报警趋势
export const getAdditionalAlarmChartAll = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/AdditionalAlarmChart/GetAll", queryQS, {
    params: query
  });
};
// 驾驶员上传记录表
export const GetDriverCheckListByPage = query => {
  return ajax.get("/driver/GetDriverCheckListByPage", {
    params: query
  });
};
// 查询单个司机数据
export const GetDriverCheckByID = query => {
  return ajax.get("/driver/GetDriverCheckByID", {
    params: query
  });
};
// 单个司机基本信息
export const GetDriverByDriverDocument = query => {
  return ajax.get("/driver/GetDriverByDriverDocument", {
    params: query
  });
};
//报警附件-根据报警ID获取报警附件信息
export const GetInfoByPlatformAlarmId = query => {
  return ajax.get("/report/GetInfoByPlatformAlarmId", {
    params: query
  });
};
//报警附件-获取报警附件列表
export const GetFilesByIdInfo = query => {
  return ajax.get("/report/GetFilesByIdInfo", {
    params: query
  });
};
// 报警附件-获取bin文件信息
export const GetBinInfoByIdFiles = query => {
  return ajax.get("/report/GetBinInfoByIdFiles", {
    params: query
  });
};
