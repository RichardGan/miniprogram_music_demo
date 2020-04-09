// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

// 云函数入口函数//多写
exports.main = async(event, context) => {
  //云函数获取顶多100条，小程序端获取顶多20条
  const list = await db.collection('playlist').get()

  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  const newData = []
  for (let i = 0, len1 = newData.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = newData.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  for (let i = 0, len = playlist.length; i < len; i++) {
    await db.collection('playlist').add({
      data: {
        ...playlist,
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }
  return newData.length
}