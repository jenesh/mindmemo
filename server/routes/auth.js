const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.Google_Client_ID,
    clientSecret: process.env.Google_Client_Secret,
    callbackURL: "http://localhost:3000/google/callback"
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
        console.log('---------------');
        console.log(profile);
        console.log('---------------');
      const user = await prisma.User.findUnique({
        where: {
          googleId: profile.id,
        },
      });

      if (!user) {
        const newUser = await prisma.User.create({
          data: {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        return cb(null, newUser);
      }

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    // Store user.id in the session
    done(null, user.id);
  });
passport.deserializeUser((user, done) => {
     // Retrieve user data based on user.id from the session
    done(null, user.id);
  });
  