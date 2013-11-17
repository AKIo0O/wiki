
/*
 * GET home page.
 */

var indexpage = require('../views/index');

exports.index = indexpage.render;

exports.signin = indexpage.signin;

exports.signup = indexpage.signup;

exports.home = indexpage.home;