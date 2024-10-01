//middleware para recibir una solo pelicula
import express from express;
import {router} from 'express';
import { moviesSchema } from "./modules/movie-model";

export const getMovie = async(req, res, next)=>{
    let movie;
    const {id} = req.params 

    //revisar si corresponde a un Id válido
    if(!id.match(/^[0-9a-fA-F]{36}$/)){
        return res.status(404).json({
            message:'El ID de la pelicula no es valido'
        })
    }

    try {
        movie = await moviesSchema.findById(id)
        if(!movie){
            return res.status(404).json({
                message:'La pelicula no fue encontrada'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
    res.movie=movie
    next()

  } 
  