export default class LocalStorageHelper {

  static Clear() {
    localStorage.clear();
  }

  static Save(index, data) {
    data = JSON.stringify(data);
    localStorage.setItem(index, data);
  }

  static Delete(index) {
    localStorage.removeItem(index);
  }

  static Load(index) {
    var data = localStorage.getItem(index);
    if (data === null) {
      return [];
    }
    return JSON.parse(data);
  }
}