const { Admin } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function Auth(req, res, next) {
  try {
    console.log('auth test admin');
    if (req.headers.access_token) {
      let verify = verifyToken(req.headers.access_token)
      req.currentUserId = verify.id
      Admin.findOne({
          where: {
            id: req.currentUserId
          }
        })
        .then((result) => {
          if (result) next()
          else next({ name: 'Unauthenticated' })
        })
        .catch(next)
    } else {
      next({ name: 'Unauthenticated' })
    }
  } catch {
    next({ name: 'Unauthenticated' })
  }
}

module.exports = Auth