var should =  require('should');
var mongoose = require('mongoose');
var model = require('../models/')(mongoose);
describe('Schema Tests',function() {

    it('has a UserLoginAudit schema',function() {
        var u = new model.UserLoginAudit;
        should(u.schema.paths).have.property('githubId');
        u.schema.paths.should.have.property('lastLoginTimeStamp');
    });

    it('has a UserLogin schema',function() {
        var u = new model.UserLogin;
        u.schema.paths.should.have.property('githubId');
        u.schema.paths.should.have.property('accessToken');
        u.schema.paths.should.have.property('refreshToken');

    });

});
