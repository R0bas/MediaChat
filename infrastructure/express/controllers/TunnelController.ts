import { Request, Response } from "express";

export const TunnelHandler = async (req: Request, res: Response) => {
    try {
        console.log(req.query)
        const queryParameters = new URLSearchParams(
            Object.entries(req.query).reduce((acc, [key, value]) => {
                if (typeof value === 'string') {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, string>)
        );
        const url = `${process.env.COBALT_URL}tunnel?`+ queryParameters.toString()
        console.log(`${process.env.COBALT_URL}tunnel?`+ queryParameters.toString());
        const cobaltCall = await fetch(
           url,
        )
        console.log(cobaltCall)

// Display the key/value pairs
const myHeaders : Record<string, string>= {};
for (const pair of cobaltCall.headers.entries()) {
    myHeaders[pair[0]]=pair[1]
}
        console.log(myHeaders)
        res.set(myHeaders)  
        res.type('false')      
        res.status(200).send(cobaltCall.body)

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        } else {
        res.status(400).json({ error: "An unknown error occurred" });
        }
    }
}