const Token = require('./Token')
const jwt = require('jsonwebtoken')

class Jwt {
  constructor (config, request) {
    this.config = config
    this.request = request
  }

  verifyOffline (accessToken, cert, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, cert, options, (err, payload) => {
        if (err) reject(err)
        resolve(new Token(accessToken))
      })
    })
  }

  decode (accessToken) {
    return new Promise((resolve, reject) => {
      resolve(new Token(accessToken))
    })
  }

  async verify (accessToken) {
    await this.request.get(`/realms/${this.config.realm}/protocol/openid-connect/userinfo`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    return new Token(accessToken)
  }
}

module.exports = Jwt
