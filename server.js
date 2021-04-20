const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const apiKey = process.env.OW_API_KEY;


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

app.post("/addentry", (req, res) => {
     
    projectData = {
        temperature : req.body.temperature,
        date : req.body.date,
        user_response : req.body.user_response      
    };
    
    res.send(projectData);

})

app.get("/getsalt", (req, res) => {

    let data = { "OW_KEY" : apiKey  }
    res.send(data);

} )
