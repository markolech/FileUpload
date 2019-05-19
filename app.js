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

  // The name of the input field uploadFile is used to retrieve the uploaded file
  let uploadFile = req.files.uploadFile;
  console.log('uploadFile: ', uploadFile.name)

  // Wirting the file to the server using .mv()
  console.log(`Writing do disk ./uploads/${uploadFile.name}`)
  uploadFile.mv(`./uploads/${uploadFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(`Successfully uploaded ${uploadFile.name}`);
  });
});



app.listen(port, () => {
  console.log(`Server is listening on http://${hostname}:${port}/`)
})
