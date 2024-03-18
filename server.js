const express = require('express');
const { PrismaClient } = require('@prisma/client');
const apiRoutes = require('./backend/api');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use('/backend/api', apiRoutes(prisma));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
