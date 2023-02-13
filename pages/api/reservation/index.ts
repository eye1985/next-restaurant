import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/db";
import { FetchMethods } from "@/enum/fetch-methods";
import dayjs from "dayjs";

export interface ReservationBody {
    name: string;
    email: string;
    phone: number;
    time: Date;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await connectToDB();
    if (!client) {
        res.status(500).json({
            message: `Cannot connect to DB`,
        });
        return;
    }

    switch (req.method) {
        case FetchMethods.GET: {
            const collection = client
                .db("Bao")
                .collection("reservations");

            const startDate = new Date(2023,1, 11);
            const endDate = new Date(2023,1, 12);

            const reservations = await collection.find({
                time : {
                    $gt: startDate,
                    $lt:endDate,
                }
            }).toArray();

            // reservations.forEach(item => {
            //     console.log(dayjs(item.time).format("DD.MM.YYYY HH:mm"));
            // })

            await client.close();
            res.status(200).json({
                reservations: reservations,
            });

            break;
        }

        case FetchMethods.POST:
            const collection = client.db("Bao").collection("reservations");
            const reqBody: ReservationBody = req.body;

            try {
                const insert = await collection.insertOne({
                    name: reqBody.name,
                    time: new Date(reqBody.time),
                    email: reqBody.email,
                    phone: reqBody.phone,
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
