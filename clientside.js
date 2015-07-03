function createClientSide(execlib) {
  'use strict';
  var execSuite = execlib.execSuite,
  UsersServicePack = execSuite.registry.get('allex_usersservice'),
  ParentServicePack = UsersServicePack;

  return {
    SinkMap: require('./sinkmapcreator')(execlib, ParentServicePack)
  };
}

module.exports = createClientSide;
