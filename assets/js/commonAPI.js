// 为全局的axios 请求设置根路径
axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log('----发送 ajax 请求前', config);

    console.log(config.url);
    // 获取本地存储的token令牌
    const token = localStorage.getItem('token') || ''
    // 在发送请求之前判断食肉有/my 开头的请求路径
    // 如果有，手动添加hadders 请求头
    if (config.url.startsWith('/my')) {
        config.headers.Authorization = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('---接收 ajax 响应前', response);
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});