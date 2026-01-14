import type { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) => res.status(404).send('Route does not exists.')