import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const uri = `mongodb+srv://eye1985:${process.env.DB_PASS}@cluster0.thaptqr.mongodb.net/?retryWrites=true&w=majority`;

export const connectToDB = async () => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        return client;
    }catch (error){
        console.log(error);
    }
}

export const getAdminUser = async (client:MongoClient, username:string, password:string) => {
    try{
        const admins = client.db("Bao").collection("admins");
        return await admins.findOne({
            username,
            password,
        });
    }catch (error){
        console.log(error);
    }
    
    return null;
};