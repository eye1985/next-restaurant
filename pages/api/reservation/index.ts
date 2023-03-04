import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB, getAggregatedReservation } from "@/lib/db";
import { FetchMethods } from "@/enum/fetch-methods";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { ReservationDeSerialized } from "@/interfaces/reservation";
import { dayjsNorway } from "@/utils/date";

const createReservationValidation = () => {
    return z.object({
        name: z.string().min(2).regex(/^[^0-9]*$/),
        time: z.string().datetime(),
        email: z.string().email(),
        phone: z.number().min(8),
        totalGuests: z.number().min(1).max(8),
        timeOfReservation: z.string().datetime(),
    });
};

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
                    const [result, error] = await getAggregatedReservation(
                        client
                    );
                    if (error) {
                        res.status(500).json({
                            message: "Failed to retrieve collection",
                            error,
                        });
                    }
                    reservations = result;
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
                const reqBody: ReservationDeSerialized = req.body;
                const {
                    name,
                    time,
                    email,
                    phone,
                    totalGuests,
                    timeOfReservation,
                } = reqBody;

                const reservationValidation = createReservationValidation();
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
                    error,
                });
            }
            break;
        }
        case FetchMethods.PUT: {
            try {
                const collection = client.db("Bao").collection("reservations");
                const reqBody: ReservationDeSerialized = JSON.parse(req.body);

                const reservationValidation = createReservationValidation();
                reservationValidation.parse(reqBody);

                await collection.updateOne(
                    { _id: new ObjectId(reqBody._id) },
                    {
                        $set: {
                            name: reqBody.name,
                            email: reqBody.email,
                            phone: reqBody.phone,
                            time: dayjsNorway(reqBody.time).toDate(),
                            timeOfReservation: dayjsNorway(new Date()).toDate(),
                            totalGuests: reqBody.totalGuests,
                        },
                    }
                );

                res.status(200).json({
                    message: `${reqBody._id} updated`,
                });
            } catch (error) {
                await client.close();
                res.status(500).json({
                    message: `Make sure the field constraint are correct`,
                    error,
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
