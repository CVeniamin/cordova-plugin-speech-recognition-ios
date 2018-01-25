'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var exec = _interopDefault(require('cordova/exec'));

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};











var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};





var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var AUTHORIZATION_STATUS_AUTHORIZED = 0;
var AUTHORIZATION_STATUS_DENIED = 1;
var AUTHORIZATION_STATUS_NOT_DETERMINED = 2;
var AUTHORIZATION_STATUS_RESTRICTED = 3;
var AUTHORIZATION_STATUS_UNKNOWN = -1;

var TASK_HINT_CONFIRMATION = 3;
var TASK_HINT_DICTATION = 1;
var TASK_HINT_SEARCH = 2;
var TASK_HINT_UNSPECIFIED = 0;

var authorizationStatus = function authorizationStatus(success, failure) {
  return exec(success, failure, 'SpeechRecognitionIos', 'authorizationStatus', []);
};

var isAvailable = function isAvailable(success, failure) {
  return exec(success, failure, 'SpeechRecognitionIos', 'isAvailable', []);
};

var requestAuthorization = function requestAuthorization(success, failure) {
  return exec(success, failure, 'SpeechRecognitionIos', 'requestAuthorization', []);
};

var startSuccess = function startSuccess(success) {
  return function (_ref) {
    var transcriptions = _ref.transcriptions,
        rest = objectWithoutProperties(_ref, ['transcriptions']);
    return success(_extends({
      bestTranscription: transcriptions[0],
      transcriptions: transcriptions
    }, rest));
  };
};

var start = function start(id, options, success, failure) {
  return exec(startSuccess(success), failure, 'SpeechRecognitionIos', 'start', [id, options || {}]);
};

var stop = function stop(id, success, failure) {
  return exec(success, failure, 'SpeechRecognitionIos', 'stop', [id]);
};

var supportedLocales = function supportedLocales(success, failure) {
  return exec(success, failure, 'SpeechRecognitionIos', 'supportedLocales', []);
};

exports.AUTHORIZATION_STATUS_AUTHORIZED = AUTHORIZATION_STATUS_AUTHORIZED;
exports.AUTHORIZATION_STATUS_DENIED = AUTHORIZATION_STATUS_DENIED;
exports.AUTHORIZATION_STATUS_NOT_DETERMINED = AUTHORIZATION_STATUS_NOT_DETERMINED;
exports.AUTHORIZATION_STATUS_RESTRICTED = AUTHORIZATION_STATUS_RESTRICTED;
exports.AUTHORIZATION_STATUS_UNKNOWN = AUTHORIZATION_STATUS_UNKNOWN;
exports.TASK_HINT_CONFIRMATION = TASK_HINT_CONFIRMATION;
exports.TASK_HINT_DICTATION = TASK_HINT_DICTATION;
exports.TASK_HINT_SEARCH = TASK_HINT_SEARCH;
exports.TASK_HINT_UNSPECIFIED = TASK_HINT_UNSPECIFIED;
exports.authorizationStatus = authorizationStatus;
exports.isAvailable = isAvailable;
exports.requestAuthorization = requestAuthorization;
exports.start = start;
exports.stop = stop;
exports.supportedLocales = supportedLocales;
