export default class FormatHelper {

  static CamelCaseToSentenceCase(phrase) {
    phrase = phrase.replace(/([A-Z])/g,' $1');
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }
}