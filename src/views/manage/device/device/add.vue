<template>
  <el-form
    status-icon
    :rules="rules"
    :model="formData"
    size="small"
    ref="baseForm"
    class="msg-form"
  >
    <!-- 设备信息 -->
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="终端类型" prop="device_type">
          <el-select v-model="formData.device_type" placeholder="选择终端类型" style="width:100%;">
            <el-option label="定位终端" value="1"></el-option>
            <el-option label="视频终端" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="终端ID" prop="device_no">
          <el-input v-model="formData.device_no" placeholder="终端ID"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="SIM ID" prop="sim_id">
          <el-input v-model="formData.sim_id" maxlength="14" placeholder="SIM ID"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="终端厂商" prop="company_id">
          <company-select v-model="formData.company_id" style="width: 100%;"></company-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备型号">
          <el-input placeholder="设备型号" v-model="formData.model_num"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="ADAS型号">
          <el-input placeholder="ADAS型号" v-model="formData.adas_model_num"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="DSM型号">
          <el-input placeholder="DSM型号" v-model="formData.dsm_model_num"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="协议类型" prop="protocol_type">
          <span v-if="!formData.device_type">--</span>
          <span v-if="formData.device_type==1">808部标协议</span>
          <span v-if="formData.device_type==2">1078部标协议</span>
        </el-form-item>
      </el-col>
      <template v-if="formData.device_type==2">
        <el-col :span="24">
          <el-form-item label="存储介质" prop="save_media">
            <el-select v-model="formData.save_media" placeholder="选择" style="width:100%;">
              <el-option label="硬盘" value="1"></el-option>
              <el-option label="SD卡" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="摄像头数量" prop="camera_num">
            <br>
            <el-radio v-model="formData.camera_num" label="4">&nbsp; 4路</el-radio>
            <el-radio v-model="formData.camera_num" label="6">&nbsp; 6路</el-radio>
            <el-radio v-model="formData.camera_num" label="8">&nbsp; 8路</el-radio>
            <br>
            <el-radio v-model="formData.camera_num" label="10">10路</el-radio>
            <el-radio v-model="formData.camera_num" label="12">12路</el-radio>
            <el-radio v-model="formData.camera_num" label="14">14路</el-radio>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-form-item style="text-align:center;">
      <el-button type="primary" @click="formSubmit" size="large">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { rules } from "@/utils/rules.js";
import { addDevice, existDeviceId, existDeviceSimId } from "@/api/index.js";
import companySelect from "@/components/select-company.vue";
export default {
  data() {
    return {
      formData: {
        device_type: "",
        device_no: "",
        company_id: "",
        sim_id: "",
        protocol_type: "",
        camera_num: "",
        save_media: "",
        model_num: "",
        adas_model_num: "",
        dsm_model_num: ""
      },
      rules: {
        ...rules,
        device_type: [
          { required: true, trigger: "change", message: "必须选择终端类型" }
        ],
        company_id: [
          { required: true, trigger: "change", message: "必须选择终端厂商" }
        ],
        device_no: [
          {
            required: true,
            trigger: "blur",
            validator: this.validateDeviceId
          },
          {
            pattern: /^[0-9a-zA-Z]+$/,
            message: "只能输入字母和数字！"
          }
        ],
        sim_id: [
          {
            trigger: "blur",
            validator: this.validateDeviceSimId,
            required: true
          },
          {
            pattern: /^[0-9a-zA-Z]+$/,
            message: "只能输入字母和数字！"
          },
          {
            pattern: /^.{11}$/,
            message: "SimID只能为11位"
          }
        ]
      }
    };
  },
  watch: {
    "formData.device_type": function() {
      this.formData.protocol_type = this.formData.device_type;
    }
  },
  created() {},
  methods: {
    // 设备ID验证
    validateDeviceId(rule, value, callback) {
      if (value == "") {
        callback(new Error("请输入设备ID！"));
        return false;
      }
      existDeviceId({ device_id: value })
        .then(res => {
          if (res.data.code == 1) {
            callback(new Error("设备ID重复！"));
          } else {
            callback();
          }
        })
        .catch(() => {
          callback(new Error("服务器重复验证失效，请稍候再试"));
        });
    },
    // SIMID验证
    validateDeviceSimId(rule, value, callback) {
      if (value == "") {
        callback(new Error("请输入SimID"));
        return false;
      }
      existDeviceSimId({ sim_id: value })
        .then(res => {
          if (res.data.code == 1) {
            callback(new Error("SIMID重复！"));
          } else {
            callback();
          }
        })
        .catch(() => {
          callback(new Error("服务器重复验证失效，请稍候再试"));
        });
    },
    // 添加
    formSubmit() {
      this.$refs.baseForm.validate((isVaildate, errorItem) => {
        if (isVaildate) {
          var postData = Object.assign({}, this.formData);
          addDevice(postData)
            .then(res => {
              if (res.data.code == 0) {
                this.$emit("success");
                this.$notify({
                  message: res.data.msg,
                  title: "提示",
                  type: "success"
                });
              } else {
                this.$emit("error");
                this.$notify({
                  message: res.data.msg,
                  title: "提示",
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$alert("接口错误", "提示", {
                type: "error"
              });
              this.$emit("error");
            });
        } else {
          var errormsg = "";
          for (var key in errorItem) {
            errormsg += errorItem[key][0].message + "<br>";
          }
          this.$notify.error({
            title: "错误",
            dangerouslyUseHTMLString: true,
            message: errormsg
          });
        }
      });
    }
  },
  components: { companySelect }
};
</script>