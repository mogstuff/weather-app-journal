const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

  let projectData = {  };


  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use(cors());
    
  app.use(express.static('website'));
  

  
  app.get("/getdata", (req, res) => {
    res.send(projectData);
})