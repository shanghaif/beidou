<template>
  <div class="admin-table-container" style="position: absolute;left:0;right:0;bottom:0;top:107px;">
    <el-card shadow="always" class="full-box">
      <div class="bind-box">
        <div class="user-box">
          <div class="user-header">
            用户列表
          </div>
          <div class="user-filter" :class="{active:userFilterOpen}">
            <el-form :model="userTableQuery" size="small">
              <el-form-item>
                <el-input placeholder="企业名称" size="small" v-model="userTableQuery.real_name">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
            </el-form>
            <!-- <div class="user-load-more" @click="userFilterOpen=!userFilterOpen">
              <i class="el-icon-caret-bottom" v-if="!userFilterOpen"></i>
              <i class="el-icon-caret-top" v-if="userFilterOpen"></i>
            </div> -->
          </div>
          <ul class="user-list">
            <li v-for="user in userList" :class="{active:user.user_id==currentUser.user_id}" :key="user.user_id" @click="changeUser(user)"> {{user.real_name}}</li>
          </ul>
          <div class="user-pager">
            <el-input placeholder="页码" size="small" v-model="userTableQuery.page">
              <el-button slot="prepend" icon="el-icon-caret-left" @click="userPagerPrev()" :disabled="userPagerPrevState"></el-button>
              <el-button slot="append" icon="el-icon-caret-right" @click="userPagerNext()" :disabled="userPagerNextState"></el-button>
            </el-input>
          </div>
        </div>
        <div class="transfer-container">
          <div class="transfer-filter">
            <div class="transfer-filter-item">
              <el-form :inline="true" :model="bindTableQuery" size="mini">
                <el-form-item>
                  <el-input placeholder="终端ID" v-model="bindTableQuery.device_id">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="renderBind()">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div style="width:100px;"></div>
            <div class="transfer-filter-item">
              <el-form :inline="true" :model="userTableQuery" size="mini">
                <el-form-item>
                  <el-input placeholder="终端ID" v-model="unbindTableQuery.device_id">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="renderUnbind()">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="transfer-list">
            <admin-transfer @onLeft="onleft" :lists="list" :titles="titles" @onRight="onright" :leftCol="leftCol" :rightCol="rightCol" style="width:100%;height:100%;"></admin-transfer>
          </div>
          <div class="transfer-pager">
            <div class="transfer-pager-item">
              <el-pagination @size-change="bindSizeChange" @current-change="bindcurrentChange" :current-page="bindTableQuery.page" :page-sizes="[20, 50, 100,300,600,1000]" :page-size="bindTableQuery.size" :total="bindTableQuery.total" layout="total, sizes, prev,  next, jumper" background>
              </el-pagination>
            </div>
            <div style="width:100px;"></div>
            <div class="transfer-pager-item">
              <el-pagination @size-change="unbindSizeChange" @current-change="unbindcurrentChange" :current-page="unbindTableQuery.page" :page-sizes="[20, 50, 100,300,600,1000]" :page-size="unbindTableQuery.size" :total="unbindTableQuery.total" layout="total, sizes, prev,  next, jumper" background>
              </el-pagination>
            </div>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getDeviceUserList,
  getUserDevice,
  getDeviceAllUnbind,
  addUserDevice,
  delUserDevice
} from "@/api/index.js";
import adminTransfer from "@/components/transfer.vue";
import selectCompany from "@/components/select-company.vue";

export default {
  created() {
    this.renderUser();
  },
  computed: {
    list: function() {
      return this.leftList.concat(this.rightList);
    },
    userPagerNextState: function() {
      return !(
        this.userTableQuery.total -
          this.userTableQuery.page * this.userTableQuery.size >
        0
      );
    },
    userPagerPrevState: function() {
      return !(this.userTableQuery.page > 1);
    }
  },
  data() {
    return {
      userFilterOpen: false, //用户筛选展开关闭
      userTableQuery: {
        // user_id: this.$store.state.user.user_id,
        real_name: "",
        size: 20,
        page: 1
      },
      bindTableQuery: {
        device_id: "",
        size: 20,
        page: 1,
        total: 0
      },
      unbindTableQuery: {
        device_id: "",
        size: 20,
        page: 1,
        total: 0
      },
      currentUser: {},
      titles: ["请在左侧选择用户", "未绑定设备"],
      userList: [],
      leftList: [],
      rightList: [],
      leftCol: [
        { prop: "device_no", label: "终端ID" },
        { prop: "company_name", label: "设备厂商" },
        {
          prop: "device_type",
          label: "终端类型",
          formatter: row => {
            return this.$dict.get_device_type(row.device_type);
          }
        }
      ],
      rightCol: [
        { prop: "device_no", label: "终端ID" },
        { prop: "company_name", label: "设备厂商" },
        {
          prop: "device_type",
          label: "终端类型",
          formatter: row => {
            return this.$dict.get_device_type(row.device_type);
          }
        }
      ]
    };
  },
  watch: {
    userTableQuery: {
      handler: function() {
        this.renderUser();
      },
      deep: true
    }
  },
  methods: {
    bindSizeChange(val) {
      this.bindTableQuery.page = 1;
      this.bindTableQuery.size = val;
      this.renderBind();
    },
    bindcurrentChange(val) {
      this.bindTableQuery.page = val;
      this.renderBind();
    },
    unbindSizeChange(val) {
      this.unbindTableQuery.page = 1;
      this.unbindTableQuery.size = val;
      this.renderUnbind();
    },
    unbindcurrentChange(val) {
      this.unbindTableQuery.page = val;
      this.renderUnbind();
    },
    // 左侧搜索框
    renderBind() {
      this.$set(this.$data, "leftList", []);
      // this.bindTableQuery.total = 0;
      if (this.currentUser.user_id) {
        var postData = Object.assign({}, this.bindTableQuery);
        postData.user_id = this.currentUser.user_id;
        getUserDevice(postData).then(res => {
          this.rightValues = [];
          if (res.data.code == 0) {
            var arr = res.data.data.map(item => {
              item.parent = "left";
              return item;
            });
            this.$set(this.$data, "leftList", arr);
            this.bindTableQuery.total = res.data.total;
          }
        });
      }
    },
    // 右侧搜索框
    renderUnbind() {
      this.$set(this.$data, "rightList", []);
      getDeviceAllUnbind(this.unbindTableQuery).then(res => {
        if (res.data.code == 0) {
          var arr = res.data.data.map(item => {
            item.parent = "right";
            return item;
          });
          this.$set(this.$data, "rightList", arr);

          this.unbindTableQuery.total = res.data.total;
        }
      });
    },
    // 用户信息
    renderUser() {
      this.$set(this.$data, "userList", []);
      getDeviceUserList(this.userTableQuery).then(res => {
        if (res.data.code == 0) {
          this.$set(this.$data, "userList", res.data.data);
          this.userTableQuery.total = res.data.total;
        }
      });
    },
    userPagerPrev() {
      if (isNaN(Number(parseInt(this.userTableQuery.page)))) {
        this.userTableQuery.page = 1;
      } else {
        if (this.userTableQuery.page - 1 <= 0) {
          this.userTableQuery.page = 1;
        } else {
          this.userTableQuery.page = parseInt(this.userTableQuery.page) - 1;
        }
      }
    },
    userPagerNext() {
      if (isNaN(Number(parseInt(this.userTableQuery.page)))) {
        this.userTableQuery.page = 1;
      } else {
        this.userTableQuery.page = parseInt(this.userTableQuery.page) + 1;
      }
    },
    //右到左
    onleft(items, next) {
      if (!this.currentUser.user_id) {
        this.$message.warning("请选择一个用户！");
        next(false);
        return false;
      }
      var postData = {
        user_id: this.currentUser.user_id,
        device_ids: []
      };
      items.map(item => {
        postData.device_ids.push(item.device_id);
      });
      postData.device_ids = postData.device_ids.join(",");
      addUserDevice(postData)
        .then(res => {
          if (res.data.code == 0) {
            next(true);
            this.bindTableQuery.page = 1;
            this.unbindTableQuery.page = 1;
            this.renderBind();
            this.renderUnbind();
          } else {
            this.$message.error(res.data.msg);
            next(false);
          }
        })
        .catch(() => {
          next(false);
        });
    },
    //左到右
    onright(items, next) {
      var postData = {
        user_id: this.currentUser.user_id,
        device_ids: []
      };
      items.map(item => {
        postData.device_ids.push(item.device_id);
      });
      postData.device_ids = postData.device_ids.join(",");
      delUserDevice(postData)
        .then(res => {
          if (res.data.code == 0) {
            next(true);
            this.renderBind();
            this.renderUnbind();
          } else {
            this.$message.error(res.data.msg);
            next(false);
          }
        })
        .catch(() => {
          next(false);
        });
    },
    changeUser(user) {
      this.titles[0] = user.real_name;
      this.currentUser = user;
      this.renderBind();
      this.renderUnbind();
    }
  },

  components: { adminTransfer, selectCompany }
};
</script>
<style lang="less">
.full-box {
  height: 100%;
  .el-card__body {
    height: 100%;
  }
}

.bind-box {
  display: flex;
  margin: -20px;
  font-size: 14px;
  height: 100%;
}

.transfer-container {
  width: 100%;
  position: relative;
  margin: 20px;
}

.transfer-list {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 40px;
}

.transfer-pager {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  height: 40px;
  .transfer-pager-item {
    padding-top: 3px;
    box-sizing: border-box;
    text-align: center;
    background: #f5f7fa;
    width: 40%;
  }
}

.transfer-filter {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  height: 40px;
  box-sizing: border-box;
  .transfer-filter-item {
    border: 1px solid #ebeef5;
    height: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 5px 0;
    text-align: center;
    background: #f5f7fa;
    width: 40%;
  }
}

.transfer-fiter {
  height: 50px;
  background: #f5f7fa;
}

.el-card__body {
  height: 100%;
}

.user-box {
  width: 300px;
  position: relative;
  border-right: 1px solid #ebeef5;
}

.user-header {
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #000;
}

.user-load-more {
  background: #edf2f9;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15px;
  border-top: 1px solid #e3e9f1;
  border-bottom: 1px solid #e3e9f1;
  cursor: pointer;
}

.user-filter {
  position: absolute;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 4px;
  background: #edf2f9;
  z-index: 2;
  transition: all 0.2s;
  &.active {
    overflow: visibility;
    height: 115px;
  }
}

.user-pager {
  background: #f1f1f1;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  .el-input__inner {
    text-align: center;
  }
}

.user-list {
  position: absolute;
  top: 100px;
  bottom: 32px;
  width: 100%;
  overflow: auto;
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  li {
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    list-style-type: none;
    box-sizing: border-box;
    padding: 0 15px;
  }
  li.active {
    color: #fff;
    background-color: #1890ff !important;
  }
  li:hover {
    background-color: #f5f7fa;
    cursor: pointer;
  }
}
</style>