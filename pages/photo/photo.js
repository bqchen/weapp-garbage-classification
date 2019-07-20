// pages/recoverable/recoverable.js
Page({
  data: {
    src: null,
    isShowImage: false,
    imgW: '',
    imgH: '',
    byclear: 1
  },
  onLoad: function (options) {
    this.ctx = wx.createCameraContext();
    // var that = this
    // //获取系统信息  
    // wx.getSystemInfo({
    //   //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
    //   success: function (res) {
    //     that.width = res.windowWidth
    //     console.log(that.width)
    //     that.height = res.windowHeight
    //     console.log(that.height)
    //     // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
    //   }
    // })
  },
  takePhoto: function () {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          isShowImage: true
        })
      }
    })
  },
  continuePhoto: function () {
    this.setData({
      src: null,
      isShowImage: false
    })
  },
  onReady: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        let byclear = res.screenWidth / 375
        that.setData({
          byclear
        })
      },
    })
  },
  display: function(e) {
    // 实际宽度 e.detail.width 高度 e.detail.height
    var whsrc = e.detail.height / e.detail.width
    // 计算高宽，需要处理图片宽度小于屏幕宽度的时候 对应的canvas比例
    let res = this.data.res
    let byclear = this.data.byclear 
    const ctx = wx.createCanvasContext('imageCanvas', this)
    ctx.save()
    if(e.detail.width > 375 * byclear) ctx.scale(375 * byclear / e.detail.width, 375 * byclear / e.detail.width)
    ctx.drawImage(this.data.src, 0, 0, e.detail.width, e.detail.height)
    this.setData({
      imgW: e.detail.width > 375 ? 750 : e.detail.width * 2 / byclear,
      imgH: e.detail.width > 375 ? 750 * whsrc : e.detail.height * 2 / byclear
    })
    // this.setData({
    //   imgW: e.detail.width * 2 / byclear,
    //   imgH: e.detail.height * 2 / byclear
    // })
    ctx.setLineWidth(8);
    ctx.setFontSize(80)
    ctx.font = 'Arial bold'
    // ctx.setStrokeStyle('white')
    // ctx.strokeRect(166, 994, 389, 512)
    // ctx.fillText("①", 166, 994)


    // 框选物体
    ctx.setStrokeStyle('white')
    ctx.strokeRect(202, 180, 671, 584)

    // 标数字的底色方框
    ctx.setFillStyle('brown')
    ctx.fillRect(202 + 671 + 10, 180, 120, 120)

    // 数字
    ctx.setFillStyle('white')
    ctx.fillText("①", 202 + 671 + 10 + 20, 180 + 120 / 2 + 25)

    ctx.draw()
  },
})