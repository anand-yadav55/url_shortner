const express = require('express');
const Router = express.Router();

const Url = require('../models/Url');

const validUrl = require('valid-url');
const shortid = require('shortid');

Router.post('/', (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  console.log(longUrl);
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid Base Url');
  }
  if (validUrl.isUri(longUrl)) {
    const urlCode = shortid.generate();
    let url = Url.findOne({ longUrl: longUrl }, (err, doc) => {
      if (err) res.send(err);

      if (doc) {
        res.json(doc);
      } else {
        const shortUrl = baseUrl + '/get/' + urlCode;
        url = new Url({
          longUrl: longUrl,
          shortUrl: shortUrl,
          urlCode: urlCode,
          date: new Date(),
        });
        url.save();
        res.json(url);
      }
    });
  } else {
    res.status(401).json('Invalid Long Url');
  }
});

module.exports = Router;
