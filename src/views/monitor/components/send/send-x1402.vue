<template>
  <div>
    <el-form :model="formData" :rules="rules" label-width="140px" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="车牌号：">
            <el-input style="width:90%" v-model="formData.VEHICLE_NO" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌颜色：">
            <el-select style="width:90%" size="small" v-model="formData.VEHICLE_COLOR">
              <el-option v-for="(item,index) in this.$dict.color" :key="index" :value="index" :label="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报警信息来源：">
            <el-select v-model="formData.WARN_SRC" style="width:90%" size="small">
              <el-option value="1" label="车载终端">车载终端</el-option>
              <el-option value="2" label="企业监控平台">企业监控平台</el-option>
              <el-option value="3" label="政府监管平台">政府监管平台</el-option>
              <el-option value="9" label="其他">其他</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报警类型：">
            <el-select style="width:90%" size="small" v-model="formData.WARN_TYPE">
              <el-option v-for="(item,index) in this.$dict.vehicle_alarm" :key="index" :value="index" :label="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报警时间：">
            <el-date-picker style="width:90%" size="small" v-model="time" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信息ID：">
            <el-input v-model="formData.INFO_ID" size="small" style="width:90%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上报报警信息内容：">
            <el-input v-model="formData.INFO_CONTENT" size="small" style="width:90%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级平台：">
            <el-select v-model="formData.MSG_GNSSCENTERID" style="width:90%" size="small">
              <el-option v-for="item in tableData" :key="item.server_id" :value="item.access_code" :label="item.title">{{item.title}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click="send" style="display:block;margin:0 auto;" type="primary" size="small">发送</el-button>
    </el-form>
  </div>
</template>
<script>
import { GetServerByPage } from "@/api/index.js";
export default {
  created() {
    GetServerByPage({ page: 1, size: 999, flag: 809, title: "" }).then(res => {
      if (res.data.code == 0) {
        this.$set(this.$data, "tableData", res.data.data);
      }
    });
    this.$instruction.on("x1400", eve => {
      var data = JSON.parse(eve.data);
      if (data.code == "0" && data.DATA_TYPE == 5122) {
        return this.$notify({
          message: "上报报警信息发送成功!",
          title: "提示",
          type: "success"
        });
      }
    });
  },
  data() {
    return {
      tableData: [],
      time: "",
      formData: {
        MessageID: "x1400",
        DATA_TYPE: 0x1402,
        VEHICLE_NO: "",
        VEHICLE_COLOR: "",
        WARN_SRC: "",
        WARN_TYPE: "",
        WARN_TIME: "",
        INFO_ID: "",
        INFO_CONTENT: "",
        MSG_GNSSCENTERID: ""
      },
      rules: {
        VEHICLE_NO: [
          {
            required: true,
            message: "请输入车牌号",
            trigger: "change"
          }
        ],
        VEHICLE_COLOR: [
          {
            required: true,
            message: "请选择车牌颜色",
            trigger: "change"
          }
        ],
        DATA_TYPE: [
          {
            required: true,
            message: "请输入子业务类型标识",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    send() {
      if (this.time != "" && this.time != null) {
        this.formData.WARN_TIME = this.time;
      } else {
        this.formData.WARN_TIME = "";
      }
      var data = JSON.stringify(this.formData);
      this.$instruction.send(data);
    }
  }
};
</script>