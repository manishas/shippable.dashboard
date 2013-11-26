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

    it('finds a user by id',function(){
        var spy1 = sinon.spy();
        var stub1 = sinon.stub(model.UserLogin,"findById",spy1);
        var id = mongoose.Types.ObjectId;
        UserManager.findUserById(id,null);
        spy1.calledOnce.should.be.true;
        var user =spy1.getCall(0).args[0];
        (user === id).should.be.equal(true);
        stub1.restore();

    });
  
  it('finds user by login',function(){
        var spy1 = sinon.spy();
        var stub1 = sinon.stub(model.UserLogin,"findOne",spy1);
        UserManager.findUser('abcd',null);
        spy1.calledOnce.should.be.true;
        var user = spy1.getCall(0).args[0];
        (user.githubId === 'abcd').should.be.equal(true);
        stub1.restore();

   });

});
