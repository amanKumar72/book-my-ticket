import express from 'express';
import { prisma } from "@/common/config/prisma";

export const bookTicket = async (req: express.Request, res: express.Response) => {
    const id = Number(req.params['id']);
    const userId = req.user?.userId;

    if (!userId) {
        throw new Error('User not authenticated');
    }

    await prisma.$transaction(async (tx) => {
    const ticket = await tx.$queryRaw`
        select * from "Ticket"
        WHERE id = ${id} 
        AND "isBooked" = false 
        FOR UPDATE
    `;

    if (ticket.length === 0) {
        throw new Error("Ticket not available");
    }

    // Now safely update (row is locked)
    await tx.ticket.update({
        where: { id: id },
        data: { isBooked: true, userId: userId },
    });
    });
    res.status(200).json({ message: 'Ticket booked successfully' });
}
export const getSeats = async (req: express.Request, res: express.Response) => {
    const seats = await prisma.ticket.findMany({
        where: {
            movieId: Number(req.params['id']),
        },
        include: {
            user: true,
        }
    });
    res.status(200).json({ seats });
}