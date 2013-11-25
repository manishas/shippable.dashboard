var should = require('should');
var auth = require('../controllers/auth');
var sinon = require('sinon');
var passport = require('passport');
var config = require('../config/');
var mongoose = require('mongoose');
var model = require('../models/')(mongoose);
var GitHubStrategy = require('passport-github').Strategy;
var UserManager = require('../managers/user');
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
    it('should audit user login',function() {
        var spy = sinon.spy();
        var stub1 = sinon.stub(model,"UserLoginAudit",function() {
                        return { save: spy };
        });

        var mockUserObject = { username: 'test'  };
        UserManager.auditUserLogin(mockUserObject,null);
        spy.calledOnce.should.be.true;
        var userLoginAuditObj = spy.getCall(0).thisValue;
        userLoginAuditObj.should.have.property('githubId','test');
        userLoginAuditObj.should.have.property('lastLoginTimeStamp');
        //TODO: Check if lastLoginTimeStamp is not null
        stub1.restore();

      
    });

    it('saves user login',function() {

        var spy2 = sinon.spy();

        var stub2 = sinon.stub(model,"UserLogin",function() {
                        return { save : spy2};
        });
        var access_token = 'sample_access';
        var refresh_token = 'refresh_token';
        var mockUserObject = { username: 'test'  };
        UserManager.saveUser(mockUserObject,null);
        spy2.calledOnce.should.be.true;
        var userLogin = spy2.getCall(0).thisValue;
        userLogin.should.have.property('githubId','test');

        
        stub2.restore();
    });
});
