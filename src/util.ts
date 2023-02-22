export default class Util {
  static upperCaseFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static lowerCaseFirstLetter(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
