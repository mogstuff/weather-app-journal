const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

let  apiKey = '{ YOUR API KEY HERE}';

// get api key from .env file if we are running in DEV mode
// .env file added to .gitignore to prevent security issues on githubm.com
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    apiKey = process.env.OW_API_KEY;
}



const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

  let projectData = {  };

// body-parser is deprecated but leaving this in as it is still featured in the course video lessons
// see https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  app.use(cors());
    
  app.use(express.static('website'));
    
  app.get('/getdata', (req, res) => {
    res.send(projectData);
})

app.post('/addentry', (req, res) => {
     
    projectData = {
        temperature : req.body.temperature ,
        date : req.body.date,
        feeling : req.body.content,
        location : req.body.location      
    }
      
    res.send(projectData);

})

app.get('/getsalt', (req, res) => {

    let data = { 'OW_KEY' : apiKey  }   

    res.send(data);

} )
