const express = require('express');
const app = express();
const cors =require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');
const partiesRouter = require('./route/partiesRoute');
const Currency = require('./route/CurrencyRoute');
const Job = require('./route/Job');

dotenv.config()


const port = process.env.PORT;
app.use(express.json());
const corsOptions = {
  origin: [
      'http://localhost:4111'
  ],
  methods: ['GET', 'POST'],
  preflightContinue: true, 
};

app.use(cors());

app.use(morgan('dev'))


app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }))


//root
app.use('/api/parties',partiesRouter)
app.use('/api/currency',Currency);
app.use('/api/job', Job);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected");
    }).catch((error)=>{
      console.log(`database connection error${error}`);
    })
 
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });