const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;


const cors = require("cors");

require("./Models/db");

const AuthRouter = require("./Routes/AuthRouter");
const productRouter = require("./Routes/productRouter");

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/todo",productRouter);

app.get("/ping",(req,res)=>{
  res.send("pong");
})

app.get("/", (req, res) => {
  res.send("Server is running! pong pogn");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});