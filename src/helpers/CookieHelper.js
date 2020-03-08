import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class CookieHelper {

  static ClearCookies() {

  }

  static SetCookie(index, data) {
    cookies.set(index, data, { path: '/' });
  }

  static LoadCookie(index) {
    var cookie = cookies.get(index);
    if (cookie === "null" || cookie === "")
      return null;
    return cookie;
  }
}