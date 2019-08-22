const BASE_API = 'https://wxty.qhkltn.com/index.php/api/'
const BASE_IMG = 'https://wxty.qhkltn.com/'
// 获取openid
function getOpenid(a) {
  return BASE_API + `user/openid?code=${a}`
}
//保存用户授权信息
function saveUserInfo(a, b, c) {
  return BASE_API + `user/saveuser?openid=${a}&nickname=${b}&headimage=${c}`
}
//首页轮播（推荐活动）
// function tuijian(){
//   return BASE_API + `article/tuijian_activity`
// }
//首页轮播（优惠活动）
function youhui(){
  return BASE_API + `discount/article_list`
}
//活动列表
function activeList(a,b,c){
  return BASE_API + `article/article_list?page=${a}&size=${b}&address=${c}`
}
//商家详情
function shopDetail(a){
  return BASE_API + `shop/shop_detail?shopid=${a}`
}
//活动详情
function activeDetail(a,b){
  return BASE_API + `article/article_detail?id=${a}&openid=${b}`
}
//投诉反馈
function comment(){
  return BASE_API + 'comment/comment'
}
//收藏活动
function like(a,b){
  return BASE_API + `article/article_collect?openid=${a}&activity_id=${b}`
}
//我的收藏列表
function myLike(a,b,c){
  return BASE_API + `article/article_collectList?openid=${a}&page=${b}&size=${c}`
}
//我的积分
function myJf(a){
  return BASE_API + `user/sum_yongjin?openid=${a}`
}
//积分获取记录
function getRecord(a,b,c){
  return BASE_API + `user/my_yongyin?openid=${a}&page=${b}&size=${c}`
}
//积分排行榜
function rankList(){
  return BASE_API + `user/yongjin_paihang`
}
//积分提现记录
function outRecord(a,b,c){
  return BASE_API + `user/tixian_list?openid=${a}&page=${b}&size=${c}`
}
//商家登录
function storeLogin(){
  return BASE_API + 'shop/login?phone'
}
//获取验证码
function getCode(){
  return BASE_API + 'shop/smsSend'
}
//商家核销订单列表
function storeOrder(a,b,c,d,e){
  return BASE_API + `shop/order_shop?activity_id=${a}&shop_id=${b}&page=${c}&size=${d}&key=${e}`
}
//商家核销函数
function hexiao(a,b,c){
  return BASE_API + `shop/shop_confirm?ord_bh=${a}&activity_id=${b}&shop_id=${c}`
}
//下单
function makeOrder(a,b,c,d,e,f,g){
  return BASE_API + `order/order?openid=${a}&ord_goods=${b}&activity_id=${c}&nickname=${d}&headimage=${e}&ord_price=${f}&tuijian=${g}`
}
//支付
function pay(a,b,c){
  return BASE_API + `pay/pay?ord_bh=${a}&openid=${b}&ord_price=${c}`
}
//取消订单
function cancelOrder(a){
  return BASE_API + `order/order_cancel?ord_bh=${a}`
}
//订单列表
function orderList(a,b,c,d){
  return BASE_API + `order/order_list?page=${a}&size=${b}&openid=${c}&status=${d}`
}
//订单详情
function orderDetail(a){
  return BASE_API + `order/order_detail?id=${a}`
}
//活动商家列表
function shopList(a){
  return BASE_API + `shop/shop_list?activity_id=${a}`
}
//生成推荐二维码
function makeCode(a,b){
  return BASE_API + `share/getCode?openid=${a}&headimg=${b}`
}

module.exports = {
  BASE_IMG,
  getOpenid,
  saveUserInfo,
  // tuijian,
  youhui,
  activeList,
  comment,
  like,
  myLike,
  getRecord,
  outRecord,
  rankList,
  storeLogin,
  getCode,
  storeOrder,
  hexiao,
  activeDetail,
  makeOrder,
  cancelOrder,
  pay,
  orderList,
  orderDetail,
  shopList,
  makeCode,
  myJf,
  shopDetail
}