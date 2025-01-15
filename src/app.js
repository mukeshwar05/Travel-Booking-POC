const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
require('./model/createBooking');
const app = express();

app.use(bodyParser.json());

const swaggerDocument = require('../swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
