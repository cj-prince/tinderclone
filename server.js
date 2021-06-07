
const express = require("express")
const mongoose = require("mongoose")
const Cors = require("cors")
const Cards = require("./dbCards")

// App Config

const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:5okwMKnnuiuhNJFY@cluster0.vtcvs.mongodb.net/tinderDB?retryWrites=true&w=majority`

// Middlewares
app.use(express.json())
app.use(Cors())
// DB config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//AP Endpoints
app.get('/', (req, res) => res.status(200).send('You are doing well'));

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err){
            res.status(500).send(err);}
        else {
            res.status(201).send(data);
        }

        
    });
});

app.get('/tinder/card', (req, res) => {

    Cards.find((err, data) => {
        if (err){
            res.status(500).send(err);}
        else {
            res.status(200).send(data);
        }

        
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));