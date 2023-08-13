const express = require('express');
const {google} = require('googleapis');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


const app = express();

// Connect to the database

app.use(cookieParser());

// const scopes = ['https://www.googleapis.com/auth/calendar'];


// Function to add a new entry
async function addEntry(userId, title, url, dataTime, notes) {
    try {
      const userMemo = {
        title: title,
        url: url,
        dataTime: dataTime,
        notes: notes,
        userId: userId, // Associate the memo with the specific user
      };
    return await prisma.userMemoDetails.create({ data: userMemo });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
 

app.post('/userMemo', async (req, res) => {
    const { title, url, dataTime, notes, userId } = req.body;
    const dateTiming = new Date(dataTime).toISOString();
    try {
      // const user = req.user;
      const newEntry = await addEntry(userId, title, url, dateTiming, notes);
      const oauth2Client = new google.auth.OAuth2(
        process.env.Google_Client_ID,
        process.env.Google_Client_Secret
      );

      const userTokens = {
        access_token: req.cookies.accessToken?req.cookies.accessToken:req.headers.accesstoken,
        refresh_token: req.cookies.refreshToken?req.cookies.refreshToken:req.headers.refreshtoken
      };
      console.log(userTokens)
      console.log(req.headers)


      oauth2Client.setCredentials(userTokens);

      // Create a Calendar API client
      const calendar = google.calendar('v3');
    
      // Example: Create an event
      const event = {
        summary: title,
        start: {
          dateTime: dateTiming,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: '2023-08-15T10:00:00',
          timeZone: 'Asia/Kolkata',
        },
      };
    
      calendar.events.insert(
        {
          auth: oauth2Client,
          calendarId: 'primary',
          resource: event,
        },
        (err, response) => {
          if (err) {
            console.error('Error creating event:', err);
            res.status(500).send('Error creating event');
            return;
          }
          console.log('Event created:', response.data);
          res.status(200).send('Event created');
        }
      );
      // res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: 'Error adding entry' });
    }
  });
  


module.exports = app;
