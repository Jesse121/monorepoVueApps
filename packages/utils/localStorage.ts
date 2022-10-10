const localStorage: Storage = window.localStorage;

/**
 * 重写localStorage 添加过期时间
 */
export default {
  getItem(key: string) {
    let result: any = localStorage.getItem(key);
    if (!result) return null;
    try {
      result = JSON.parse(result);
      if (Date.now() - result.time > result.expire) {
        localStorage.removeItem(key);
        return null;
      }
      return result.data;
    } catch (err) {
      // JSON.parse()不能解析带有中划线的字符串
      return result.data;
    }
  },
  setItem(key: string, val: any, expire: number = 24 * 60 * 60 * 1000) {
    const obj = {
      data: val,
      time: Date.now(),
      expire,
    };
    localStorage.setItem(key, JSON.stringify(obj));
  },
  clear() {
    localStorage.clear();
  },
  keys() {
    return localStorage.keys();
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};
