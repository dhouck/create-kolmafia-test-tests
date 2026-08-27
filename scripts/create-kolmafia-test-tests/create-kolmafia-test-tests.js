'use strict';

var kolmafia = require('kolmafia');

// Note: it is possible to call a script with multiple parameters, but usually the entire command
// line is a string with one parameter.
function main() {
  kolmafia.print("Welcome, ".concat(kolmafia.myName(), "!"));
  kolmafia.print("You have successfully built add-testing!");
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length > 0) {
    var argsString = JSON.stringify(args);
    var argWord = args.length === 1 ? "argument" : "arguments";
    kolmafia.print("You called the script with ".concat(args.length, " ").concat(argWord, ": ").concat(argsString));
  }
}

exports.main = main;
