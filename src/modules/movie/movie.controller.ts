import express from 'express';
import { prisma } from "@/common/config/prisma";

export const getMovie = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params['id']);
    const movie = await prisma.movie.findUnique({
        where: {
            id: id,
        },
    });
    res.status(200).json({ movie });
}
export const getMovies = async (req: express.Request, res: express.Response) => {
    const movies = await prisma.movie.findMany()
    res.status(200).json({ movies });
}