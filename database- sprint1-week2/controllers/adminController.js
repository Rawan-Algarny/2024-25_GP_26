const express = require('express');
const Admin = require('../models/adminModel'); 
const bodyParser = require('body-parser');
const app = express();

/* DIDNOT WORK
app.post('/add-admin', async (req, res) => {
    try {
      const newDocument = await Admin.create(req.body);
      res.status(201).json({ message: 'Document added successfully', data: newDocument });
    } catch (error) {
      res.status(400).json({ message: 'Error adding document', error });
    }
  });
  */