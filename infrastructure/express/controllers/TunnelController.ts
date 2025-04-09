import { Request, Response } from "express";

export const TunnelHandler = async (req: Request, res: Response) => {
  try {
    const queryParameters = new URLSearchParams(
      Object.entries(req.query).reduce((acc, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>)
    );
    const url = `${process.env.COBALT_URL}tunnel?` + queryParameters.toString();
    const response = await fetch(url);

    for (const [key, value] of response.headers.entries()) {
      res.set(key, value);
    }
    const buffer = await response.arrayBuffer();

    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
