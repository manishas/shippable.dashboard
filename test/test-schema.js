var should =  require('should');
var model = require('../models/');
var mongoose = require('mongoose');
describe('Schema Tests',function() {

    it('has a UserLoginAudit schema',function() {
        var m = model(mongoose); 
        var u = new m.UserLoginAudit;
        should(u.schema.paths).have.property('githubId');
        u.schema.paths.should.have.property('lastLoginTimeStamp');
    });
});
