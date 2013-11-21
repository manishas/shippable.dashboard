var should = require('should');
var config = require('../config');
describe('Config',function() {

    it('should define github passport config',function() {
        config.passport.should.have.property('github');
      
    });
    
    it('should expose github secret',function() {
        should(config.passport.github).have.property('secret');
        should(config.passport.github.secret).not.equal('');
    });
    it('should expose github callback',function() {
        should(config.passport.github).have.property('callbackUrl');
        should(config.passport.github.callback).not.equal('');
    });
    it('should expose github clientId',function() {
        should(config.passport.github).have.property('clientId');
        should(config.passport.github.clientId).not.equal('');
    }); 
});
