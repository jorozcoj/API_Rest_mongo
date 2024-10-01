import express from express;
import {router} from 'express';
import moviesSchema from '../modules/movie-model'
import { getMovie } from '../middlewares';

//obtener todas las peliculas
router.get('/',async(req, res)=>{
    try {
        const movies = await moviesSchema.find();
        console.log('Get All', movies);
        if(movies.length === 0){
            return res.status(204).json([]);
        }
        res.json(movies)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//crear una nueva pelicula
router.post('/',async(req, res)=>{
    const {id ,title, year, director, duration,poster,genre,rate} = req.body
    if (!id || !title || !year || !director || !duration || !poster || !genre) {
        return res.status(404).json({message:'Todos Los campos son requeridos'})
        }
    const movie = new moviesSchema (
        {
            id ,title, year, director, duration,poster,genre
        }
    )

    try {
        const newMovie = await movie.save()
        console.log(newMovie)
        res.status(201).json(newMovie)
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

})


//Get de una sola pelicula usando el middleware
router.get('/:id', getMovie, async(req, res)=>{
    res.json(movie)
})

//actualizar todos los campos de una pelicula
router.put('/:id', getMovie, async(req, res)=>{
    try {
        const movie = res.movie;
        movie.title = req.body.title || movie.title;
        movie.year = req.body.year || movie.year;
        movie.director = req.body.director || movie.director;
        movie.duration = req.body.duration || movie.duration;
        movie.poster = req.body.poster || movie.poster;
        movie.genre = req.body.genre || movie.genre;

        const updatedMovie = await movie.save()
        res.json(updatedMovie)
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
})

//actualizar un solo campo de una pelicula
router.patch('/:id', getMovie, async(req, res)=>{
    if(!req.body.title && !req.body.year && !req.body.director && !req.body.duration && !req.body.poster && !req.body.genre){
        res.status(400).json({
            message:"debe enviar almenos un dato"
        })
    }
    try {
        const movie = res.movie;
        movie.title = req.body.title || movie.title;
        movie.year = req.body.year || movie.year;
        movie.director = req.body.director || movie.director;
        movie.duration = req.body.duration || movie.duration;
        movie.poster = req.body.poster || movie.poster;
        movie.genre = req.body.genre || movie.genre;

        const updatedMovie = await movie.save()
        res.json(updatedMovie)
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
})

//eliminar una pelicula
router.delete("/:id", getMovie,async (req, res)=>{
    try {
        const movie = res.movie
        await movie.deleteOne({
            _id:movie._id
        })
        res.json({
            message:`La pelicula ${movie} fue eliminada correctamente`
        })
        
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
        
    }
})


//module.exports(router)