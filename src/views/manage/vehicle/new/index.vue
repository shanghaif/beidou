<template>
  <div class="admin-table-container">
    <el-card shadow="always" class="admin-table-search">
      <el-form
        :model="tableQuery"
        label-width="80px"
        :label-position="isCollapse?'top':'left'"
        class="table-search"
        size="small"
        @submit.native.prevent
      >
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="车牌号">
              <el-input v-model="tableQuery.license" placeholder="车牌号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号">
              <el-input v-model="tableQuery.vin" placeholder="车架号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="终端ID">
              <el-input v-model="tableQuery.device_no" placeholder="终端ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="SIM ID">
              <el-input v-model="tableQuery.sim_id" placeholder="SIM ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="安装SIM卡号">
              <el-input v-model="tableQuery.sim_no" placeholder="安装SIM卡号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="isCollapse">
            <el-form-item label="设备型号">
              <el-input v-model="tableQuery.model_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="所属地区">
              <select-city-input :area.sync="area" :select-all="true" style="width:100%;" clearable></select-city-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="业户">
              <el-input v-model="tableQuery.owner" placeholder="业户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse" v-if="$props.state!=1">
            <el-form-item label="首次入网时间">
              <el-date-picker
                style="width:100%;"
                value-format="yyyyMMdd"
                v-model="first_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse">
            <el-form-item label="服务到期日期">
              <el-date-picker
                style="width:100%;"
                value-format="yyyyMMdd"
                v-model="contract_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isCollapse" v-if="$props.state!=1">
            <el-form-item label="离线天数">
              <el-select
                v-model="tableQuery.leave_day"
                placeholder="离线天数"
                style="width:100%;"
                clearable
              >
                <el-option label="7天" value="7"></el-option>
                <el-option label="30天" value="30"></el-option>
                <el-option label="90天" value="90"></el-option>
                <el-option label="180天" value="180"></el-option>
                <el-option label="360天" value="360"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="isCollapse?24:6" style="text-align: right;">
            <el-form-item>
              <el-button type="primary" @click="isCollapse=!isCollapse" v-if="isCollapse">收起</el-button>
              <el-button type="primary" @click="isCollapse=!isCollapse" v-if="!isCollapse">展开</el-button>
              <el-button
                type="primary"
                @click="searchTable"
                :loading="tableLoading"
                native-type="submit"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="always">
      <div class="admin-table-actions">
        <router-link :to="{path:'new/add'}" v-if="$props.state==1" v-rights="1-1-1">
          <el-button type="primary" size="small">
            <i class="el-icon-plus"></i> 添加
          </el-button>
        </router-link>
        <el-button v-if="$props.state==2" type="primary" @click="singleImport" size="small">单车导入</el-button>
        <el-button v-if="$props.state==2" type="primary" @click="moreImport" size="small">批量导入</el-button>
        <a
          href="/static/全国平台批量导入模板.xlsx"
          download
          target="_blank"
          type="primary "
          class="el-button el-button--small el-button--primary"
          style="width:199px; display:inline-block;margin-left:10px;"
        >
          <i class="el-icon-download"></i> 全国平台批量导入模板下载
        </a>
        <el-button style="margin-left:10px" type="primary" @click="exportExcel" size="small">
          <i class="el-icon-download"></i> 导出
        </el-button>
        <el-dropdown v-rights="2-1-5">
          <el-button size="small" style="margin-left: 15px;" type="primary">
            批量上传
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="padding:2px 15px;">
              <el-button style="margin-left:10px" type="primary" @click="openUpload" size="small">
                <i class="el-icon-download"></i> 点击上传
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item style="padding:2px 20px;">
              <a
                href="/static/车辆导入模板.xlsx"
                download
                target="_blank"
                type="primary "
                class="el-button el-button--small el-button--primary"
                style=" display:block;margin-left:4px;"
              >
                <i class="el-icon-download"></i> 模版下载
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-table
        :data="tableData.data"
        v-loading="tableLoading"
        style="width: 100%"
        class="admin-table-list"
      >
        <el-table-column
          prop="first_time"
          label="首次入网时间"
          :formatter="(row)=>{return $utils.formatDate(row.first_time)}"
        ></el-table-column>
        <el-table-column prop="license" label="车牌号" :formatter="$utils.baseFormatter">
          <template slot-scope="scope">
            <span
              class="license-card"
              :style="$dict.get_license_color(scope.row.license_color).style"
              @click="showDetails(scope)"
            >{{scope.row.license}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="vin"
          label="车架号"
          :formatter="$utils.baseFormatter"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="device_no" label="终端ID" :formatter="$utils.baseFormatter"></el-table-column>
        <el-table-column prop="sim_id" label="SIM ID" :formatter="$utils.baseFormatter"></el-table-column>
        <el-table-column prop="owner" label="业户" :formatter="$utils.baseFormatter"></el-table-column>
        <el-table-column prop="linkman" label="联系人" :formatter="$utils.baseFormatter"></el-table-column>
        <el-table-column prop="tel" label="电话" :formatter="$utils.baseFormatter"></el-table-column>
        <el-table-column
          prop="contract_date"
          label="到期日期"
          :formatter="(row)=>{return $utils.formatDate(row.contract_date)}"
        ></el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="goEdit(scope)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" @click="delRow(scope)">删除</el-button>
            <el-dropdown
              size="mini"
              style="margin-left:10px;"
              @command="handleCommand"
              trigger="click"
            >
              <el-button size="mini">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="vehicle-list-more">
                <el-dropdown-item
                  v-if="$props.state!=1"
                  :command="{command:'view-position',data:scope}"
                  v-rights="1-1-7"
                >车辆位置</el-dropdown-item>
                <el-dropdown-item
                  v-if="$props.state==1 "
                  :command="{command:'update-position',data:scope}"
                  v-rights="1-1-3"
                >更新定位</el-dropdown-item>
                <el-dropdown-item
                  v-if="renew_platform"
                  :command="{command:'renew-platform',data:scope}"
                >平台续费</el-dropdown-item>
                <el-dropdown-item
                  v-if="renew_company"
                  :command="{command:'renew-company',data:scope}"
                >厂商续费</el-dropdown-item>
                <el-dropdown-item
                  v-if="active_company"
                  :command="{command:'active-company',data:scope}"
                >厂商激活</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog
              title="平台续费"
              :center="true"
              @closed="openCompanyClosed"
              :visible.sync="renew.platformVisible"
              :append-to-body="true"
              width="30%"
            >
              <el-form label-position="top" :model="openCompany.postData" size="small">
                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item prop="plateformDate" label="服务到期日期">
                      <el-date-picker
                        style="width:100%;"
                        value-format="yyyyMMdd"
                        v-model="renew.plateformDate"
                        type="date"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" style="text-align:center;">
                    <el-button @click="renew.platformVisible=false">取消</el-button>
                    <el-button @click="upsubmit" type="primary">提交</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="admin-table-pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableQuery.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="tableQuery.size"
          :total="tableData.total"
          layout="total, sizes, prev, pager, next, jumper"
          background
        ></el-pagination>
      </div>
    </el-card>
    <!-- 车辆详情查看 -->
    <el-dialog
      title="车辆详情"
      :center="true"
      @closed="clearShowDetails"
      :visible.sync="detailsVisible"
      width="75%"
      :append-to-body="true"
    >
      <view-vehicle
        :state="$props.state"
        @error="clearShowDetails"
        :vehicle_id="showDetailsVehicle.vehicle_id"
        v-if="detailsVisible"
      ></view-vehicle>
    </el-dialog>
    <el-dialog
      title="厂商开通"
      :center="true"
      @closed="openCompanyClosed"
      :visible.sync="openCompany.visible"
      :append-to-body="true"
    >
      <el-form label-position="top" :model="openCompany.postData" size="small" ref="baseForm">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item prop="img1" label="图片1" style="text-align:center;">
              <el-upload
                class="avatar-uploader"
                accept="image/jpeg"
                action
                :http-request="(file)=>{compaynSelectImg(1,file.file)}"
                :show-file-list="false"
              >
                <img
                  v-if="openCompany.postData.img1 "
                  :src="openCompany.postData.img1 "
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="img2" label="图片2" style="text-align:center;">
              <el-upload
                class="avatar-uploader"
                accept="image/jpeg"
                action
                :http-request="(file)=>{compaynSelectImg(2,file.file)}"
                :show-file-list="false"
              >
                <img
                  v-if="openCompany.postData.img2 "
                  :src="openCompany.postData.img2 "
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="note" label="备 注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="openCompany.postData.note"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align:center;">
            <el-button @click="openCompanyClosed">取消</el-button>
            <el-button @click="companySubmit" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="厂商续费"
      width="20%"
      :center="true"
      @closed="openCompanyClosed"
      :visible.sync="openCompany.company_renewal"
      :append-to-body="true"
    >
      <el-form label-position="top" size="small" ref="baseForm">
        <el-row :gutter="30">
          <el-col :span="24" style="text-align:center;">
            <el-button @click="openCompany.company_renewal=false">取消</el-button>
            <el-button @click="companyRenewal" type="primary">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="21%"
      title="上传"
      :visible.sync="uploadDialog "
      :append-to-body="true "
      :close-on-click-modal="false "
      :close-on-press-escape="false "
      :center="true "
      class="admin-dialog"
    >
      <device-upload @success=" ()=> {this.getTable();this.uploadDialog = false;}" :key="addKey"></device-upload>
    </el-dialog>
    <el-dialog width="20%" title="单车导入" :visible.sync="singleDialog " :append-to-body="true ">
      <el-form size="small" label-width="70px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="SIM卡号">
              <el-input v-model="single_sim" placeholder="请输入SIM卡号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0">
              <el-button @click="singleSubmit" type="primary">提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="21%"
      title="批量导入"
      :visible.sync="moreDialog"
      :append-to-body="true "
      :close-on-click-modal="false "
      :close-on-press-escape="false "
      :center="true "
      class="admin-dialog"
    >
      <vehicle-upload @success=" ()=> {this.getTable();this.moreDialog = false;}" :key="addKey"></vehicle-upload>
    </el-dialog>
    <el-dialog :append-to-body="true " title="补充信息" :visible.sync="fillDialog">
      <vehicle-fill
        :vehicleid="vehicleID"
        @success=" ()=> {this.getTable();this.fillDialog = false;}"
        :key="addKey"
      ></vehicle-fill>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import moment from "moment";
import {
  getVehicleList,
  delVehicle,
  firstTimeVehicle,
  AddFeeVehicle,
  AddOrder,
  checkUserRenewAndActive,
  LoadInGGHYPT
} from "@/api/index.js";
import selectCityInput from "@/components/select-city-input.vue";
import viewVehicle from "@/components/view-vehicle.vue";
import deviceUpload from "./upload.vue";
import vehicleUpload from "./vehicle-upload";
import vehicleFill from "./vehicle-fill";
export default {
  components: {
    selectCityInput,
    viewVehicle,
    deviceUpload,
    vehicleUpload,
    vehicleFill
  },
  created() {
    this.getTable();
    this.checkOrderRights();
  },
  props: {
    state: Number //state 车辆状态 1、新增车辆 2、定位车辆 3、到期车辆
  },
  data() {
    return {
      vehicleID: "",
      single_sim: "",
      fillDialog: false,
      singleDialog: false, //单车导入
      moreDialog: false, //批量导入
      renew_platform: false,
      renew_company: false,
      active_company: false,
      platformTime: "",
      addKey: 0,
      uploadDialog: false,
      renew: {
        plateformDate: "",
        companyDate: "",
        compaynVisible: false,
        platformVisible: false,
        renew: {}
      },
      openCompany: {
        postData: {
          img1File: "",
          img2File: "",
          img1: "",
          img2: "",
          note: ""
        },
        visible: false,
        company_renewal: false,
        vehicle: {}, //厂商开通车辆
        company: {} //厂商续费
      },
      showDetailsVehicle: {}, //正在显示的车辆
      detailsVisible: false, //查看详情显示隐藏
      isCollapse: false,
      first_online_time: [], //首次入网 时间范围
      contract_date: [],
      first_date: [],
      area: [],
      tableQuery: {
        model_num: "",
        device_no: "",
        province_id: "",
        city_id: "",
        county_id: "",
        type: "",
        flag: this.$props.state,
        leave_day: "",
        first_startdate: "",
        first_enddate: "",
        contract_startdate: "",
        contract_enddate: "",
        size: 10,
        page: 1
      },
      tableData: {
        total: 0,
        data: []
      },
      tableLoading: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    pickerOptions2: function() {
      return {
        disabledDate: time => {
          return time.getTime() < this.platformTime;
        }
      };
    }
  },
  watch: {
    state: function() {
      console.log(this.$props.state);
    },
    contract_date: function(newVal) {
      if (newVal) {
        this.tableQuery.contract_startdate = newVal[0];
        this.tableQuery.contract_enddate = newVal[1];
      } else {
        this.tableQuery.contract_startdate = "";
        this.tableQuery.contract_enddate = "";
      }
    },
    first_date: function(newVal) {
      if (newVal) {
        this.tableQuery.first_startdate = newVal[0] + "000000";
        this.tableQuery.first_enddate = newVal[1] + "000000";
      } else {
        this.tableQuery.first_startdate = "";
        this.tableQuery.first_enddate = "";
      }
    },
    area: function(newVal) {
      var area = [newVal.province_id, newVal.city_id, newVal.county_id];
      Object.assign(this.tableQuery, this.$utils.formatArea(area));
    }
  },
  methods: {
    // 单车导入
    singleImport() {
      this.addKey++;
      this.singleDialog = true;
    },
    singleSubmit() {
      LoadInGGHYPT({ simid: this.single_sim }).then(res => {
        if (res.data.code == 0) {
          this.singleDialog = false;
          this.getTable();
        } else {
          return this.$notify({
            message: res.data.msg,
            title: "提示",
            type: "error"
          });
        }
      });
    },
    // 批量导入
    moreImport() {
      this.moreDialog = true;
    },
    // 上传
    openUpload() {
      this.addKey++;
      this.uploadDialog = true;
    },
    //导出excel
    exportExcel() {
      var wsCol = [
        {
          A: "首次入网时间",
          B: "车牌号",
          C: "车架号",
          D: "终端ID",
          E: "SIM ID",
          F: "业户",
          G: "联系人",
          H: "电话",
          I: "到期日期"
        }
      ];
      this.tableData.data.map(data => {
        wsCol.push({
          A: this.$utils.formatDate(data.first_time),
          B: data.license,
          C: data.vin,
          D: data.device_no,
          E: data.sim_id,
          F: data.owner,
          G: data.linkman,
          H: data.tel,
          I: this.$utils.formatDate(data.contract_date)
        });
      });
      if (this.state == 1) {
        this.$utils.exportExcel({
          data: wsCol,
          sheetName: "新增车辆管理",
          fileName: "新增车辆管理.xlsx"
        });
      } else if (this.state == 2) {
        this.$utils.exportExcel({
          data: wsCol,
          sheetName: "定位车辆管理",
          fileName: "定位车辆管理.xlsx"
        });
      } else if (this.state == 3) {
        this.$utils.exportExcel({
          data: wsCol,
          sheetName: "到期车辆管理",
          fileName: "到期车辆管理.xlsx"
        });
      }
    },
    checkOrderRights() {
      if (this.$store.state.user.user_id == 1) {
        this.renew_platform = true;
        this.renew_company = true;
        this.active_company = true;
        return false;
      }
      checkUserRenewAndActive().then(res => {
        if (res.data.code == 0) {
          var data = res.data.data[0];
          this.renew_platform = data.renew_platform == "False" ? false : true;
          this.renew_company = data.renew_company == "False" ? false : true;
          this.active_company = data.active_company == "False" ? false : true;
        }
      });
    },
    compaynSelectImg(index, file) {
      this.openCompany.postData["img" + index] = URL.createObjectURL(file);
      this.openCompany.postData["img" + index + "File"] = file;
    },
    handleCommand(command) {
      switch (command.command) {
        case "view-position": //车辆位置
          this.$router.replace({
            name: "monitor",
            params: { sim_id: command.data.row.sim_id }
          });
          break;
        case "active-company": //厂商激活
          this.openCompanyShow(command.data);
          break;
        case "update-position": //更新定位
          this.updatePosition(command.data);
          break;
        case "renew-platform": //平台续费
          this.renewPlatform(command.data);
          break;
        case "renew-company": //厂商续费
          this.renewCompany(command.data);
          break;
      }
    },
    // 平台续费
    renewPlatform(scope) {
      this.renew.platformVisible = true;
      this.renew.plateformDate = scope.row.contract_date;
      this.renew.renew = scope.row;
      this.renew.plateformDate = moment(this.renew.plateformDate).format(
        "YYYY-MM-DD"
      );
      if (moment(this.renew.plateformDate).isBefore(new Date())) {
        var currentTime = new Date();
        this.platformTime = currentTime.getTime();
        this.renew.plateformDate = scope.row.contract_date;
      } else {
        var date = new Date(this.renew.plateformDate);
        this.platformTime = date.getTime();
        this.renew.plateformDate = scope.row.contract_date;
      }
    },
    upsubmit() {
      this.renew.renew.contract_date = this.renew.plateformDate;
      AddFeeVehicle(this.renew.renew).then(res => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.renew.platformVisible = false;
          this.getTable();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    updatePosition(scope) {
      firstTimeVehicle(scope.row).then(res => {
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.getTable();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //厂商激活
    openCompanyShow(scope) {
      this.$set(this.openCompany, "vehicle", scope.row);
      this.openCompany.visible = true;
    },
    // 添加厂商激活订单
    companySubmit() {
      var postData = new FormData();
      postData.append("operate_type", 4);
      postData.append("vehicle_id", this.openCompany.vehicle.vehicle_id);
      postData.append("license", this.openCompany.vehicle.license);
      postData.append("car_type", this.openCompany.vehicle.type);
      postData.append("device_id", this.openCompany.vehicle.device_id);
      postData.append("sim_no", this.openCompany.vehicle.sim_no);
      postData.append("company_id", this.openCompany.vehicle.company_id);
      postData.append("content", this.openCompany.postData.note);
      postData.append("imgfile1", this.openCompany.postData.img1File);
      postData.append("imgfile2", this.openCompany.postData.img2File);
      this.$ajax
        .post(this.$dict.API_URL + "/ordermanage/AddOrder", postData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.openCompany.visible = false;
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    openCompanyClosed() {
      //厂商开通关闭
      this.$set(this.openCompany, "postData", {
        img1: "",
        img2: "",
        note: ""
      });
      this.$set(this.openCompany, "vehicle", {});
      this.openCompany.visible = false;
      this.openCompany.addKey += 1;
    },
    // 厂商续费
    renewCompany(scope) {
      this.$set(this.openCompany, "company", scope.row);
      this.openCompany.company_renewal = true;
    },
    companyRenewal() {
      this.openCompany.company.operate_type = 5;
      this.openCompany.company.car_type = this.openCompany.company.type;
      AddOrder(this.openCompany.company).then(res => {
        if (res.data.code == 0) {
          this.openCompany.company_renewal = false;
          this.$message.success("操作成功");
          this.getTable();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    clearShowDetails() {
      this.$set(this.$data, "showDetailsVehicle", {});
      this.detailsVisible = false;
    },
    showDetails(scope) {
      this.$set(this.$data, "showDetailsVehicle", scope.row);
      this.detailsVisible = true;
    },
    goEdit(scope) {
      if (scope.row.state == "4") {
        this.fillDialog = true;
        this.$set(this.$data, "vehicleID", scope.row.vehicle_id);
      } else {
        if (this.$props.state == 1) {
          this.$router.push({
            path: "new/edit",
            query: { vehicle_id: scope.row.vehicle_id }
          });
        } else if (this.$props.state == 2) {
          this.$router.push({
            path: "position/edit",
            query: { vehicle_id: scope.row.vehicle_id }
          });
        } else {
          this.$router.push({
            path: "timeout/edit",
            query: { vehicle_id: scope.row.vehicle_id }
          });
        }
      }
    },
    delRow(scope) {
      //删除
      this.$confirm("确认删除？")
        .then(() => {
          delVehicle(scope.row).then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.getTable();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      //每页数量切换
      this.tableQuery.page = 1;
      this.tableQuery.size = val;
      this.getTable();
    },
    handleCurrentChange(val) {
      //翻页
      this.tableQuery.page = val;
      this.getTable();
    },
    searchTable() {
      this.tableQuery.page = 1;
      this.getTable();
    },
    getTable() {
      //获取列表
      this.tableLoading = true;
      var query = Object.assign({}, this.tableQuery, this.tableQuery.area);
      delete query.area;
      getVehicleList(query)
        .then(res => {
          if (res.data.code == 0) {
            this.$set(this.$data, "tableData", res.data);
          } else {
            this.$set(this.$data, "tableData", []);
            this.$message.error(res.data.msg);
          }
          this.tableLoading = false;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less">
.vehicle-list-more {
  li {
    line-height: 36px !important;
    padding: 0 20px !important;
    font-size: 14px !important;
  }
}
.license-card {
  padding: 0 5px;
  border-radius: 4px;
  width: 9em;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  font-weight: bold;
  &:before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background: #fff;
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -2px;
  }
  &:after {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background: #fff;
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -2px;
  }
}
</style>