class Err extends Error {
  constructor(key, message) {
    super(message);

    this.message = Err.config[key].message;
    this.code = Err.config[key].code;
  }

  static config = {};

  static setCode(obj) {
    Object.keys(obj).forEach(key => {
      if (!Err.config[key]) {
        Err.config[key] = {};
      }

      Err.config[key].code = obj[key];
    });
  }

  static setLocale(lang, obj) {
    Object.keys(obj).forEach(key => {
      if (!Err.config[key]) {
        Err.config[key] = {};
      }

      if (!Err.config[key].message) {
        Err.config[key].message = {};
      }

      Err.config[key]['message'][lang] = obj[key]
    });
  }
}

export default Err;