exports.logging = {
express_format: '[:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" :remote-addr'
}
exports.passport = {

    github: {
        clientId:'fb4327a96260c37ed1e0',
        secret:'39232925feb85e169443813c577f8d131da271e7',
        callbackUrl:'http://192.168.1.245:3000/auth/github/callback'
    }
}
exports.database= {
    mongo : {
        server:'localhost',
        databaseName:'dashboard_store'
    }
}
