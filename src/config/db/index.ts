import { db } from "../../prisma/db";
import app from "../../app";
import { MESSAGES } from "../../constants/messages";



export const connectToDB = () => {
    return async () => {

        try {
            // Connect to database
            await db.connect();

            // Verify actual database access
            await db.orm.public.User.all();
            console.log(MESSAGES.SUCCESS.DATABASE_CONNECTED);

        } catch (error) {
            console.error(MESSAGES.ERROR.DATABASE_CONNECTION_FAILED);
            try {
                await db.close();
            } catch {
                // Ignore cleanup error
            }

            process.exitCode = 1;
        }
    }
}



