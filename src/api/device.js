import ajax from "./ajax.js";
import qs from "qs";
//设备管理
export const getDeviceAll = query => {
  query = Object.assign(
    {
      state: "",
      device_no: ""
    },
    query
  );

  return ajax.get("/device/GetAll", {
    params: query
  });
};
export const getDeviceUserList = query => {
  return ajax.get("/device/GetUserList", {
    params: query
  });
};
export const getDeviceSimUserList = query => {
  return ajax.get("/sim/GetUserList", {
    params: query
  });
};
export const getDeviceAllUnbind = query => {
  //获取所有没有绑定的设备
  query = Object.assign(
    {
      page: 1,
      size: 10
    },
    query
  );
  return ajax.get("/Device/GetUnboundListByPage", {
    params: query
  });
};
export const getUserDevice = query => {
  return ajax.get("/device/GetUserDevice", {
    params: query
  });
};
//给用户分配设备
export const addUserDevice = query => {
  var queryQS = qs.stringify({ device_ids: query.device_ids });
  return ajax.post("/device/AddUserDevice", queryQS, {
    params: { user_id: query.user_id }
  });
};

//删除用户分配的设备
export const delUserDevice = query => {
  var queryQS = qs.stringify({ device_ids: query.device_ids });
  return ajax.post("/device/DeleteUserDevice", queryQS, {
    params: { user_id: query.user_id }
  });
};

export const getDeviceList = query => {
  return ajax.get("/device/GetListByPage", {
    params: query
  });
};
export const getDevice = query => {
  return ajax.get("/device/GetByID", {
    params: query
  });
};
export const addDevice = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/Add", queryQS, {
    params: query
  });
};
export const updateDevice = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/Update", queryQS, {
    params: query
  });
};
export const delDevice = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/Delete", queryQS, {
    params: query
  });
};

// 维修设备管理
export const getDeviceRepairAll = query => {
  return ajax.get("/device_operate_log/GetAll", {
    params: query
  });
};
export const getDeviceRepairList = query => {
  return ajax.get("/device/GetRepairListByPage", {
    params: query
  });
};
export const getDeviceRepair = query => {
  return ajax.get("/device_operate_log/GetByID", {
    params: query
  });
};
export const addDeviceRepair = query => {
  query = qs.stringify(query);
  return ajax.post("/device_operate_log/Add", query);
};
export const updateDeviceRepair = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/UpdateDeviceState", queryQS, {
    params: query
  });
};
export const delDeviceRepair = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device_repair/Delete", queryQS, {
    params: query
  });
};
export const getOperateLogList = query => {
  return ajax.get("/device/GetDeviceOperateLog", {
    params: query
  });
};

// SIM卡管理
export const getSimAll = query => {
  return ajax.get("/sim/GetAll", {
    params: query
  });
};
// 获取流量分组
export const getGroupByFlow = query => {
  return ajax.get("/sim/GetGroupByFlow", {
    params: query
  });
};
// 获取运营商分组
export const getGroupByBelong = query => {
  return ajax.get("/sim/GetGroupByBelong", {
    params: query
  });
};
//获取所有没有绑定的SIM卡
export const getSimAllUnbind = query => {
  query = Object.assign(
    {
      page: 1,
      size: 10,
      start_sim_no: "",
      end_sim_no: ""
    },
    query
  );
  return ajax.get("/sim/GetUnboundListByPage", {
    params: query
  });
};
export const getUserSim = query => {
  return ajax.get("/sim/GetUserSim", {
    params: query
  });
};
//给用户分配SIM卡
export const addUserSim = query => {
  var queryQS = qs.stringify({ sim_nos: query.sim_nos });
  return ajax.post("/sim/AddUserSim", queryQS, {
    params: { user_id: query.user_id }
  });
};
//删除用户分配的SIM卡
export const delUserSim = query => {
  var queryQS = qs.stringify({ sim_nos: query.sim_nos });
  return ajax.post("/sim/DeleteUserSim", queryQS, {
    params: { user_id: query.user_id }
  });
};
export const getSimList = query => {
  query = Object.assign(
    {
      page: 1,
      size: 10
    },
    query
  );
  return ajax.get("/sim/GetListByPage", {
    params: query
  });
};
export const getSim = query => {
  return ajax.get("/sim/GetByID", {
    params: query
  });
};
export const addSim = query => {
  query = qs.stringify(query);
  return ajax.post("/sim/Add", query);
};
export const updateSim = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/sim/Update", queryQS, {
    params: query
  });
};
export const delSim = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("sim/Delete", queryQS, {
    params: query
  });
};
// 终端厂商管理
export const getDeviceCompanyAll = query => {
  return ajax.get("/device_company/GetAll", {
    params: query
  });
};
export const getDeviceCompanyList = query => {
  return ajax.get("/device_company/GetListByPage", {
    params: query
  });
};
export const getDeviceCompany = query => {
  return ajax.get("/device_company/GetByID", {
    params: query
  });
};
export const addDeviceCompany = query => {
  query = qs.stringify(query);
  return ajax.post("/device_company/Add", query);
};
export const updateCompany = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device_company/Update", queryQS, {
    params: query
  });
};
export const delCompany = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device_company/Delete", queryQS, {
    params: query
  });
};

export const existSimNo = query => {
  //SIM卡管理-验证SIM卡号是否重复
  query = Object.assign({ sim_no: "" }, query);
  return ajax.get("/sim/exists_sim_no", {
    params: query
  });
};

export const existIccId = query => {
  //SIM卡管理-验证ICCID是否重复
  query = Object.assign({ icc_id: "" }, query);
  return ajax.get("/sim/exists_icc_id", {
    params: query
  });
};

export const existDeviceId = query => {
  //设备管理-验证device_id是否重复
  query = Object.assign({ device_id: "" }, query);
  return ajax.get("/device/exists_device_id", {
    params: query
  });
};

export const existDeviceSimId = query => {
  //设备管理-验证sim_id是否重复
  query = Object.assign({ sim_id: "" }, query);
  return ajax.get("/device/exists_sim_id", {
    params: query
  });
};

//获取未安装的SIM卡
export const getSimALlUninstall = query => {
  query = Object.assign(
    {
      page: 1,
      size: 10,
      start_sim_no: "",
      end_sim_no: ""
    },
    query
  );
  return ajax.get("/sim/GetNotInstallUnboundListByPage", {
    params: query
  });
};

//获取未安装的设备
export const getDeviceALlUninstall = query => {
  query = Object.assign(
    {
      page: 1,
      size: 10
    },
    query
  );
  return ajax.get("/device/GetNotInstallUnboundListByPage", {
    params: query
  });
};

// 用户常用分组管理添加
export const addDeviceGroupUser = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/AddDeviceGroupUser", queryQS, {
    params: query
  });
};
// 用户常用分组管理修改
export const updateDeviceGroupUser = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/UpdateDeviceGroupUser", queryQS, {
    params: query
  });
};
// 用户常用分组管理删除
export const deleteDeviceGroupUser = query => {
  return ajax.get("/device/DeleteDeviceGroupUser", {
    params: query
  });
};
// 用户常用分组管理 获取当前用户所有常用分组
export const getListByUserId = query => {
  return ajax.get("/device/GetListByUserId", {
    params: query
  });
};
// 用户常用分组管理 分配设备
export const addGroupDevice = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/AddGroupDevice", queryQS, {
    params: query
  });
};
// 用户常用分组管理 解绑设备
export const deleteGroupDevice = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/DeleteGroupDevice", queryQS, {
    params: query
  });
};
// 用户常用分组管理-获取分组下的设备
export const getListByGroupId = query => {
  return ajax.get("/device/GetListByGroupId", {
    params: query
  });
};
// 用户常用分组管理-获取非当前分组下的设备
export const getListByNotGroupId = query => {
  return ajax.get("/device/GetListByNotGroupId", {
    params: query
  });
};
// 获取厂商下的升级包列表
export const GetListByCompanyId = query => {
  return ajax.get("/device/GetListByCompanyId", {
    params: query
  });
};
// 查询单个升级包信息
export const GetPackageModelById = query => {
  return ajax.get("/device/GetPackageModelById", {
    params: query
  });
};
// 添加升级包
export const AddDeviceUpgradePackage = query => {
  // var queryQS = qs.stringify(query);
  return ajax.post("/device/AddDeviceUpgradePackage", query.fileData, {
    params: query
  });
};
// 修改升级包
export const UpdateDeviceUpgradePackage = query => {
  // var queryQS = qs.stringify(query);
  return ajax.post("/device/UpdateDeviceUpgradePackage", query.fileData, {
    params: query
  });
};
// 删除升级包
export const DeleteDeviceUpgradePackage = query => {
  return ajax.get("/device/DeleteDeviceUpgradePackage", {
    params: query
  });
};
// 添加升级记录
export const AddDeviceUpgradeRecord = query => {
  var queryQS = qs.stringify(query);
  return ajax.post("/device/AddDeviceUpgradeRecord", queryQS, {
    params: query
  });
};
// 查询升级记录
export const GetRecordList = query => {
  return ajax.get("/device/GetRecordList", {
    params: query
  });
};
