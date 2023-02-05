import { RequestHandler } from "express";
import prisma from "../db/db";
import * as Z from "zod";

const createProductBodySchema = Z.object({
  name: Z.string(),
  price: Z.coerce.number()
});

const createProduct: RequestHandler = (req, res) => {
  createProductBodySchema
    .parseAsync(req.body)
    .then((body) => {
      const file = Buffer.from(req.file!.buffer);

      prisma.product
        .create({
          data: {
            name: body.name,
            price: body.price,
            productImage: file
          }
        })
        .then((product) => {
          res.send(product);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).end();
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).end();
    });
};

export default createProduct;
