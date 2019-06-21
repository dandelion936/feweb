const IP = {
  // 正式
  ip_00: 'minterface.mxingkong.com',
  // 测试
  ip_01: '192.168.10.26:8190',
}
const developmentIp = IP.ip_01
const developmentUrl = `http://${developmentIp}/api/`
const productionUrl = `http://${IP.ip_00}/vue/`

export default {
  development: developmentUrl, //模拟数据
  production: productionUrl //正式数据
}
