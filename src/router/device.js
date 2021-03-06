export default {
  path: "device",
  name: "device",
  meta: { name: "设备管理", icon: "iconfont icon-boxplot-fill" },
  component: () => import("@/views/manage/device/index.vue"),
  children: [
    {
      path: "device",
      name: "device-device",
      meta: {
        name: "终端管理",
        icon: "iconfont icon-boxplot-fill",
        p: "2-1-4"
      },
      component: () => import("@/views/manage/device/device/index.vue")
    },
    {
      path: "upgrade",
      name: "device-upgrade",
      meta: {
        name: "终端升级管理",
        icon: "iconfont icon-shengji",
        hidden: true
      },
      component: () => import("@/views/manage/device/device/upgrade.vue")
    },
    {
      path: "add",
      name: "device-add",
      meta: { name: "设备管理-添加", hidden: true },
      component: () => import("@/views/manage/device/device/add.vue")
    },
    {
      path: "update/:device_id",
      name: "device-update",
      meta: { name: "设备管理-编辑", hidden: true },
      component: () => import("@/views/manage/device/device/update.vue")
    },
    {
      path: "device-binding",
      name: "device-binding",
      meta: { name: "设备绑定管理", hidden: true },
      component: () => import("@/views/manage/device/device/binding.vue")
    },
    {
      path: "user-group",
      name: "user-group",
      meta: { name: "用户常用分组设置", hidden: true },
      component: () => import("@/views/manage/device/device/group/index.vue")
    },
    {
      path: "user-grouping",
      name: "user-grouping",
      meta: { name: "设备分组", hidden: true },
      component: () => import("@/views/manage/device/device/group/binding.vue")
    },
    {
      path: "repair",
      name: "device-repair",
      meta: {
        name: "维修设备管理",
        icon: "iconfont icon-wrench-fill",
        p: "2-2-3"
      },
      component: () => import("@/views/manage/device/repair/index.vue")
    },
    {
      path: "sim",
      name: "sim",
      meta: {
        name: "SIM卡管理",
        icon: "iconfont icon-sim",
        p: "2-3-4"
      },
      component: () => import("@/views/manage/device/sim/index.vue")
    },
    {
      path: "sim-add",
      name: "sim-add",
      meta: { name: "SIM卡管理-添加", hidden: true },
      component: () => import("@/views/manage/device/sim/add.vue")
    },
    {
      path: "sim-update/:sim_no",
      name: "sim-update",
      meta: { name: "SIM卡管理-编辑", hidden: true },
      component: () => import("@/views/manage/device/sim/update.vue")
    },
    {
      path: "sim-binding",
      name: "sim-binding",
      meta: { name: "SIM卡绑定管理", hidden: true },
      component: () => import("@/views/manage/device/sim/binding.vue")
    },
    {
      path: "company",
      name: "device-company",
      meta: {
        name: "终端厂商管理",
        icon: "iconfont icon-company",
        p: "2-4-4"
      },
      component: () => import("@/views/manage/device/company/index.vue")
    },
    {
      path: "package/:id",
      name: "upgrade-package",
      meta: { name: "升级包管理", hidden: true },
      component: () =>
        import("@/views/manage/device/company/upgrade-package.vue")
    },
    {
      path: "company-device-add",
      name: "company-add",
      meta: { name: "终端厂商管理-添加", hidden: true },
      component: () => import("@/views/manage/device/company/add.vue")
    },
    {
      path: "company-device-update/:company_id",
      name: "company-update",
      meta: { name: "终端厂商管理-编辑", hidden: true },
      component: () => import("@/views/manage/device/company/update.vue")
    }
  ]
};
