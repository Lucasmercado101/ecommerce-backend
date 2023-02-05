import Express, { RequestHandler } from "express";
import prisma from "./db/db";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import createProduct from "./endpoints/createProduct";
import serveImages from "./endpoints/image";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PORT = process.env.PORT || 3000;

const app = Express();

app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const getAllProducts: RequestHandler = (req, res) => {
  prisma.product
    .findMany()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

app.post("/createProduct", upload.single("productImage"), createProduct);
app.get("/getAllProducts", getAllProducts);
app.get("/images/:id", serveImages);

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
