const app = require("./app");
const mongoose = require("mongoose");
dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  /<password>/g,
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("database connected");
  }).catch(err=>{console.log(err)});
app.listen(process.env.PORT, () => {
  console.log("listening to server");
});
