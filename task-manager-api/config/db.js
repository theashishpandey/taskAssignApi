const mongoose = require("mongoose");
const dburi = process.env.MONGO_URL
mongoose
     .connect(dburi)
     .then(() => console.log("mongodb connected"))
     .catch((err) => console.log(err));