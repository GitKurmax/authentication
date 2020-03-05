const User = require('../models/user');

module.exports.signup = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;

   if(!email || !password) {
      return res.status(422).send({ error: 'You must rovile email and password'})
   }

   // See if a user with a given email exists
   User.findOne({email:email}, (err, existingUser) => {
      if(err) return next(err);
   
   // If a user with email exists return error
      if(existingUser) return res.status(422).send({error: 'Email is in use'});
   });

   // If a user with email does NOT exists, create and save user record
   const user = new User({
      email,
      password
   });

   user.save((err) => {
      if(err) return next(err);

   //Respond to request indicating the user was created
      res.json(user);
   });
}
