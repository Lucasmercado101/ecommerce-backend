import Express, { RequestHandler } from "express";
import prisma from "./db/db";
const PORT = process.env.PORT || 3000;

const app = Express();

const createProduct: RequestHandler = (req, res) => {
  prisma.product
    .create({
      data: {
        name: "Product 1",
        price: 100
      }
    })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.send(err);
    });
};

app.post("/initial", createProduct);

app
  .listen(PORT, () => {
    console.log("Server started on port " + PORT);
  })
  .on("error", async (err) => {
    await prisma.$disconnect();
  })
  .on("close", async () => {
    await prisma.$disconnect();
  });
