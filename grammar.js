const json = require('tree-sitter-json/grammar');

module.exports = grammar(json, {
  name: 'ecmd',

  rules: {
    document: $ => repeat($.e_command),
    e_parameter: $ => seq(choice($.e_json_value, $.e_simple_value)),
    e_json_value: $ => $._value,
    e_simple_value: $ => /[^{\["\s][^\s]+/,
    e_command: $ => seq($.e_command_name, repeat($.e_parameter), optional($.e_comment), /\n/),
    e_command_name: $ => /[a-z0-9A-Z_-]+/,
    e_comment: $ => seq(/(#|\/\/) */, $.e_comment_value),
    e_comment_value: $ => /.*/,
  },

  extras: $ => [
    /\s/,
  ],
});
