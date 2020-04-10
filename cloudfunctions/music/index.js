// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database()
  .collection('playlist')
  .skip(event.start)
  .limit(event.count)
  .orderBy('createTime','desc') //orderBy是排序，第一个参数是按照该类型排序，第二个是逆序
  .get()
  .then((res) => {
    return res
  })
}