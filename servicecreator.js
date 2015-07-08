function createDirectoryUsersService(execlib, ParentServicePack) {
  'use strict';
  var ParentService = ParentServicePack.Service,
    dataSuite = execlib.dataSuite;

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function DirectoryUsersService(prophash) {
    ParentService.call(this, prophash);
    this.startSubServiceStatically('allex_directoryservice','project_root',{path:prophash.path||'.'});
  }
  ParentService.inherit(DirectoryUsersService, factoryCreator, require('./storagedescriptor'));
  DirectoryUsersService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  DirectoryUsersService.prototype.createStorage = function(storagedescriptor) {
    return ParentService.prototype.createStorage.call(this, storagedescriptor);
  };
  DirectoryUsersService.prototype.preProcessUserHash = function (userhash) {
    var ret = ParentService.prototype.preProcessUserHash.call(this,userhash);
    if(userhash.profile){
      userhash.profile.globalsettingsdirsink = this.subservices.get('project_root');
    }
    return ret;
  };
  return DirectoryUsersService;
}

module.exports = createDirectoryUsersService;
