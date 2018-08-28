import ajax from "./ajax.js";
// eslint-disable-next-line
import qs from "qs";
// 行驶轨迹明细
export const getReport = query => {
  return ajax.get("/Report/GetLocationDataByPage", {
    params: query
  });
};
// 轨迹超速汇总表
export const getDrivingSummary = query => {
  return ajax.get("/Report/GetOverspeedCollectByPage", {
    params: query
  });
};
// 轨迹超速明细表
export const getDrivingDetails = query => {
  return ajax.get("/GetOverspeedDetailByPage", {
    params: query
  });
};
