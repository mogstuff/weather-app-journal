const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

  let projectData = {  };


