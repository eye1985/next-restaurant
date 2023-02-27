import { MongoClient, ObjectId } from "mongodb";
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
): Promise<[res: ReservationDeSerialized |null, err: unknown|null]> => {
    let reservation:ReservationDeSerialized|null = null;
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
