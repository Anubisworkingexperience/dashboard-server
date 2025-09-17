const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const companyRoutes = require('./routes/companyRouter');
const employeeRoutes = require('./routes/employeeRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});