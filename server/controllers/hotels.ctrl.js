const { StatusCodes } = require("http-status-codes");

const Hotels = require("../models/Hotel.model");
const { NotFoundError } = require("../errors");

const HotelsCtrl = {
  getHotels: async (req, res) => {
    const { max, min, limit, ...restProps } = req.query;
    const hotels = await Hotels.find({
      ...restProps,
      cheapestPrice: {
        $gt: min || 1,
        $lt: max || 999,
      },
    }).limit(limit);
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
  getHotelByCity: async (req, res) => {
    let { cities } = req.query;
    cities = cities.split(",");

    const lists = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );

    res.status(StatusCodes.OK).json(lists);
  },
  getHotelByType: async (req, res) => {
    const hotelCount = await Hotels.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });

    res.status(StatusCodes.OK).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  },
};

module.exports = { HotelsCtrl };
