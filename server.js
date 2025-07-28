const express= require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const Movie= require('./models/movie')
const app=express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
   console.log("Mongo connected") 
})
.catch((err)=>{
    console.error("Mongo gone: ", err)
})

app.post('/movies', async(req,res)=>{
    const {title,genre} = req.body;

    try {
        const movie =await Movie.create({title,genre});
        res.status(201).json(movie);
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

app.patch('/movies/:id/watched', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { watched: true },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;

  try {
    const movies = await Movie.find({ genre });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});