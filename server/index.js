/* eslint-disable no-console */
require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const values = [productId];
  const sql = `
    select *
      from "products"
     where "productId" = $1;
  `;
  if (!productId) {
    return next(new ClientError('Please try again with a valid product Id', 400));
  }
  db.query(sql, values)
    .then(result => {
      if (result.rows.length === 0) {
        next(new ClientError(`Cannot find a product with the id of ${productId}`, 404));
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return [];
  } else {
    const values = [req.session.cartId];
    const sql = `
    select "c"."cartItemId",
          "c"."price",
          "p"."productId",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
    where "c"."cartId" = $1;
    `;
    db.query(sql, values)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  const values = [productId];
  const sqlPrice = `
    select "price"
      from "products"
     where "productId" = $1;
  `;
  if (!productId) {
    return next(new ClientError('The productId given is not valid', 400));
  }
  db.query(sqlPrice, values)
    .then(result => {
      const price = result.rows[0].price;
      if (result.rows.length === 0) {
        throw new ClientError('The product does not appear to exist/have a price', 400);
      } else if (!req.session.cartId) {
        const sqlCartId = `
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId";
        `;
        return db.query(sqlCartId)
          .then(result => {
            return { cartId: result.rows[0].cartId, price: price };
          });
      } else {
        return { cartId: req.session.cartId, price: price };
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const cartValues = [result.cartId, productId, result.price];
      const sqlCartItems = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId";
      `;
      return db.query(sqlCartItems, cartValues)
        .then(result => {
          return result.rows[0].cartItemId;
        });
    })
    .then(result => {
      const cartItemId = result;
      const cartIdValues = [cartItemId];
      const sqlJoinProduct = `
        select "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1;
      `;
      return db.query(sqlJoinProduct, cartIdValues)
        .then(result => {
          return res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    next(new ClientError('There doesn\'t seem to be a cart available for checkout', 400));
  } else if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    next(new ClientError('A name, credit card number, and shipping address must be provided', 400));
  }
  const values = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  const sql = `
    insert into "orders" ("cartId","name","creditCard","shippingAddress")
    values ($1, $2, $3, $4)
    returning "orderId", "createdAt", "name", "creditCard", "shippingAddress";
  `;
  db.query(sql, values)
    .then(result => {
      console.log(result);
      return res.status(201).json(result.rows[0]);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
