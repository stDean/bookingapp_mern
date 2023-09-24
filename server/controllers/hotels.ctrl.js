const { StatusCodes } = require("http-status-codes");

const Hotels = require("../models/Hotel.model");
const { NotFoundError } = require("../errors");

const HotelsCtrl = {
  getHotels: async (req, res) => {
    const hotels = await Hotels.find({});
    res.status(StatusCodes.OK).json({ msg: "Hotels" });
  },
  createHotel: async (req, res) => {
    const newHotel = await Hotels.create({ ...req.body });
    res.status(StatusCodes.OK).json(newHotel);
  },
  updateHotel: async (req, res) => {
    const {
      params: { id: hotelId },
    } = req;

    const hotel = await Hotels.findOneAndUpdate({ _id: hotelId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      throw new NotFoundError(`No hotel with id(${hotelId}) found.`);
    }

    res.status(StatusCodes.OK).json(hotel);
  },
};

module.exports = { HotelsCtrl };
