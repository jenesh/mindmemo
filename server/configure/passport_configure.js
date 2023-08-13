const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const opts = {}

opts.jwtFromRequest = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt']
  }
  return token;
}

opts.secretOrKey = process.env.secret_key;
  
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.user },
        select: { id: true, email: true},
      });
      
      if (!user) {
        return done(null, false); // User not found, authentication failed
      } else {
        return done(null, user); // User found, authentication successful
      }
    } catch (err) {
      return done(err); // An error occurred, authentication failed
    }
  }));


passport.use(new GoogleStrategy({
    clientID: process.env.Google_Client_ID,
    clientSecret: process.env.Google_Client_Secret,
    callbackURL: "http://localhost:3000/authRoutes/google/callback",
    accessType:'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
    // "https://accounts.google.com/", 'https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/plus.login'
  },
  async function (accessToken, refreshToken, profile, cb) {
    console.log('------prof------')
    console.log(refreshToken);
    console.log(profile);
    console.log('------------')
    try {
      let user = await prisma.User.findUnique({
        where: {
          googleId: profile.id,
        },
      });
     

      if (!user) {
        user = await prisma.User.create({
          data: {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
        });
      }
      user['accessToken'] = accessToken;
      user['refreshToken'] = refreshToken;

      console.log('------passportuser------')
      console.log(user);
      console.log('------------')

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    // Store user.id in the session
    done(null, user);
  });
  // Retrieve user data based on user.id from the session
  passport.deserializeUser(async (user, done) => {
    try {  
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  