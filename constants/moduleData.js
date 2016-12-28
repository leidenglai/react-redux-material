exports.moduleData = [
  {
    title: "用户管理",
    navShow: true,
    icon: "fa fa-users",
    nestedItems: [
      {
        title: "用户列表",
        value: "/userList",
        router: "/userList",
        icon: "fa fa-list",
      },
      {
        title: "用户详情",
        value: "/userDetail",
        router: "/userDetail",
        icon: "fa fa-user",
      }
    ]
  },
  {
    title: "订单管理",
    navShow: true,
    icon: "fa fa-line-chart",
    nestedItems: [
      {
        title: "订单列表",
        value: "/orderList",
        router: "/orderList",
        icon: "fa fa-list-alt",
      },
      {
        title: "订单详情",
        value: "/orderDetail",
        router: "/orderDetail",
        icon: "fa fa-balance-scale"
      }
    ]
  },
  {
    title: "消息",
    value: "/message",
    router: "/message",
    navShow: true,
    icon: "fa fa-comments-o"
  },
]