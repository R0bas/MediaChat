import { Request, Response } from "express";


export const CobaltHandler = async (req: Request, res: Response) => {
  
    try {
        const url = req.body.url
        if (process.env.COBALT_URL)
        {
            const cobaltResult = await fetch(
                process.env.COBALT_URL || "",
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify({ url }),
                }
              )
              const cobres = await cobaltResult.json();
         res.status(200).json(cobres)
        }
       
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
}