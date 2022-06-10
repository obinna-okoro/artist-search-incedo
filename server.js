import express from "express";
import artistsRouters from "./routes/artistsRoutes.js";


const app = express();

app.use(express.json())


app.use("/artist.search", artistsRouters)






app.listen(4000, () => {
    console.log("Server is listening on Port 4000...")
})


