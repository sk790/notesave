const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:'./backend/.env'})

connectToMongo();

const app = express()

app.use(express.json({limit:'50mb'}))
app.use(cors())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/image', require('./routes/images'))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})