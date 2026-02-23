const express = require("express");
const songcontroler = require("../controlers/song.controler");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.post("/songs",upload.single("audio"), songcontroler.createSong);
router.get("/songs", songcontroler.getSongs);
module.exports = router;
