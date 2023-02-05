import { RequestHandler } from "express";
import prisma from "../db/db";

const serveImages: RequestHandler = (req, res) => {
  prisma.product
    .findUnique({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((product) => {
      if (product) {
        res.contentType("image/jpeg");
        res.end(product.productImage, "binary");
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

export default serveImages;
