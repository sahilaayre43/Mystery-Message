import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function dbConnect(): Promise<void> {
    if( connection.isConnected ) {
        console.log("already connected to DB")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '', {})

        connection.isConnected = db.connections[0].readyState

        console.log("connected to DB Successfullly")

    } catch (error) {

        console.log("DB connection failed", error);

        process.exit(1)
    }
}

