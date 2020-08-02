const express = require('express')
const passport = require('passport');
const router = express.Router()

router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
  );

router.get('/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if(err) {
      console.log(err)
      return res.redirect('/failed')
    }
    if(!user) {
      console.log('user did not permit')
      return res.redirect('/failed')
    }
    return req.login(user, (error) => {
      if(error) {
        console.log(error)
        return next(error)
      }
      return window.location.href = "http://webworks.kr"
    })
  })(req, res, next)
});

module.exports = router