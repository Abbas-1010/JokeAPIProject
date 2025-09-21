const express = require('express');
const axios = require('axios');
const ejs=require('ejs')
const bodyParser=require('body-parser');
const app = express();
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT=6500;
// Endpoint to fetch a joke
app.get('/',(req,res)=>{
    res.render('joke');
})
app.get('/get-joke', async (req, res) => {
   // const {categories,blacklistFlags,amount}=req.body;
    const categories=req.query.categories;
    const blacklistFlags=req.query.blacklistFlags;
    const amount=req.query.amount;
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/'+categories+'?blacklistFlags='+blacklistFlags+'&format=txt&amount='+amount);
    res.render('joke',{jk:response.data});//`<pre>${response.data}</pre>`);
  } catch (error) {
    res.status(500).send('Error fetching joke: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
