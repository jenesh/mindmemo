const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


const app = express();

// Connect to the database


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
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: 'Error adding entry' });
    }
  });
  


module.exports = app;
