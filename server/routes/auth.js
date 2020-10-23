
const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const authController = require('../controllers/auth');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// router.route('/signup')
//   // sign up with email
//   .post(
//     validateBody(schemas.signUpSchema),
//     authController.signUp
//   );

router.route('/signin')
  // signin with email
  .post(
    validateBody(schemas.signInSchema),
    passportSignIn,
    authController.signIn
  );

router.route('/secret')
  .get(
    passportJWT,
    authController.secret
  );

module.exports = router;