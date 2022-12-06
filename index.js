// GET /api/books
require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

// stripe middleware:
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Setup your Middleware and API Router here
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const path = require("path");

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;

app.use(function (error, req, res, next) {
  res.send({
    error: "An error occurred",
    message: error.message,
    name: "Notauthorizederror",
  });
});

// setup stripe and app.use static:
app.use(express.static(process.env.STATIC_DIR));

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "client", "build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// route for publishable key for stripe (/config):
app.get("/config", (req, res, next) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// stripe payment intent
app.post("/create-payment-intent", async (req, res, next) => {
  try {
    const amt = req.body.amt;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amt,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent.client_secret);

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("an error occurred attempting to send payment intent");
    res.send({
      message: "an error occurred while attempting to send payment intent info",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is up on ", PORT);
});
