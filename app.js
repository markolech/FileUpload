const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const routes = require('./router')

app.use(fileUpload());

const hostname = '127.0.0.1'
const port = 3000

app.use(express.static('public'))

app.use(routes)

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file = req.files.file;
  console.log('file ', file.name)

  // Use the mv() method to place the file somewhere on your server
  console.log(`Writing do disk ./uploads/${file.name}`)
  file.mv(`./uploads/${file.name}`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(`Successfully uploaded ${file.name}`);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://${hostname}:${port}/`)
})
