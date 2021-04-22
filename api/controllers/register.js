const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [];

module.exports = {
  register: async (req, res, next) => {
    try {
      const saltRounds = 10;
      let {
        body: { phoneNumber, password },
      } = req;
      //   phoneNumber = "";
      //   password = "";
      phoneNumber = req.sanitize(phoneNumber);
      password = req.sanitize(password);

      if (!phoneNumber) {
        return res.status(401).json({ status: false, message: "You must provide a phone number" });
      }

      if (!password) {
        return res.status(401).json({ status: false, message: "You must provide a password" });
      }

      const userID = Math.floor(Math.random() * 1000000000);
      password = await bcrypt.hash(password, saltRounds);

      const newUser = {
        id: userID,
        phoneNumber,
        password,
      };

      const token = jwt.sign({ userID }, process.env.JWT_SECRET || "bezomoney");
      users.push(newUser); // send to database

      //   console.log(users);

      return res.status(201).json({
        status: true,
        user: { id: userID, token },
        message: "Registration successful",
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({ status: false, message: "Error registering user, try again" });
    }
  },
};
