const Room = require("../models/Room.model");
const Hotel = require("../models/Hotel.model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const RoomsCtrl = {
  createRoom: async (req, res) => {
    const {
      params: { hotelId },
    } = req;

    const room = await Room.create({ ...req.body });
    const hotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { rooms: room._id } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hotel) {
      throw new NotFoundError(`No hotel with id(${hotelId}) found.`);
    }

    res.status(StatusCodes.OK).json(room);
  },
  getRooms: async (req, res) => {
    const rooms = await Room.find({});
    res.status(StatusCodes.OK).json(rooms);
  },
  getRoom: async (req, res) => {
    const {
      params: { id: roomId },
    } = req;

    const room = await Room.findById({ _id: roomId });
    if (room) {
      throw new NotFoundError(`No Room with id(${roomId}) found.`);
    }

    res.status(StatusCodes.OK).json(room);
  },
  updateRoom: async (req, res) => {
    const {
      params: { id: roomId },
    } = req;

    const room = await Room.findOneAndUpdate({ _id: roomId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      throw new NotFoundError(`No Room with id(${roomId}) found.`);
    }

    res.status(StatusCodes.OK).json(room);
  },
  deleteRoom: async (req, res) => {
    const {
      params: { id: roomId, hotelId },
    } = req;

    const room = await Room.findOneAndDelete({ _id: roomId });
    await Hotel.findByIdAndUpdate(
      hotelId,
      { $pull: { rooms: roomId } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!room) {
      throw new NotFoundError(`No job with id(${roomId}) found.`);
    }

    res.status(StatusCodes.OK).json({ success: true });
  },
  updateRoomAvailability: async (req, res) => {
    const { roomId } = req.params;

    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        // nested props
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(StatusCodes.OK).json({ msg: "Room updated" });
  },
};

module.exports = { RoomsCtrl };
