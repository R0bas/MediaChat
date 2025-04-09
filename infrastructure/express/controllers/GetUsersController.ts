import { io } from "../../../app";

import { Request, Response } from "express";

export const GetUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = Array.from(io.sockets.adapter.rooms.entries())
            .filter(([key]) => !io.sockets.sockets.has(key))
            .map(([key]) => key);
    
        res.status(200).json({ users });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
}
