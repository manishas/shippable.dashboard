var should =  require('should');
var mongoose = require('mongoose');
var model = require('../models/')(mongoose);
var sinon = require('sinon');
var auth = require('../controllers/auth');
describe('Schema Tests',function() {

    it('has a UserLoginAudit schema',function() {
        //var m = model(mongoose); 
        var u = new model.UserLoginAudit;
        should(u.schema.paths).have.property('githubId');
        u.schema.paths.should.have.property('lastLoginTimeStamp');
    });

    it('saves the UserLoginAudit object',function() {
        var spy = sinon.spy();
        //var m = model(mongoose);
        console.log('stubbing save');
        sinon.stub(model,"UserLoginAudit",function() {
            return { save: spy };
        });
        var date = Date.now();
        auth.onCompleted('sharathmq',date); 
        spy.calledOnce.should.be.true;
        var userLoginAuditObj = spy.getCall(0).thisValue;
        userLoginAuditObj.should.have.property('sharathmq',date);
    });
});
