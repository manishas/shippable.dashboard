exports.logging = {
express_format: '[:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" :remote-addr'
}
exports.passport = {

    github: {
        clientId:'f5d924e0dd0b8b9b486f',
        secret:'40c44a1f462b5e3dc44c9cb004038c1bdea8b230',
        callbackUrl:'http://192.168.1.131:3000/auth/github/callback'
    }
}
