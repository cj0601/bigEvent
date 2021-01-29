$(function () {
  // 从layui中提取模块
  const { layer } = layui

  // 1. 获取用户的个人信息
  function getUserInfo() {
    // 发送 ajax 请求
    axios.get('/my/userinfo').then(res => {
      console.log(res)
      // 校验请求失败
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败!')
      }

      const { data } = res

      // 渲染用户信息
      const name = data.nickname || data.username
      // 渲染昵称
      $('.nickname').text(`欢迎 ${name}`)
      // 渲染头像
      if (data.user_pic) {
        $('.avatar').prop('src', data.user_pic)
        $('.text-avatar').hide()
      } else {
        $('.text-avatar').text(name[0].toUpperCase())
        $('.avatar').hide()
      }

    })
  }

  getUserInfo()

  // 2.  点击退出
  $('#logout').click(function () {

    // 请求接口
    //  1.清除taken
    localStorage.removeItem('token')

    // 2 跳转到登陆页
    location.href = './login.html'
  })
})