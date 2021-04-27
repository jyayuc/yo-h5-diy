import apiConfig from './index'
export default {
  queryPageOrderUrl: apiConfig.mockHost + '/ordersList.json',
  queryPageOrderDetailUrl: apiConfig.mockHost + '/ordersDetail.json',
  querySiteConfigUrl: apiConfig.mockHost + '/siteConfig.json',
  queryAdminSiteConfigUrl: apiConfig.mockHost + '/adminSiteConfig.json',
  queryShopListUrl: apiConfig.mockHost + '/shopList.json',

  // 登录
  loginIndexUrl: apiConfig.host + '/v1/login/index',
  // 初始化配置
  getSiteConfigUrl: apiConfig.host + '/v1/init/getSiteConfig',
  // 菜单管理
  // 菜单列表
  sysmenuListUrl: apiConfig.host + '/v1/sysmenu/list',
  // 添加/编辑
  sysmenuSaveUrl: apiConfig.host + '/v1/sysmenu/save',
  // 删除
  sysmenuDelUrl: apiConfig.host + '/v1/sysmenu/del',

  // 系统用户
  // 后台用户列表
  sysuserListUrl: apiConfig.host + '/v1/sysuser/list',
  // 添加/编辑
  sysuserSaveUrl: apiConfig.host + '/v1/sysuser/save',
  // 删除
  sysuserDelUrl: apiConfig.host + '/v1/sysuser/del',
  // 用户详情
  sysuserInfoUrl: apiConfig.host + '/v1/sysuser/info',
  // 系统用户
  // 角色列表
  sysroleListUrl: apiConfig.host + '/v1/sysrole/list',
  // 添加/编辑
  sysroleSaveUrl: apiConfig.host + '/v1/sysrole/save',
  // 删除
  sysroleDelUrl: apiConfig.host + '/v1/sysrole/del',
  // 分配菜单权限
  sysroleAllotAuthUrl: apiConfig.host + '/v1/sysrole/allotAuth',
  // 酒店管理
  // 酒店小商品列表
  hotelGoodsListUrl: apiConfig.host + '/v1/hotel/goodsList',
  // 酒店小商品添加/编辑
  hotelGoodsSaveUrl: apiConfig.host + '/v1/hotel/goodsSave',
  // 酒店小商品删除
  hotelGoodsDelUrl: apiConfig.host + '/v1/hotel/goodsDel',
  // 酒店小商品详情
  hotelGoodsInfoUrl: apiConfig.host + '/v1/hotel/goodsInfo',
  // 小商品进出库记录添加
  hotelGoodsStockSaveUrl: apiConfig.host + '/v1/hotel/goodsStockSave',
  // 小商品进出库记录
  hotelGoodsStockListUrl: apiConfig.host + '/v1/hotel/goodsStockList',
  // 小商品进出库记录添加
  hotelGoodsStockInfoUrl: apiConfig.host + '/v1/hotel/goodsStockInfo',
  // 小商品进出库记录修改
  hotelGoodsStockEditUrl: apiConfig.host + '/v1/hotel/stockRecordEdit',
  // 报表
  // 管理后台首页统计
  reportHomeUrl: apiConfig.host + '/v1/report/home',
  // 财务概况
  reportFinanceOverviewUrl: apiConfig.host + '/v1/report/finance_overview',
  // 交班报表汇总
  reportShiftDayUrl: apiConfig.host + '/v1/report/shiftDay',
  // 交班报表明细
  reportShiftListUrl: apiConfig.host + '/v1/report/shiftList',
  // 操作人列表接口
  reportOperatorListUrl: apiConfig.host + '/v1/report/operatorList',
  // 夜审报表
  reportNightAuditListUrl: apiConfig.host + '/v1/report/nightAuditList',
  // 夜审报表--查看明细
  reportNightAuditLogListUrl: apiConfig.host + '/v1/report/nightAuditLogList',
  // 房型分析
  reportRoomTypeStatisticsUrl: apiConfig.host + '/v1/report/roomTypeStatistics',
  // 房型分析明细
  reportRoomTypeStatisticsDetailUrl: apiConfig.host + '/v1/report/roomTypeStatisticsDetail',
  // 保存日、周、月、年目标金额
  reportTargetMoneyUrl: apiConfig.host + '/v1/report/hotelTargetMoney',
  // OTA渠道报表
  reportChannelStatisticsUrl: apiConfig.host + '/v1/report/channelStatistics',
  // OTA渠道报表明细
  reportChannelStatisticsDetailUrl: apiConfig.host + '/v1/report/channelStatisticsDetail',
  // 雲宿收益报表
  reportProfitUrl: apiConfig.host + '/v1/report/profit',
  // 综合数据报表-日报
  reportHotelComprehensiveDayUrl: apiConfig.host + '/v1/report/hotelComprehensiveDay',
  // 综合数据报表-周报
  reportHotelComprehensiveWeekUrl: apiConfig.host + '/v1/report/hotelComprehensiveWeek',
  // 综合数据报表-月报
  reportHotelComprehensiveMonthUrl: apiConfig.host + '/v1/report/hotelComprehensiveMonth',
  // 综合数据报表-年报
  reportHotelComprehensiveYearUrl: apiConfig.host + '/v1/report/hotelComprehensiveYear',
  // 渠道-日报
  reportHotelChannelDayUrl: apiConfig.host + '/v1/report/hotelChannelTypeDay',
  // 渠道-周报
  reportHotelChannelWeekUrl: apiConfig.host + '/v1/report/hotelChannelTypeWeek',
  // 渠道-月报
  reportHotelChannelMonthUrl: apiConfig.host + '/v1/report/hotelChannelTypeMonth',
  // 渠道-年报
  reportHotelChannelYearUrl: apiConfig.host + '/v1/report/hotelChannelTypeYear',
  // 房型-日报
  reportHotelRoomTypeDayUrl: apiConfig.host + '/v1/report/hotelRoomTypeDay',
  // 房型-周报
  reportHotelRoomTypeWeekUrl: apiConfig.host + '/v1/report/hotelRoomTypeWeek',
  // 房型-月报
  reportHotelRoomTypeMonthUrl: apiConfig.host + '/v1/report/hotelRoomTypeMonth',
  // 房型-年报
  reportHotelRoomTypeYearUrl: apiConfig.host + '/v1/report/hotelRoomTypeYear',
  // 入住客户信息报表
  reportInUseListUrl: apiConfig.host + '/v1/report/hotelInUseList',
  // 酒店小程序码
  wechatGetWxaCodeUnlimitUrl: apiConfig.host + '/v1/wechat/getWxaCodeUnlimit',
  // 远期房态
  // 按房型查看
  roomstateQueryRemoteByRoomTypeUrl: apiConfig.host + '/v1/roomstate/queryRemoteByRoomType',
  // 按房间查看
  roomstateQueryRemoteByRoomNoUrl: apiConfig.host + '/v1/roomstate/queryRemoteByRoomNo',
  // 维修房列表
  roomstateRepairListUrl: apiConfig.host + '/v1/roomstate/repairList',
  // 查询渠道预订数据
  roomstateQueryChannelDataByDateUrl: apiConfig.host + '/v1/roomstate/queryChannelDataByDate',
  // 查看联房数据
  roomstateJointRoomListUrl: apiConfig.host + '/v1/roomstate/jointRoomList',
  // 联房数据保存
  roomstateJointRoomSaveUrl: apiConfig.host + '/v1/roomstate/jointRoomSave',
  // 退房
  roomstateCheckOutUrl: apiConfig.host + '/v1/roomstate/checkOut',
  // 查看房间下的订单详情
  roomstateOrderInfoUrl: apiConfig.host + '/v1/roomstate/orderInfo',
  // 办理入住
  roomstateCheckInUrl: apiConfig.host + '/v1/roomstate/checkIn',
  // 查看详情
  roomstateInfoUrl: apiConfig.host + '/v1/roomstate/info',
  // 维修房添加
  roomstateRepairAddUrl: apiConfig.host + '/v1/roomstate/repairAdd',
  // 维修房移除
  roomstateRemoveRepairUrl: apiConfig.host + '/v1/roomstate/removeRepair',
  // 房间置脏/置净
  roomstateSetDirtyUrl: apiConfig.host + '/v1/roomstate/setDirty',
  // 获取房态条件数据
  roomstateSelectDataUrl: apiConfig.host + '/v1/roomstate/selectData',
  // 房态颜色编辑
  roomstateColorEditUrl: apiConfig.host + '/v1/roomstate/colorEdit',
  // 未读消息数量统计
  roomstateUnreadMsgNumStatUrl: apiConfig.host + '/v1/roomstate/unreadMsgNumStat',
  // 各房态房间数量统计
  roomstateRoomNumStatUrl: apiConfig.host + '/v1/roomstate/roomNumStat',
  // 房号模糊查询所有房间
  roomstateRoomListLikeUrl: apiConfig.host + '/v1/roomstate/roomListLike',
  // 根据手机号、姓名、身份证号查询入住记录
  memberHistoryListUrl: apiConfig.host + '/v1/roomstate/memberHistoryList',
  // 所有房间数据
  roomstateRoomListUrl: apiConfig.host + '/v1/roomstate/roomList',
  // 查看房间详情
  roomstateRoomInfoUrl: apiConfig.host + '/v1/roomstate/roomInfo',
  // 新订单列表（订单动态）
  roomstateNewOrderListUrl: apiConfig.host + '/v1/roomstate/newOrderList',
  // 预约打扫列表
  roomstateApplyCleanListUrl: apiConfig.host + '/v1/roomstate/applyCleanList',
  // 预约打扫详情
  roomstateApplyCleanInfoUrl: apiConfig.host + '/v1/roomstate/applyCleanInfo',
  // 预约开票列表
  roomstateApplyInvoiceListUrl: apiConfig.host + '/v1/roomstate/applyInvoiceList',
  // 预约开票详情
  roomstateApplyInvoiceInfoUrl: apiConfig.host + '/v1/roomstate/applyInvoiceInfo',

  // 宾客列表
  hotelorderGuestListUrl: apiConfig.host + '/v1/hotelorder/guestList',
  // 获取某个订单的维度（房间）数据
  hotelorderOrderStaysListUrl: apiConfig.host + '/v1/hotelorder/orderStaysList',
  // 订单取消
  hotelorderCancelUrl: apiConfig.host + '/v1/hotelorder/cancel',
  // 订单修改
  hotelorderEditUrl: apiConfig.host + '/v1/hotelorder/edit',
  // 手工订单修改
  hotelorderDiyEditUrl: apiConfig.host + '/v1/hotelorder/diyEdit',
  // 查询某个房间总房价
  hotelorderQueryRoomTotalPriceUrl: apiConfig.host + '/v1/hotelorder/queryRoomTotalPrice',
  // 查询某个房间全日房价（如果是时租则展示时租价格）
  hotelRoomTypeQueryRoomPriceByOrderUrl: apiConfig.host + '/v1/hotelorder/queryRoomPriceByOrder',
  // 商城订单列表
  hotelorderGoodsOrderListUrl: apiConfig.host + '/v1/hotelorder/goodsOrderList',
  // 酒店订单（小丫旅橙）
  hotelorderStaysAdminListUrl: apiConfig.host + '/v1/hotelorder/staysAdminList',
  // 订单列表
  hotelorderListUrl: apiConfig.host + '/v1/hotelorder/list',
  // hotelorderStaysListUrl: apiConfig.host + '/v1/hotelorder/staysList',
  // 订单维度详情
  hotelorderStaysInfoUrl: apiConfig.host + '/v1/hotelorder/staysInfo',
  // 酒店接单
  hotelorderOnlineReceiveUrl: apiConfig.host + '/v1/hotelorder/onlineReceive',
  // 获取房间账单列表
  hotelbillRoomBillListUrl: apiConfig.host + '/v1/hotelbill/roomBillList',
  // 增加款项
  hotelbillSaveUrl: apiConfig.host + '/v1/hotelbill/save',
  // 款项删除
  hotelbillDelUrl: apiConfig.host + '/v1/hotelbill/del',
  // 获取日志
  hotellogListUrl: apiConfig.host + '/v1/hotellog/list',
  // 查看联房数据
  hotelorderJointRoomListUrl: apiConfig.host + '/v1/hotelorder/jointRoomList',
  // 排房保存
  hotelorderArrangeRoomSaveUrl: apiConfig.host + '/v1/hotelorder/arrangeRoomSave',
  // 排房取消
  hotelorderArrangeRoomCancelUrl: apiConfig.host + '/v1/hotelorder/arrangeRoomCancel',
  // 办理入住
  hotelorderCheckInUrl: apiConfig.host + '/v1/hotelorder/checkIn',
  // 查询新线上订单
  hotelorderQueryOnlineNewOrderUrl: apiConfig.host + '/v1/hotelorder/queryOnlineNewOrder',
  // 详情详情
  hotelorderInfoUrl: apiConfig.host + '/v1/hotelorder/info',
  // 各个房型可预订信息列表
  hotelorderBookRoomTypeDataUrl: apiConfig.host + '/v1/hotelorder/bookRoomTypeData',
  // 排房时可选房间列表
  hotelorderArrangeRoomListUrl: apiConfig.host + '/v1/hotelorder/arrangeRoomList',
  // 排房时可选房间列表
  hotelorderCreateUrl: apiConfig.host + '/v1/hotelorder/create',
  // 酒店列表
  hotelListUrl: apiConfig.host + '/v1/hotel/list',
  // 酒店添加/编辑
  hotelSaveUrl: apiConfig.host + '/v1/hotel/save',
  // 酒店删除
  hotelDelUrl: apiConfig.host + '/v1/hotel/del',
  // 酒店详情
  hotelInfoUrl: apiConfig.host + '/v1/hotel/info',
  // 酒店财务记录
  hotelMoneyRecordUrl: apiConfig.host + '/v1/hotel/moneyRecord',
  // 酒店信息编辑 --酒店端
  hotelEditUrl: apiConfig.host + '/v1/hotel/edit',
  // 交通信息编辑
  hotelTrafficInfoEditUrl: apiConfig.host + '/v1/hotel/trafficInfoEdit',
  // 指定用户的酒店列表
  hotelMyHotelListUrl: apiConfig.host + '/v1/hotel/myHotelList',
  // 床型列表
  hotelBedTypeListUrl: apiConfig.host + '/v1/hotel/bedTypeList',
  // 床型添加/编辑
  hotelBedTypeSaveUrl: apiConfig.host + '/v1/hotel/bedTypeSave',
  // 床型删除
  hotelBedTypeDelUrl: apiConfig.host + '/v1/hotel/bedTypeDel',
  // 渠道列表
  hotelchannelListUrl: apiConfig.host + '/v1/hotelchannel/list',
  // 渠道添加/编辑
  hotelchannelSaveUrl: apiConfig.host + '/v1/hotelchannel/save',
  // 渠道详情
  hotelchannelInfoUrl: apiConfig.host + '/v1/hotelchannel/info',
  // 渠道删除
  hotelchannelDelUrl: apiConfig.host + '/v1/hotelchannel/del',
  // 房型列表
  hotelRoomTypeListUrl: apiConfig.host + '/v1/hotel/roomTypeList',
  // 房型添加/编辑
  hotelRoomTypeSaveUrl: apiConfig.host + '/v1/hotel/roomTypeSave',
  // 房型批量添加
  roomTypeBatchAddUrl: apiConfig.host + '/v1/hotel/roomTypeBatchAdd',
  // 房型删除
  hotelRoomTypeDelUrl: apiConfig.host + '/v1/hotel/roomTypeDel',
  // 房型详情
  hotelRoomTypeInfoUrl: apiConfig.host + '/v1/hotel/roomTypeInfo',

  // 房价列表
  hotelRoomTypePriceListUrl: apiConfig.host + '/v1/hotel/roomTypePriceList',
  // 房价添加/编辑
  hotelRoomTypePriceEditUrl: apiConfig.host + '/v1/hotel/roomTypePriceEdit',
  // 房价批量修改
  roomTypePriceBatchEditUrl: apiConfig.host + '/v1/hotel/roomTypePriceBatchEdit',
  // 房价节假日编辑
  hotelHolidayPriceEditUrl: apiConfig.host + '/v1/hotel/holidayPriceEdit',
  // 房价详情
  hotelRoomTypePriceInfoUrl: apiConfig.host + '/v1/hotel/roomTypePriceInfo',

  // 房间列表
  hotelRoomListUrl: apiConfig.host + '/v1/hotel/roomList',
  // 钟点房价格编辑
  hotelHourPriceEditUrl: apiConfig.host + '/v1/hotel/hourPriceEdit',
  // 房间添加/编辑
  hotelRoomSaveUrl: apiConfig.host + '/v1/hotel/roomSave',
  // 房间批量添加
  hotelRoomBatchAddUrl: apiConfig.host + '/v1/hotel/roomBatchAdd',
  // 房间删除
  hotelRoomDelUrl: apiConfig.host + '/v1/hotel/roomDel',
  // 房间详情
  hotelRoomInfoUrl: apiConfig.host + '/v1/hotel/roomInfo',
  // 维修原因
  // 维修类型列表
  hotelrepairTypeListUrl: apiConfig.host + '/v1/hotelrepair/typeList',
  // 维修类型添加编辑
  hotelrepairTypeSaveUrl: apiConfig.host + '/v1/hotelrepair/typeSave',
  // 维修类型删除
  hotelrepairTypeDelUrl: apiConfig.host + '/v1/hotelrepair/typeDel',
  // 酒店小商品类型
  // 酒店小商品类型列表
  hotelGoodsTypeListUrl: apiConfig.host + '/v1/hotel/goodsTypeList',
  // 酒店小商品类型添加编辑
  hotelGoodsTypeSaveUrl: apiConfig.host + '/v1/hotel/goodsTypeSave',
  // 酒店小商品类型删除
  hotelGoodsTypeDelUrl: apiConfig.host + '/v1/hotel/goodsTypeDel',
  // 消费项目列表
  hotelAccountItemListUrl: apiConfig.host + '/v1/hotel/accountItemList',
  // 消费项目添加编辑
  hotelAccountItemSaveUrl: apiConfig.host + '/v1/hotel/accountItemSave',
  // 消费项目删除
  hotelAccountItemDelUrl: apiConfig.host + '/v1/hotel/accountItemDel',
  // 消费项目拆帐
  hotelOpenAccountUrl: apiConfig.host + '/v1/hotelbill/openAccount',
  // 消费项目挂帐
  hotelOnAccountUrl: apiConfig.host + '/v1/hotelbill/onAccount',
  // 消费项目冲账
  hotelReverseEntryUrl: apiConfig.host + '/v1/hotelbill/reverseEntry',
  // 消费项目转账
  hotelTransferOutUrl: apiConfig.host + '/v1/hotelbill/transferOut',
  // 消费项目改备注
  hotelRemarksUrl: apiConfig.host + '/v1/hotelbill/remarks',
  // 支付
  // 支付类型列表
  hotelpayTypeListUrl: apiConfig.host + '/v1/hotelpay/typeList',
  // 支付类型添加编辑
  hotelpayTypeSaveUrl: apiConfig.host + '/v1/hotelpay/typeSave',
  // 支付类型删除
  hotelpayTypeDelUrl: apiConfig.host + '/v1/hotelpay/typeDel',
  // 商铺管理
  // 商铺列表
  shopListUrl: apiConfig.host + '/v1/shop/list',
  // 添加/编辑
  shopSaveUrl: apiConfig.host + '/v1/shop/save',
  // 删除
  shopDelUrl: apiConfig.host + '/v1/shop/del',
  // 详情
  shopInfoUrl: apiConfig.host + '/v1/shop/info',
  // 注册用户列表
  userListUrl: apiConfig.host + '/v1/user/list',
  // 冻结、解冻金额
  userMoneyUrl: apiConfig.host + '/v1/user/money',
  // //禁止、恢复登录
  userStatusUrl: apiConfig.host + '/v1/user/status',
  // 会员管理
  // 会员列表
  hotelmemberListUrl: apiConfig.host + '/v1/hotelmember/list',
  // 会员删除
  hotelmemberDelUrl: apiConfig.host + '/v1/hotelmember/del',
  // 添加/编辑
  hotelmemberSaveUrl: apiConfig.host + '/v1/hotelmember/save',
  // 会员消费记录
  hotelmemberSpendRecordUrl: apiConfig.host + '/v1/hotelmember/spendRecord',
  // 详情
  hotelmemberInfoUrl: apiConfig.host + '/v1/hotelmember/info',
  // 商品分类管理
  // 商品分类列表
  goodsSortListUrl: apiConfig.host + '/v1/goods/sortList',
  // 商品分类添加/编辑
  goodsSortSaveUrl: apiConfig.host + '/v1/goods/sortSave',
  // 商品分类删除
  goodsSortDelUrl: apiConfig.host + '/v1/goods/sortDel',
  // 订单管理
  // 订单列表
  goodsorderListUrl: apiConfig.host + '/v1/goodsorder/list',
  // 订单详情
  goodsorderInfoUrl: apiConfig.host + '/v1/goodsorder/info',
  // 订单返佣详情
  goodsorderCommissionRecordUrl: apiConfig.host + '/v1/goodsorder/commissionRecord',
  // 订单取消
  goodsorderCancelUrl: apiConfig.host + '/v1/goodsorder/cancel',
  // 订单发货
  goodsorderSendUrl: apiConfig.host + '/v1/goodsorder/send',
  // 商品管理
  // 商品列表
  goodsListUrl: apiConfig.host + '/v1/goods/list',
  // 商品添加/编辑
  goodsSaveUrl: apiConfig.host + '/v1/goods/save',
  // 商品删除
  goodsDelUrl: apiConfig.host + '/v1/goods/del',
  // 商品详情
  goodsInfoUrl: apiConfig.host + '/v1/goods/info',
  // 商品上下架
  goodsSetSaleUrl: apiConfig.host + '/v1/goods/setSale',

  // 文件上传
  uploadUrl: apiConfig.host + '/v1/upload/index',
  // 基本设置
  sysconfigListUrl: apiConfig.host + '/v1/sysconfig/list',
  sysconfigSaveUrl: apiConfig.host + '/v1/sysconfig/save',
  sysconfigDelUrl: apiConfig.host + '/v1/sysconfig/del',
  // 广告管理
  adListUrl: apiConfig.host + '/v1/ad/list',
  adSaveUrl: apiConfig.host + '/v1/ad/save',
  adDelUrl: apiConfig.host + '/v1/ad/del',
  // 聊天室管理
  chatListUrl: apiConfig.host + '/v1/chatroom/list',
  chatSaveUrl: apiConfig.host + '/v1/chatroom/save',
  chatDelUrl: apiConfig.host + '/v1/chatroom/del',
  // 文章（推送及公共）管理
  articleListUrl: apiConfig.host + '/v1/article/list',
  articleSaveUrl: apiConfig.host + '/v1/article/save',
  articleDelUrl: apiConfig.host + '/v1/article/del',

  // 评论列表
  hotelcommentListUrl: apiConfig.host + '/v1/hotelcomment/list',
  // 评论回复
  hotelcommentSaveUrl: apiConfig.host + '/v1/hotelcomment/reply',
  // 评论显示设置
  hotelcommentShowUrl: apiConfig.host + '/v1/hotelcomment/show',
  // 优惠券列表-平台
  couponPlatformListUrl: apiConfig.host + '/v1/coupon/platformList',
  // 优惠券列表-酒店
  couponHotelListUrl: apiConfig.host + '/v1/coupon/hotelList',
  // 发放优惠券-平台
  couponPlatformSaveUrl: apiConfig.host + '/v1/coupon/platformSave',
  // 发放优惠券-酒店
  couponHotelSaveUrl: apiConfig.host + '/v1/coupon/hotelSave',
  // 短信通知
  couponSendSmsUrl: apiConfig.host + '/v1/coupon/sendSms',
  // 酒店方提现申请记录
  rebateHotelWithdrawRecordUrl: apiConfig.host + '/v1/rebate/hotelWithdrawRecord',
  // 酒店方申请提现
  rebateHotelWithdrawUrl: apiConfig.host + '/v1/rebate/hotelWithdraw',
  // 平台方提现申请记录
  rebateHotelAdminWithdrawRecordUrl: apiConfig.host + '/v1/rebate/hotelAdminWithdrawRecord',
  // 用户方提现申请记录
  rebateUserWithdrawRecordUrl: apiConfig.host + '/v1/rebate/userWithdrawRecord',
  // 平台方审核提现
  rebateHotelAdminWithdrawUrl: apiConfig.host + '/v1/rebate/hotelAdminWithdraw',
  // 提现记录详情
  rebateWithdrawInfoUrl: apiConfig.host + '/v1/rebate/withdrawInfo',
  // 夜审初始化查询
  hotelnightauditGetinfoUrl: apiConfig.host + '/v1/hotelnightaudit/getinfo',
  // 开始夜审
  hotelnightauditStartAuditUrl: apiConfig.host + '/v1/hotelnightaudit/startAudit',
  // 查询夜审是否完成(轮询)
  hotelnightauditQueryAuditUrl: apiConfig.host + '/v1/hotelnightaudit/queryAudit'

}
