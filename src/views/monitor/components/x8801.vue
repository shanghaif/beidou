<template>
  <el-form ref="baseForm" :model="form" label-width="180px" @submit.native.prevent size="small">
    <el-tabs v-model="type" @tab-click="changeType">
      <el-tab-pane label="自动拍摄模式" name="0">
        <el-form-item label="通道 ID">
          <el-radio v-model="form.ChannelId" label="1">通道1</el-radio>
          <el-radio v-model="form.ChannelId" label="2">通道2</el-radio>
          <el-radio v-model="form.ChannelId" label="100">ADAS</el-radio>
          <el-radio v-model="form.ChannelId" label="101">DSM</el-radio>
        </el-form-item>
        <div v-show="form.ChannelId!='100'&&form.ChannelId!='101'">
          <el-form-item label="拍摄方式">
            <el-radio v-model="form.PhotoCommand" :label="0xffff">录像</el-radio>
            <el-radio v-model="form.PhotoCommand" :label="1">拍照</el-radio>
          </el-form-item>
          <el-form-item label="拍照间隔/录像时间(秒)">
            <el-input-number :min="1" :max="20" v-model="form.PhotoTimeInterval"></el-input-number>
          </el-form-item>
          <el-form-item label="保存方式">
            <el-radio v-model="form.StoreFlag" label="0">实时上传</el-radio>
            <el-radio v-model="form.StoreFlag" label="1">保存</el-radio>
          </el-form-item>
          <el-form-item label="分辨率">
            <el-select v-model="form.Resolution">
              <el-option label="320*240" value="1"></el-option>
              <el-option label="640*480" value="2"></el-option>
              <el-option label="800*600" value="3"></el-option>
              <el-option label="1024*768" value="4"></el-option>
              <el-option label="176*144;[Qcif]" value="5"></el-option>
              <el-option label="352*288;[Cif]" value="6"></el-option>
              <el-option label="704*288;[HALF D1]" value="7"></el-option>
              <el-option label="704*576;[D1]" value="8"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图像/视频压缩程度">
            <el-slider
              v-model="form.Quality"
              :min="1"
              :max="10"
              :step="1"
              show-stops
              style="width:80%;"
            ></el-slider>压缩程度越大，文件质量越小
          </el-form-item>

          <el-form-item label="亮度">
            <el-slider v-model="form.Brightness" :min="0" :max="255" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="对比度">
            <el-slider v-model="form.Contrast" :min="0" :max="127" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="饱和度">
            <el-slider v-model="form.Saturation" :min="0" :max="127" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="色度">
            <el-slider v-model="form.Chroma" :min="0" :max="255" :step="1" style="width:80%;"></el-slider>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="formSubmit('auto')" :loading="loading">立即拍摄</el-button>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="手动拍摄模式" name="1">
        <el-form-item label="通道 ID">
          <el-radio v-model="form.ChannelId" label="1">通道1</el-radio>
          <el-radio v-model="form.ChannelId" label="2">通道2</el-radio>
          <el-radio v-model="form.ChannelId" label="100">ADAS</el-radio>
          <el-radio v-model="form.ChannelId" label="101">DSM</el-radio>
        </el-form-item>
        <div v-show="form.ChannelId!='100'&&form.ChannelId!='101'">
          <el-form-item label="拍摄方式">
            <el-radio v-model="form.PhotoCommand" :label="0xffff">录像</el-radio>
            <el-radio v-model="form.PhotoCommand" :label="1" disabled>拍照</el-radio>
          </el-form-item>
          <el-form-item label="保存方式">
            <el-radio v-model="form.StoreFlag" label="0">实时上传</el-radio>
            <el-radio v-model="form.StoreFlag" label="1">保存</el-radio>
          </el-form-item>
          <el-form-item label="分辨率">
            <el-select v-model="form.Resolution">
              <el-option label="320*240" value="1"></el-option>
              <el-option label="640*480" value="2"></el-option>
              <el-option label="800*600" value="3"></el-option>
              <el-option label="1024*768" value="4"></el-option>
              <el-option label="176*144;[Qcif]" value="5"></el-option>
              <el-option label="352*288;[Cif]" value="6"></el-option>
              <el-option label="704*288;[HALF D1]" value="7"></el-option>
              <el-option label="704*576;[D1]" value="8"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图像/视频压缩程度">
            <el-slider
              v-model="form.Quality"
              :min="1"
              :max="10"
              :step="1"
              show-stops
              style="width:80%;"
            ></el-slider>压缩程度越大，文件质量越小
          </el-form-item>

          <el-form-item label="亮度">
            <el-slider v-model="form.Brightness" :min="0" :max="255" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="对比度">
            <el-slider v-model="form.Contrast" :min="0" :max="127" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="饱和度">
            <el-slider v-model="form.Saturation" :min="0" :max="127" :step="1" style="width:80%;"></el-slider>
          </el-form-item>

          <el-form-item label="色度">
            <el-slider v-model="form.Chroma" :min="0" :max="255" :step="1" style="width:80%;"></el-slider>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="formSubmit('begin')" :loading="loading">开始</el-button>
          <el-button type="primary" @click="formSubmit('stop')">停止</el-button>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <el-table :data="list" size="mini">
      <el-table-column prop="SimID" label="sim id"></el-table-column>
      <el-table-column prop="ChannelId" label="通道"></el-table-column>
      <el-table-column label="媒体">
        <template slot-scope="scope">
          <div v-if="!scope.row.media_url">
            <i class="el-icon-loading"></i>正在上传媒体文件
          </div>
          <div v-if="scope.row.media_url">
            <img :src="scope.row.media_url" v-if="scope.row.MultimediaType==0" style="width:100%;">
            <video
              :src="scope.row.media_url"
              controls
              v-if="scope.row.MultimediaType==2"
              style="width:100%;"
            ></video>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<style lang="less" scoped>
.anwser-list {
  li {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .add {
    text-align: center;
  }
}
</style>
<script>
export default {
  data() {
    return {
      timeout: 0,
      loading: false,
      type: "0",
      list: [],
      form: {
        MessageID: "x8801",
        SimID: this.$utils.formatSim(this.$props.vehicle.sim_id),
        ChannelId: "1", //通道 ID 1-255
        PhotoCommand: 1, //0 表示停止拍摄；0xFFFF 表示录像；其它表示拍照张数
        PhotoTimeInterval: 0, //秒，0 表示按最小间隔拍照或一直录像
        StoreFlag: "0", //1：保存；0：实时上传
        Resolution: "1", //分辨率 0x01:320*240；0x02:640*480；0x03:800*600；0x04:1024*768;0x05:176*144;[Qcif];0x06:352*288;[Cif];0x07:704*288;[HALF D1];0x08:704*576;[D1];
        Quality: 5, //1-10，1 代表质量损失最小，10 表示压缩比最大
        Brightness: 125, //亮度0-255
        Contrast: 64, //对比度  0-127
        Saturation: 64, //饱和度0-127
        Chroma: 125 //色度 0-255
      }
    };
  },
  props: ["vehicle"],
  created() {
    this.$instruction.on("x8801", this.vehicle.sim_id, this.x8801);
    this.$instruction.on("x0800", this.vehicle.sim_id, this.x0800);
    this.$instruction.on("x8800", this.vehicle.sim_id, this.x8800);
  },
  methods: {
    x8801(evt) {
      var msg = JSON.parse(evt.data);
      if (msg.code == 0) {
        if (msg.PhotoCommand == 0) {
          this.loading = false;
        }
        this.$message.success("已发送");
      } else {
        this.$message.warning("发送失败");
      }
    },
    x0800(evt) {
      this.$message.success("已开始录像");
      var msg = JSON.parse(evt.data);
      this.list.push(msg);
    },
    x8800(evt) {
      this.loading = false;
      clearTimeout(this.timeout);
      var data = JSON.parse(evt.data);
      this.list.map(row => {
        if (row.MultimediaDataID == data.MultimediaDataID) {
          this.getMediaUrl(row);
        }
      });
    },
    getMediaUrl(row) {
      if (row.MultimediaType == 2) {
        this.$ajax
          .get("/MultiMedia/GetVideo", {
            params: {
              sim_id: this.$utils.formatSim(this.vehicle.sim_id),
              media_id: row.MultimediaDataID
            }
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$set(row, "media_url", res.data.data[0].FileUrl);
            }
          });
      } else {
        var url =
          this.$dict.BASE_URL +
          `api/MultiMedia/GetMultiMediaByType?type=${
            row.MultimediaType
          }&sim_id=${this.$utils.formatSim(this.vehicle.sim_id)}&media_id=${
            row.MultimediaDataID
          }`;
        this.$set(row, "media_url", url);
      }
    },
    changeType(tab) {
      var newForm = {
        MessageID: "x8801",
        SimID: this.$utils.formatSim(this.$props.vehicle.sim_id),
        ChannelId: "1", //通道 ID 1-255
        PhotoCommand: 0xffff, //0 表示停止拍摄；0xFFFF 表示录像；其它表示拍照张数
        PhotoTimeInterval: 1, //秒，0 表示按最小间隔拍照或一直录像
        StoreFlag: "0", //1：保存；0：实时上传
        Resolution: "1", //分辨率 0x01:320*240；0x02:640*480；0x03:800*600；0x04:1024*768;0x05:176*144;[Qcif];0x06:352*288;[Cif];0x07:704*288;[HALF D1];0x08:704*576;[D1];
        Quality: 5, //1-10，1 代表质量损失最小，10 表示压缩比最大
        Brightness: 125, //亮度0-255
        Contrast: 64, //对比度  0-127
        Saturation: 64, //饱和度0-127
        Chroma: 125 //色度 0-255
      };
      if (tab.name == 0) {
        newForm.PhotoTimeInterval = 1;
      } else {
        newForm.RecordingTime = 0;
      }
      this.$set(this.$data, "form", newForm);
    },
    formSubmit(command) {
      clearTimeout(this.timeout);
      if (command == "begin") {
        this.form.PhotoCommand = 0xffff;
        this.form.PhotoTimeInterval = 0;
      }
      if (command == "stop") {
        this.form.PhotoCommand = 0;
        this.form.PhotoTimeInterval = 0;
      }
      this.$instruction.send(JSON.stringify(this.form));
      this.loading = true;
      this.timeout = setTimeout(() => {
        this.loading = false;
      }, 25000);
    }
  },
  beforeDestroy() {
    this.$instruction.off("x8801", this.vehicle.sim_id, this.x8801);
    this.$instruction.off("x0800", this.vehicle.sim_id, this.x0800);
    this.$instruction.off("x8800", this.vehicle.sim_id, this.x8800);
  }
};
</script>