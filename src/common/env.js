
import RouterURL from '@/router/routers.conf' // 路由相关定义
import URL from './conf/api.conf' // 请求地址定义
import apiConfig from './conf'

// 常量定义
const PLATEFORM = 'WEB_ADMIN_'

const Constants = {
  VERSION: '1.0.0',
  CODES: {
    // 成功
    SUCCESS: 1,
    // 失败
    ERROR: 0,
    // 未登录
    LOGIN: 2,
    // 系统错误提示
    SYSTEM_ERROR: 500
  },
  SDKAppID: '1400433454',
  MAX_PAGE_SIZE: 10000, // 默认查10000条
  PAGESIZE: 15,
  AMAP: {
    version: '1.4.4',
    key: '5f99e050c928982285775e00689c8b05'
  },
  AUTHORIZATION: 'token',
  LOCALSTORAGEKEY: {
    // 存储key
    LANGUAGE: PLATEFORM + '_LANGUAGE', // 站点语言存储
    NEWESTORDERID: PLATEFORM + '_NEWESTORDERID', // 新订单
    USERKEY: {
      USERINFO: PLATEFORM + '_USER_INFO' // 用户信息key
    }
  },
  SEXLIST: [
    { code: '0', name: '保密' },
    { code: '1', name: '男' },
    { code: '2', name: '女' }
  ],
  SHOPSTATUSLIST: [{ code: 1, name: '营业中' }, { code: 0, name: '休息中' }],
  SETTINGORDERTYPELIST: [
    { code: 'room_type', name: '按房型排序' },
    { code: 'room_number', name: '按房号排序' }
  ],
  ORDERSTATUSLIST: [{ code: 'book', name: '预订' },
    { code: 'in_use', name: '现住' },
    { code: 'completed', name: '离店' }, { code: 'cancelled', name: '取消' }],
  GUESTORDERPARENTSTATUSLIST: [{ code: 'cancelled', name: '用户取消' },
    { code: 'new_order', name: '待接单' },
    { code: 'received', name: '已接单' },
    { code: 'rejected', name: '已拒绝' },
    { code: 'wait_use', name: '待入住' },
    { code: 'part_use', name: '部分入住' },
    { code: 'in_use', name: '已入住' },
    { code: 'completed', name: '已完成' }
  ],
  GUESTORDERSTATUSLIST: [{ code: 'wait_assign_room', name: '待分房' },
    { code: 'wait_use', name: '未入住' },
    { code: 'in_use', name: '已入住' },
    { code: 'completed', name: '已离店' }, { code: 'cancelled', name: '已取消' }],
  GUESTTIMETYPELIST: [{ code: 'out', name: '离店' },
    { code: 'in', name: '入住' },
    { code: 'use', name: '在店' },
    { code: 'create', name: '创建' }
  ],
  REPORTCOLORLIST: [
    '#28b9c6',
    '#0075a9',
    '#e84a5f',
    '#f67280',
    '#6c5b7b',
    '#c06c84',
    '#355c7d',
    '#83ae9b',
    '#ff994e',
    '#6d1594',
    '#2e8d4d',
    '#553998',
    '#4d6e21',
    '#16604c',
    '#5f3b46',
    '#72960f',
    '#437783',
    '#b5c107'
  ],
  BILLSTATUSLIST: [
    { code: 'unsettled', name: '未结算' },
    { code: 'settled', name: '已结算' },
    { code: 'transferred', name: '转出' }
  ],
  // ROOMSTATUSES:
  //       [
  //         { code: 'total', name: '全部', color: '#2ebf63' },
  //         { code: 'empty_clean', name: '空净', color: '#2ebf63' },
  //         { code: 'empty_dirty', name: '空脏', color: '#635d5d' },
  //         { code: 'use_clean', name: '住净', color: '#05ff1a' },
  //         { code: 'use_dirty', name: '住脏', color: '#00bfff' },
  //         { code: 'repair', name: '维修', color: '#ffbb00' }
  //       ],
  PHYSICALSTATUSLIST: [
    { code: 'unpaid', name: '未付款' },
    { code: 'cancelled', name: '已取消' },
    { code: 'wait_shipment', name: '待发货' },
    { code: 'wait_receive', name: '已发货' },
    { code: 'completed', name: '已完成' }
  ],
  VIRTUALSTATUSLIST: [
    { code: 'unpaid', name: '未付款' },
    { code: 'cancelled', name: '已取消' },
    { code: 'wait_use', name: '待核销' },
    { code: 'completed', name: '已完成（已核销）' },
    { code: 'expired', name: '已过期' }
  ],
  // 针对商家的订单状态
  HOTEL_ADMIN_STATUS: [
    { code: 'new_order', name: '新订单' },
    { code: 'cancelled', name: '已取消' },
    { code: 'received', name: '已接受' },
    { code: 'rejected', name: '已拒绝' },
    { code: 'part_use', name: '部分入住' },
    { code: 'in_use', name: '已入住' },
    { code: 'wait_use', name: '待入住' }
  ],
  // 针对客户的订单状态
  USER_STATUS: [
    { code: 'unpaid', name: '待付款' },
    { code: 'wait_confirm', name: '待确认' },
    { code: 'wait_use', name: '待入住' },
    { code: 'in_use', name: '入住中' },
    { code: 'completed', name: '已离店' },
    { code: 'cancelled', name: '已取消' }
  ],
  PAYTYPELIST: [
    { code: 'wxpay', name: '微信' },
    { code: 'alipay', name: '支付宝' },
    { code: 'wallet', name: '钱包余额' }
  ],
  DATETYPELIST: [
    { code: 'stay_hotel', name: '在店日期' },
    { code: 'leave_hotel', name: '离店日期' },
    { code: 'join_hotel', name: '入店日期' }
  ],
  CLASSESLIST: [{ code: '', name: '全部' },
    { code: 'work_time_morning', name: '早班' }, { code: 'work_time_noon', name: '中班' },
    { code: 'work_time_night', name: '晚班' }, { code: 'work_time_dark', name: '夜班' }
    // {code:'work_time_before_dawn',name:'凌晨'}
  ],
  PAYINFOTYPELIST: [{ code: 'public', name: '对公' }, { code: 'private', name: '对私' }],
  WITHDRAWAUDITSTATUSLIST: [{ code: 'wait', name: '等待打款' }, { code: 'success', name: '已打款' },
    { code: 'fail', name: '已拒绝' }],
  WITHDRAWAUDITUSERSTATUSLIST: [{ code: 'wait', name: '等待打款' }, { code: 'pass', name: '已打款' },
    { code: 'no_pass', name: '已拒绝' }],
  ROOMTYPESTATUSLIST: [{ code: 0, name: '无效' }, { code: 1, name: '有效' }],
  NIGHTAUDITSTATUSLIST: [
    { code: 'a', name: '开始夜审' },
    { code: 'b', name: '夜审房费（只针对日租）' },
    { code: 'c', name: '将现住房设置为脏房' },
    { code: 'd', name: '生成综合营业日报' },
    { code: 'e', name: '生成综合营业周报' },
    { code: 'f', name: '生成综合营业月报' },
    { code: 'g', name: '生成综合营业年报' },
    { code: 'h', name: '生成房型报表' },
    { code: 'i', name: '生成渠道报表' },
    { code: 'j', name: '生成云酒店收益表' },
    { code: 'k', name: '维护到期维修房' },
    { code: 'l', name: '夜审结果' },
    { code: 'z', name: '夜审结果' }
  ],
  // 消费类型
  CONSUMPTIONTYPES: [{ code: 'spend', name: '消费' }, { code: 'pay', name: '收款' }, { code: 'refund', name: '退款' }],
  ROOMATTRLIST: [
    { code: 'is_desk', name: '书桌', checked: false },
    { code: 'is_sofa', name: '沙发', checked: false },
    { code: 'is_window', name: '有窗', checked: false },
    { code: 'is_no_window', name: '无窗', checked: false },
    { code: 'is_inner_window', name: '内窗', checked: false },
    { code: 'is_heating', name: '暖气', checked: false },
    { code: 'is_projection', name: '投影', checked: false },
    { code: 'is_hair_drier', name: '吹风机', checked: false },
    { code: 'is_washing_machine', name: '洗衣机', checked: false },
    { code: 'is_wifi', name: '无线WiFi', checked: false },
    { code: 'is_wardrobe', name: '衣柜/衣橱', checked: false },
    { code: 'is_pc', name: '台式电脑', checked: false },
    { code: 'is_dry_wet_partition', name: '干湿分区', checked: false },
    { code: 'is_led_tv', name: '液晶电视机', checked: false },
    { code: 'is_air_cleaner', name: '空气净化器', checked: false }
    // { code: 'is_line', name: '有线宽带', checked: false },
    // { code: 'is_outlet', name: '多种规格电源插座', checked: false },
    // { code: 'is_outlet_single', name: '单一规格电源插座', checked: false },
    // { code: 'is_110v', name: '110V电压插座', checked: false },
    // { code: 'is_220v', name: '220V电压插座', checked: false },
    // { code: 'is_mineral_water', name: '矿泉水', checked: false },
    // { code: 'is_safe_box', name: '房内保险箱', checked: false },
    // { code: 'is_chair', name: '座椅', checked: false },
    // { code: 'is_office', name: '办公用品（笔、便签）', checked: false },
    // { code: 'is_sofa_sleep', name: '坐卧两用长沙发', checked: false },
    // { code: 'is_bed_2m', name: '特长睡床（超过两米）', checked: false },
    // { code: 'is_bed_bak', name: '备用床具', checked: false },
    // { code: 'is_duck_quilt', name: '鸭绒被', checked: false },
    // { code: 'is_quilt', name: '毯子或被子', checked: false },
    // { code: 'is_electronic_scale', name: '电子秤', checked: false },
    // { code: 'is_alarm_clock', name: '闹钟', checked: false },
    // { code: 'is_sewing_kit', name: '针线包', checked: false },
    // { code: 'is_umbrella', name: '雨伞', checked: false },
    // { code: 'is_air_conditioner', name: '空调', checked: false },
    // { code: 'is_air_conditioner_cold', name: '空调-仅制冷', checked: false },
    // { code: 'is_electric_fan', name: '电风扇', checked: false },
    // { code: 'is_mosquito_net', name: '蚊帐', checked: false },
    // { code: 'is_electric_blanket', name: '电热毯', checked: false },
    // { code: 'is_fireplace', name: '壁炉', checked: false },
    // { code: 'is_turn_on_night_bed', name: '开夜床', checked: false },
    // { code: 'is_laundry_supplies', name: '洗衣用品', checked: false },
    // { code: 'is_carpet', name: '地毯', checked: false },
    // { code: 'is_ironing_equipment', name: '熨衣设备', checked: false },
    // { code: 'is_ironing_machine', name: '熨裤机', checked: false },
    // { code: 'is_floor_heating', name: '地暖', checked: false },
    // { code: 'is_coat_hanger', name: '衣架', checked: false },
    // { code: 'is_table', name: '餐桌', checked: false },
    // { code: 'is_saloon', name: '客厅角', checked: false },
    // { code: 'is_disposable_slippers', name: '一次性拖鞋', checked: false },
    // { code: 'is_disposable_mouthwash_cup', name: '一次性漱口杯', checked: false },
    // { code: 'is_paper_towel', name: '一次性毛巾', checked: false },
    // { code: 'is_telephone', name: '电话', checked: false },
    // { code: 'is_domestic_long_distance_call', name: '国内长途电话', checked: false },
    // { code: 'is_international_long_distance_call', name: '国际长途电话', checked: false },
    // { code: 'is_tv_channel', name: '电视（有线）频道', checked: false },
    // { code: 'is_tv', name: '电视机', checked: false },
    // { code: 'is_tv_3d', name: '3D电视', checked: false },
    // { code: 'is_pay_tv_on_demand', name: '按次点播收费电视', checked: false },
    // { code: 'is_recreational_machines', name: '游戏机', checked: false },
    // { code: 'is_radio', name: '收音机', checked: false },
    // { code: 'is_ipad', name: 'iPad', checked: false },
    // { code: 'is_ipod', name: 'iPod基座', checked: false },
    // { code: 'is_dvd_machines', name: 'DVD机', checked: false },
    // { code: 'is_fax', name: '传真', checked: false },
    // { code: 'is_sound', name: '音响', checked: false },
    // { code: 'is_ai_door_lock', name: '智能门锁', checked: false },
    // { code: 'is_ai_phone', name: '智能手机', checked: false },
    // { code: 'is_book_pc', name: '手提电脑', checked: false },
    // { code: 'is_cd', name: 'CD播放机', checked: false },
    // { code: 'is_video_recorder', name: '录像机', checked: false },
    // { code: 'is_film_service', name: '电影服务', checked: false },
    // { code: 'is_tv_satellite_channel', name: '电视（卫星）频道', checked: false },
    // { code: 'is_bottled_water', name: '瓶装水', checked: false },
    // { code: 'is_oven', name: '烤箱', checked: false },
    // { code: 'is_toaster', name: '烤面包机', checked: false },
    // { code: 'is_coffee', name: '咖啡机', checked: false },
    // { code: 'is_dishwasher', name: '洗碗机', checked: false },
    // { code: 'is_rang', name: '炉灶', checked: false },
    // { code: 'is_electric_kettle', name: '电热水壶', checked: false },
    // { code: 'is_tea_art_tools', name: '茶艺工具', checked: false },
    // { code: 'is_mini_bar', name: '迷你吧', checked: false },
    // { code: 'is_refrigerator', name: '冰箱', checked: false },
    // { code: 'is_fast_food', name: '速食品', checked: false },
    // { code: 'is_tea_bag', name: '茶包', checked: false },
    // { code: 'is_dining_area', name: '用餐区', checked: false },
    // { code: 'is_kitchen', name: '厨房', checked: false },
    // { code: 'is_kitchenware', name: '厨房用具', checked: false },
    // { code: 'is_microwave_oven', name: '微波炉', checked: false },
    // { code: 'is_condiment', name: '调味品', checked: false },
    // { code: 'is_smoke_lampblack_machine', name: '抽油烟机', checked: false },
    // { code: 'is_snack', name: '小食', checked: false },
    // { code: 'is_fruits', name: '水果', checked: false },
    // { code: 'is_soft_drink', name: '软饮', checked: false },
    // { code: 'is_alcoholic_beverages', name: '酒精饮料', checked: false },
    // { code: 'is_24h_hot_water', name: '24小时热水', checked: false },
    // { code: 'is_electric_water_heater', name: '电热水器', checked: false },
    // { code: 'is_bathtub', name: '浴缸', checked: false },
    // { code: 'is_massage_bathtub', name: '按摩浴缸', checked: false },
    // { code: 'is_public_bathroom', name: '共用浴室', checked: false },
    // { code: 'is_separate_shower', name: '独立淋浴间', checked: false },
    // { code: 'is_public_hair_drier', name: '公用吹风机', checked: false },
    // { code: 'is_slipper', name: '拖鞋', checked: false },
    // { code: 'is_bathrobe', name: '浴衣', checked: false },
    // { code: 'is_bathroom_magnifying_glass', name: '浴室化妆放大镜', checked: false },
    // { code: 'is_bathroom_tv', name: '洗浴间电视', checked: false },
    // { code: 'is_bathroom_tel', name: '洗浴间电话', checked: false },
    // { code: 'is_ai_closestool', name: '智能马桶', checked: false },
    // { code: 'is_japanese_bathrobe', name: '日式浴衣', checked: false },
    // { code: 'is_toothbrush', name: '牙刷', checked: false },
    // { code: 'is_toothpaste', name: '牙膏', checked: false },
    // { code: 'is_shampoo', name: '洗发水', checked: false },
    // { code: 'is_shower_gel', name: '沐浴露', checked: false },
    // { code: 'is_hair_conditioner', name: '护发素', checked: false },
    // { code: 'is_bath_cap', name: '浴帽', checked: false },
    // { code: 'is_soap', name: '香皂', checked: false },
    // { code: 'is_comb', name: '梳子', checked: false },
    // { code: 'is_razor', name: '剃须刀', checked: false },
    // { code: 'is_shower_seat', name: '淋浴座椅', checked: false },
    // { code: 'is_bathroom_with_emergency_button', name: '浴室-带紧急按钮', checked: false },
    // { code: 'is_lower_lavatory_basin', name: '盥洗盆较低', checked: false },
    // { code: 'is_bathtub_with_armrest', name: '浴缸-带扶手', checked: false },
    // { code: 'is_toilet_with_armrest', name: '坐便器-带扶手', checked: false },
    // { code: 'is_barrier_free_shower', name: '无障碍淋浴', checked: false },
    // { code: 'is_wheelchair_accessible', name: '无障碍通道', checked: false },
    // { code: 'is_city_view', name: '城景', checked: false },
    // { code: 'is_seascape', name: '海景', checked: false },
    // { code: 'is_river_view', name: '江/河景', checked: false },
    // { code: 'is_mountain_view', name: '山景', checked: false },
    // { code: 'is_lake_view', name: '湖景', checked: false },
    // { code: 'is_garden_view', name: '花园景', checked: false },
    // { code: 'is_courtyard View', name: '庭院景', checked: false },
    // { code: 'is_swimming pool view', name: '游泳池景', checked: false },
    // { code: 'is_landmark', name: '地标景', checked: false },
    // { code: 'is_enjoy the scenery', name: '享有风景', checked: false },
    // { code: 'is_balcony', name: '阳台', checked: false },
    // { code: 'is_terrace', name: '露台', checked: false },
    // { code: 'is_welcome_gift', name: '欢迎礼品', checked: false },
    // { code: 'is_smoking', name: '抽烟', checked: false },
    // { code: 'is_voice_message', name: '语音留言', checked: false },
    // { code: 'is_connecting_room', name: '连通房', checked: false },
    // { code: 'is_newspaper', name: '报纸', checked: false },
    // { code: 'is_list_of_chinese_facilities', name: '中文设施清单', checked: false },
    // { code: 'is_private_entrance', name: '私人入口', checked: false },
    // { code: 'is_air_detector', name: '空气检测器', checked: false },
    // { code: 'is_ai_passenger_control', name: '智能客控', checked: false },
    // { code: 'is_the_mahjong_table', name: '麻将桌', checked: false },
    // { code: 'is_key_in', name: '钥匙进门', checked: false },
    // { code: 'is_private_swimming_pool', name: '私人游泳池', checked: false },
    // { code: 'is_private_hot springs', name: '私人温泉', checked: false }
  ],
  ROOMSTATUSLIST: [{ code: 'empty', name: '空房可入住' },
    { code: 'wait_use', name: '待入住使用' },
    { code: 'in_use', name: '已有人入住' },
    { code: 'in_repair', name: '需维修不可入住' }
  ],
  GOODSTYPELIST: [
    { code: 'physical', name: '实物商品' },
    { code: 'virtual', name: '周边服务' }
  ],
  GOODSLIMITBUY: [
    { code: 'yes', name: '是' },
    { code: 'no', name: '否' }
  ],
  OBJLIST: [
    { code: 'all_user', name: '所有注册用户' },
    { code: 'all_member', name: '所有酒店会员' },
    { code: 'some_user', name: '指定注册用户' },
    { code: 'some_member', name: '指定会员' }
  ],
  CARDTYPES: [
    { code: 'id_card', name: '身份证' },
    { code: 'passport', name: '护照' },
    { code: 'officer_card', name: '军官证' },
    { code: 'other', name: '其他' }
  ],
  ORDERTYPELIST: [
    { code: 'day_rent', name: '日租' },
    { code: 'hour_rent', name: '时租' }
  ],
  COUPONSTATUSLIST: [
    { code: 'unused', name: '未使用' },
    { code: 'used', name: '已使用' },
    { code: 'expired', name: '已过期' }
  ],
  COUPONTYPELIST: [
    // generic_hotel通用酒店券 generic_shop通用商城券 single_hotel单体酒店券
    { code: 'generic_hotel', name: '通用酒店券' },
    { code: 'generic_shop', name: '通用商城券' },
    { code: 'single_hotel', name: '单体酒店券' }
  ],
  HOTELFACILITYLIST: [{ code: 'is_wifi', name: 'wifi覆盖' }, { code: 'is_air_con', name: '空调开放' }, { code: 'is_hot_water', name: '24小时热水' }],
  WEEKENDLIST: [
    { code: '1', name: '一' },
    { code: '2', name: '二' },
    { code: '3', name: '三' },
    { code: '4', name: '四' },
    { code: '5', name: '五' },
    { code: '6', name: '六' },
    { code: '7', name: '日' }
  ],
  CITYLIST: [
    { code: 'chongqing', name: '重庆' },
    { code: 'chengdu', name: '成都' },
    { code: 'beijing', name: '北京' },
    { code: 'shanghai', name: '上海' },
    { code: 'tianjin', name: '天津' },
    { code: 'xian', name: '西安' },
    { code: 'shijiazhuang', name: '石家庄' },
    { code: 'taiyuan', name: '太原' },
    { code: 'zhengzhou', name: '郑州' },
    { code: 'shenyang', name: '沈阳' },
    { code: 'changchun', name: '长春' },
    { code: 'haerbing', name: '哈尔滨' },
    { code: 'huhehaote', name: '呼和浩特' },
    { code: 'nanjing', name: '南京' },
    { code: 'jinan', name: '济南' },
    { code: 'hefei', name: '合肥' },
    { code: 'hangzhou', name: '杭州' },
    { code: 'fuzhou', name: '福州' },
    { code: 'wuhan', name: '武汉' },
    { code: 'chasha', name: '长沙' },
    { code: 'guagnzhou', name: '广州' },
    { code: 'shenzheng', name: '深圳' },
    { code: 'nanning', name: '南宁' },
    { code: 'nanchang', name: '南昌' },
    { code: 'sanya', name: '三亚' },
    { code: 'guiyang', name: '贵阳' },
    { code: 'kunming', name: '昆明' },
    { code: 'lasha', name: '拉萨' },
    { code: 'lanzhou', name: '兰州' },
    { code: 'xining', name: '西宁' },
    { code: 'yinchuan', name: '银川' },
    { code: 'wulumuqi', name: '乌鲁木齐' }
  ],
  STATUSLIST: [
    { code: 'wait', name: '等待审核' },
    { code: 'pass', name: '审核通过' },
    { code: 'nopass', name: '审核不通过' }
  ]
}

const routerMode = 'history'
const routerAuth = true
const imageServer = apiConfig.imageServer

export {
  routerMode, // 路由模式定义
  RouterURL, // 路由相关定义
  Constants, // 全局配置参数定义
  routerAuth,
  imageServer,
  URL // 请求地址定义
}
