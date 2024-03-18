const express = require('express');
const router = express.Router();
const path = require('path');

// Define a function that accepts prisma object as a parameter
module.exports = function(prisma) {
  // Define routes using prisma object
  router.get('/', async (req, res) => {
    try {
      const allListItems = await prisma.list.findMany();
      res.json(allListItems);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from database');
    }
  });

  // Route to handle form submission and add item to the database
  router.post('/add-person', async (req, res) => {
    const  itemName  = req.body.itemName;
    
    try {
      await prisma.list.create({
        data: {
          name: itemName
        }
      });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding item to database');
    }
  });

  // Add other API routes here

  return router;
};
