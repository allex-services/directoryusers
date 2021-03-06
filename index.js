function createServicePack(execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    d = q.defer(),
    execSuite = execlib.execSuite;

  execSuite.registry.register('allex_usersservice').done(
    realCreator.bind(null, d),
    d.reject.bind(d)
  );

  function realCreator(defer, ParentServicePack){
    var ret = require('./clientside')(execlib);
    ret.Service = require('./servicecreator')(execlib, ParentServicePack);
    defer.resolve(ret);
  }

  return d.promise;
}

module.exports = createServicePack;

