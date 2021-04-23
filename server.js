const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

  let projectData = {  };

// body-parser is deprecated but leaving this in as it is still featured in the course video lessons
// and it is a requirement in the Project Rubric https://review.udacity.com/#!/rubrics/2655/view
// Project Dependencies : "The body-parser package should be installed and included in the project."
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
        max: req.body.temp_max,
        min: req.body.temp_min,
        feels : req.body.feels_like,
        date : req.body.date,
        content : req.body.content,
        location : req.body.location,
        icon: req.body.icon,
        description: req.body.description
    }
      
    res.send(projectData);

})

