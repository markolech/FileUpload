const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  
  let leafs = [
    { name: 'Matthews', position: 'Center'},
    { name: 'Marner', position: 'Right Wing'}
  ];
  leafs = JSON.stringify(leafs)
  res.send(leafs);
})

module.exports = router;