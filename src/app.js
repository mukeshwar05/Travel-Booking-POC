const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bookingRoutes = require('./routes/bookingRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./model/bookingDb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const swaggerDocument = require('../swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
