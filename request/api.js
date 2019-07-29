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
//活动列表
function activeList(a,b,c){
  return BASE_API + `article/article_list?page=${a}&size=${b}&address=${c}`
}
//投诉反馈
function comment(){
  return BASE_API + 'comment/comment'
}
//我的收藏列表
function myLike(a,b,c){
  return BASE_API + `article/article_collectList?openid=${a}&page=${b}&size=${c}`
}
//佣金获取记录
function getRecord(a,b,c){
  return BASE_API + `user/my_yongyin?openid=${a}&page=${b}&size=${c}`
}
//佣金提现记录
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
//商家核销订单
function storeOrder(a,b,c,d){
  return BASE_API + `shop/order_shop?activity_id=${a}&shop_id=${b}&page=${c}&size=${d}`
}
//商家核销函数
function hexiao(a,b,c){
  return BASE_API + `shop/shop_confirm?ord_bh=${a}&activity_id=${b}&shop_id=${c}`
}
module.exports = {
  BASE_IMG,
  getOpenid,
  saveUserInfo,
  activeList,
  comment,
  myLike,
  getRecord,
  outRecord,
  storeLogin,
  getCode,
  storeOrder,
  hexiao
}