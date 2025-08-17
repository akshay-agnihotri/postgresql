import { Client } from "pg";
import express from "express";
const pgClient = new Client("postgresql://neondb_owner:npg_NDJbU50kjXgE@ep-weathered-snow-ad2nd8ry-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
const app = express();
app.use(express.json());
async function connect() {
    try {
        await pgClient.connect();
        console.log("Connected to PostgreSQL database");
    }
    catch (error) {
        console.error("Error connecting to PostgreSQL database:", error);
    }
}
connect();
app.post("/sign-up", (req, res) => {
    const { username, email, password } = req.body;
    pgClient
        .query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, password])
        .then(() => {
        res.status(201).send({ success: true, message: "User created" });
    })
        .catch((error) => {
        console.error("Error creating user:", error);
        res
            .status(500)
            .send({ success: false, message: "Internal Server Error" });
    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map