const jwt = require("jsonwebtoken");

// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
};

// Verify Token validity and attach token data as request attribute
exports.verifyToken = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return (req.authData = authData);
    }
  });
};

// Issue Token
exports.signToken = (req) => {
  //   console.log("request:", req);
  const payload = {
    userId: req.user._id,
    email: req.user.email,
    userName: req.user.username,
    picture: req.user.picture,
  };
  console.log("payload:", payload);
  const token = jwt.sign(payload, "secretkey", { expiresIn: "5m" });
  return token;
};
