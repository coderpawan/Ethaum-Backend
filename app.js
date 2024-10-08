const express = require("express");
const app = express();
const cors = require("cors");
require("./Model/User");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const authService = require("./Controllers/AuthService");
const passportSetup = require("./config/passport-setup");
const productRoutes = require("./Routes/Product");
const priceplanRoutes = require("./Routes/PricePlan");
const searchbarRoutes = require("./Routes/Searchbar");
const testimonialRoutes = require("./Routes/Testimonial");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.use(function (req, res, next) {
  let allowedOrigins = ["*"]; // list of url-s
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  next();
});
app.use(passport.initialize());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + "/"));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(cors());

// ############# GOOGLE AUTHENTICATION ################
// this will call passport-setup.js authentication in the config directory

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

// callback url upon successful google authentication
app.get(
  "/auth/google/callback/",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      // Generate token
      const token = authService.signToken(req);
      console.log("Generated Token:", token); // Debugging statement
      res.redirect(`https://ethaum.vercel.app/?token=${token}`);
    } catch (err) {
      res.status(500).send("Error during authentication");
    }
  }
);

// route to check token with postman.
// using middleware to check for authorization header
app.get("/verify", authService.checkTokenMW, (req, res) => {
  authService.verifyToken(req, res);
  if (null === req.authData) {
    res.sendStatus(403);
  } else {
    res.json(req.authData);
  }
});
//crud api routes
app.use("/api/products", productRoutes);
app.use("/api/searchbar", searchbarRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/priceplan", priceplanRoutes);

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
