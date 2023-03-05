import { MongoClient, ObjectId, Document } from "mongodb";
import * as dotenv from "dotenv";
import { ReservationDeSerialized } from "@/interfaces/reservation";

dotenv.config();
const uri = `mongodb+srv://eye1985:${process.env.DB_PASS}@cluster0.thaptqr.mongodb.net/?retryWrites=true&w=majority`;

export const connectToDB = async (): Promise<
    [client: MongoClient, errorObj: unknown]
> => {
    const client = new MongoClient(uri);
    let errorObj = null;
    try {
        await client.connect();
    } catch (error) {
        errorObj = error;
    }

    return [client, errorObj];
};

export const getAdminUser = async (
    client: MongoClient,
    username: string,
    password: string
) => {
    try {
        const admins = client.db("Bao").collection("admins");
        return await admins.findOne({
            username,
            password,
        });
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const getReservation = async (
    client: MongoClient,
    id: string
): Promise<[res: ReservationDeSerialized | null, err: unknown | null]> => {
    let reservation: ReservationDeSerialized | null = null;
    let errorObj = null;
    try {
        const reservations = client.db("Bao").collection("reservations");
        reservation = await reservations.findOne<ReservationDeSerialized>({
            _id: new ObjectId(id),
        });
    } catch (error) {
        errorObj = error;
    }

    return [reservation, errorObj];
};

export const getAggregatedReservation = async (client: MongoClient) => {
    let reservation: Document[] | null = null;
    let errorObj = null;

    try {
        const collection = client.db("Bao").collection("reservations");
        reservation = await collection
            .aggregate([
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%d.%m.%Y",
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
                                timeOfReservation: "$timeOfReservation",
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
            ])
            .toArray();
    } catch (error) {
        errorObj = error;
    }

    return [reservation, errorObj];
};
