import {NextApiRequest, NextApiResponse} from "next";
import {connectToDB} from "@/lib/db";
import {FetchMethods} from "@/enum/fetch-methods";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDB();
    if (!client) {
        res.status(500).json({
            message: `Cannot connect to DB`,
        });
        return;
    }

    switch (req.method) {
        case FetchMethods.GET:
            res.status(200).json({
                message: `Resource returned`,
            });
            break;
        case FetchMethods.POST:
            const collection = client.db("Bao").collection("reservations");

            const {date, persons} = req.body;

            try {
                const insert = await collection.insertOne({
                    date,
                    persons,
                });

                await client.close();

                res.status(201).json({
                    message: `${insert.insertedId} created`,
                });
            } catch (error) {
                res.status(500).json({
                    message: `Failed to create record`,
                });
            }
            break;
        case FetchMethods.PUT:
            res.status(200).json({
                message: `Resource updated`,
            });
            break;
        case FetchMethods.DELETE:
            res.status(204).json({
                message: `Delete created`,
            });
            break;
        case FetchMethods.PATCH:
            res.status(204).json({
                message: `Resource patched`,
            });
            break;
        default:
            res.status(405).json({
                message: `${req.method} is not supported`,
            });
            break;
    }
}

export default handler;
