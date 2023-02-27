import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/db";
import { FetchMethods } from "@/enum/fetch-methods";
import { ObjectId } from "mongodb";
import {z} from "zod";

export interface ReservationBody {
    name: string;
    email: string;
    phone: number;
    time: Date;
    timeOfReservation: Date;
    totalGuests: number;
    _id?: string;
}

interface PutReservationBody {
    totalGuests: number;
    id: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const [client, errorObj] = await connectToDB();
    if (errorObj) {
        res.status(500).json({
            message: `Cannot connect to DB`,
        });
        return;
    }

    switch (req.method) {
        case FetchMethods.GET: {
            try {
                const collection = client.db("Bao").collection("reservations");
                let reservations;

                const { prepareInitialReservation, byDDMMYYYY } = req.query;

                if (byDDMMYYYY) {
                    const dateArray = (byDDMMYYYY as string).split(".");
                    const year = parseInt(dateArray[2]);
                    const month = parseInt(dateArray[1]) - 1;
                    const day = parseInt(dateArray[0]);

                    const startDate = new Date(year, month, day);
                    const endDate = new Date(year, month, day + 1);

                    reservations = await collection
                        .find({
                            time: {
                                $gte: startDate,
                                $lt: endDate,
                            },
                        })
                        .toArray();
                } else if (prepareInitialReservation) {
                    reservations = await collection
                        .aggregate([
                            {
                                $group: {
                                    _id: {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$time",
                                        },
                                    },
                                    count: { $sum: 1 },
                                    reservation: {
                                        $push: {
                                            _id: "$_id",
                                            name: "$name",
                                            time: "$time",
                                            email: "$email",
                                            phone: "$phone",
                                            totalGuests: "$totalGuests",
                                            timeOfReservation:
                                                "$timeOfReservation",
                                        },
                                    },
                                },
                            },
                            {
                                $project: {
                                    date: "$_id",
                                    count: 1,
                                    _id: 0,
                                    reservation: 1,
                                },
                            },
                            {
                                $sort: {
                                    date: 1,
                                },
                            },
                        ])
                        .toArray();
                } else {
                    reservations = await collection.find({}).toArray();
                }

                await client.close();
                res.status(200).json({
                    reservations,
                });
            } catch (error) {
                await client.close();
                res.status(500).json({
                    message: "Failed to retrieve collection ",
                    error,
                });
            }

            break;
        }

        case FetchMethods.POST: {
            try {
                const collection = client.db("Bao").collection("reservations");
                const reqBody: ReservationBody = req.body;
                const {
                    name,
                    time,
                    email,
                    phone,
                    totalGuests,
                    timeOfReservation,
                } = reqBody;

                const reservationValidation = z.object({
                    name : z.string().min(2),
                    time: z.string().datetime(),
                    email: z.string().email(),
                    phone:z.number().min(8),
                    totalGuests:z.number().min(1).max(8),
                    timeOfReservation:z.string().datetime()
                });

                reservationValidation.parse(reqBody);

                const insert = await collection.insertOne({
                    name: name,
                    time: new Date(time),
                    email: email,
                    phone: phone,
                    totalGuests: totalGuests,
                    timeOfReservation: new Date(timeOfReservation),
                });

                await client.close();

                res.status(201).json({
                    message: `${insert.insertedId} created`,
                });
            } catch (error) {
                await client.close();
                res.status(500).json({
                    message: `Failed to create record`,
                    error
                });
            }
            break;
        }
        case FetchMethods.PUT: {
            try {
                const collection = client.db("Bao").collection("reservations");
                const reqBody: PutReservationBody = req.body;

                await collection.updateOne(
                    { _id: new ObjectId(reqBody.id) },
                    {
                        $set: {
                            totalGuests: reqBody.totalGuests,
                        },
                    }
                );

                res.status(200).json({
                    message: `${reqBody.id} updated`,
                });
            } catch (error) {
                await client.close();
                res.status(500).json({
                    message: `Failed to update record`,
                });
            }
            break;
        }
        case FetchMethods.DELETE: {
            try {
                const collection = client.db("Bao").collection("reservations");
                await collection.deleteOne({
                    _id: new ObjectId(req.body.id),
                });

                await client.close();
                res.status(204).end();
            } catch (error) {
                await client.close();
                res.status(500).json({
                    message: `Could not delete ${req.body._id}`,
                });
            }

            break;
        }
        case FetchMethods.PATCH:
            res.status(204).end();
            break;
        default:
            res.status(405).json({
                message: `${req.method} is not supported`,
            });
            break;
    }
}

export default handler;
