const express = require('express');
const Router = express.Router();
const Url = require('../models/Url');

Router.get('/:urlCode', (req, res) => {
  if (req.params.urlCode) {
    Url.findOne(
      {
        urlCode: req.params.urlCode,
      },
      (err, doc) => {
        if (doc) {
          return res.redirect(doc.longUrl);
        } else {
          return res.status(404).json('No Url found');
        }
      }
    );
  } else {
    res.status('400').send('Enter Url Code');
  }
});

module.exports = Router;
