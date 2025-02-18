import app from "./app";
import { connectDB } from "./config/database";
import { initModels } from "./models";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        await initModels();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Error starting server:", error);
    }
}


startServer();