import { Request, Response } from "express";

export const YtTokenHandler = async (req: Request, res: Response) => {
  try {
    if (process.env.YT_SESSION_URL) {
      const response = await fetch(process.env.YT_SESSION_URL || "");
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
