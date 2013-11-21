var should = require('should');
var auth = require('../controllers/auth');
var sinon = require('sinon');
var passport = require('passport');
var config = require('../config/');
var mongoose = require('mongoose');
var model = require('../models/')(mongoose);
var GitHubStrategy = require('passport-github').Strategy;
describe('Auth',function() {

    it('should use passport',function() {
        var spy = sinon.spy();
        sinon.stub(passport,"use",spy);
        auth.init();
        
        //console.log(spy);
        
        //assertions
        spy.calledOnce.should.be.equal(true);

        //IMPORTANT
        passport.use.restore();
      
    });
    it('should use github strategy',function() {
       
       // config.passport.github.clientId='abc';

        var spy = sinon.spy();
        sinon.stub(passport,"use",spy);
        //sinon.stub(config,'passport',spy2);
        auth.init();
        //console.log(spy);
        var s = spy.args[0][0];
        //console.log("xxx %j",s);
        should.exist(s);
        s.should.be.an.instanceOf(GitHubStrategy);
        should(s._oauth2._clientId).equal(config.passport.github.clientId);
        should(s._oauth2._clientSecret).equal(config.passport.github.secret);
        should(s._callbackURL).equal(config.passport.github.callbackUrl);
        passport.use.restore();
      
    });
    it('should log user data',function() {
        var spy = sinon.spy();
        sinon.stub(model,"UserLoginAudit",function() {
                        return { save: spy };
        });

        var mockGithubObj = {  };
        auth.onAuthCompleted(mockGithubObj);
        spy.calledOnce.should.be.true;
        var userLoginAuditObj = spy.getCall(0).thisValue;
        userLoginAuditObj.should.have.property('sharathmq',date);

        stub.restore();
      
    });
});
