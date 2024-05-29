
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror({
  IS_LOGIN: null,
  TOKEN: null,
  SESSION_ID: null,
  SESSION_KEY: null,
  PASS_WORD: null,
  NUM_RESET_PASS: null,
  DATE_PASS: null,
  URL_ORC: null,
  USER_SAVE: null,
  PASS_SAVE: null,
});