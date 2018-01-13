// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // pageBackgroundColor: '#5cb85c',
    lanternLeftMarginTop:'0rpx',
    lanternRightMarginTop:'0rpx',
    wanshiruyiMarginTop:"0rpx",
    shitouTransform:'rotateZ(0deg)',
    logoRightMarginTop:"0rpx",
    jianlanrenTransform: "scale(1,1)",
    gounianjixiangTransform: 'rotateZ(0deg)',
    cloudleftMarginLeft:"-180rpx",
    cloudRightMarginRight: "-180rpx"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeColor();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  changeColor: function () {
    // 设置背景颜色数据
    this.setData({
      lanternLeftMarginTop: '-88rpx',
      lanternRightMarginTop: '-44rpx',
      wanshiruyiMarginTop: "20rpx",
      shitouTransform: 'rotateZ(-360deg)',
      logoRightMarginTop: "34rpx",
      jianlanrenTransform:"scale(30.6,30.6)",
      gounianjixiangTransform:'rotateZ(360deg)',
      cloudleftMarginLeft: "0rpx",
      cloudRightMarginRight: "0rpx"
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})