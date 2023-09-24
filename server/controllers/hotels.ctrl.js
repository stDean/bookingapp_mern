const { StatusCodes } = require("http-status-codes");

const Hotels = require("../models/Hotel.model");
const { NotFoundError } = require("../errors");

const HotelsCtrl = {
  getHotels: async (req, res) => {
    const hotels = await Hotels.find({});
    res.status(StatusCodes.OK).json(hotels);
  },
  getHotel: async (req, res) => {
    const {
      params: { id: hotelId },
    } = req;

    const hotel = await Hotels.findById({ _id: hotelId });
    if (!hotel) {
      throw new NotFoundError(`No hotel with id(${hotelId}) found.`);
    }

    res.status(StatusCodes.OK).json(hotel);
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
  deleteHotel: async (req, res) => {
    const {
      params: { id: hotelId },
    } = req;

    const hotel = await Hotels.findOneAndDelete({ _id: hotelId });
    if (!hotel) {
      throw new NotFoundError(`No job with id(${hotelId}) found.`);
    }
    
    res.status(StatusCodes.OK).json({ success: true });
  },
};

module.exports = { HotelsCtrl };
