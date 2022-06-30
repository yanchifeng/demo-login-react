import axios from "axios";

const pendingRequests = new Map();
// 请求拦截器
axios.interceptors.request.use(
  (config:any) => {
    const requestKey = `${config.url}/${JSON.stringify(
      config.params
    )}/${JSON.stringify(config.data)}&request_type=${config.method}`;

    if (pendingRequests.has(requestKey)) {
      config.cancelToken = new axios.CancelToken((cancel) => {
        // cancel 函数的参数会作为 promise 的 error 被捕获
        cancel(`重复的请求被主动拦截: ${requestKey}`);
      });
    } else {
      pendingRequests.set(requestKey, config);
      config.requestKey = requestKey;
    }
    return config;
  },
  (error) => {
    // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
    pendingRequests.clear();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    const requestKey = response.config.requestKey;
    pendingRequests.delete(requestKey);
    return Promise.resolve(response);
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn(error);
      return Promise.reject(error);
    }
    pendingRequests.clear();
    return Promise.reject(error);
  }
);

export default axios;