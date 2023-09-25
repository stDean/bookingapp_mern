// Deps
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const { connectDB } = require("./connect/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// configs
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes and Middlewares
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/users.router");
const hotelsRouter = require("./routes/hotels.router");
const roomsRouter = require("./routes/rooms.router");

// Errors
const NotFoundMiddleware = require("./middleware/route-not-found");
const ErrorsMiddleware = require("./middleware/error-handling");

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use(NotFoundMiddleware);
app.use(ErrorsMiddleware);

// start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// mongoose.connection.on("connected", () => {
//   console.log("Server connected!!");
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Server disconnected!!");
// });

start();
