import express from "express";
import { getArtists } from "../controllers/artistsController.js";




const router = express.Router()


router.get("/:name/:file", getArtists )


export default router