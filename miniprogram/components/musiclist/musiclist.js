// components/musiclist/musiclist.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },

  /**
   * 组件的初始数据
   */
  // data是组件内部的，上面的properties是传递给组件的
  data: {
    playingId: -1
  },
  pageLifetimes: {
    show() {
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event){
      //target 是真正的事件源，currentTarget是绑定事件的元素
      // console.log(event.currentTarget.dataset.musicid)
      const ds = event.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`
      })
    }
  }
})
