const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');
const connectDB = require("./src/configs/db");
const userRoute = require("./src/routes/userRoute");
const articleRoute = require("./src/routes/articleRoute");
const commentRoute = require("./src/routes/commentRoute");

const PORT = 8000;

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/article", articleRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, () => {
  console.log(`server run on port ${PORT} ✅`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(9000, () => {
  console.log(`Server is running on port ${9000}`);
});