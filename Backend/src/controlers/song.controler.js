const uploadFile = require("../service/storage.service");
const songModel = require("../models/song.model");

const createSong = async (req, res) => {
  const { title, artist, mood } = req.body;
  const fileData = await uploadFile(req.file);

  const song = await songModel.create({
    title,
    artist,
    audio: fileData.url,
    mood,
  });
  return res.status(201).json({ message: "song created", data: song });
};

const getSongs = async (req, res) => {
  const { mood } = req.query;
  const songs = await songModel.find({ mood: mood });
  return res.status(200).json({ message: "songs found", data: songs });
};
module.exports = { createSong, getSongs };
