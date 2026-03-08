// Import Libraries & Frameworks
const express = require("express");
const cors = require("cors");
const app = express();
let port = 3000;
const Cards = require("./route/getCards")
const CardsEffects = require("./route/getCardsEffects")
const Cardsparam = require("./route/getCardsparam")
const Deck = require("./route/getDeck")
const DeckCards = require("./route/getDeckCards")
const Effects = require("./route/getEffects")
const Effectsparam = require("./route/getEffectsparam")
const Users = require("./route/getUsers")
const postUsers = require("./route/postUsers");
const putUsers = require("./route/putUsers");
const putDeckUser = require("./route/putDeckUser");
const postDeckCard = require("./route/postDeckCard");

// Tell cors to stfu
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Use and convert files to json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);



// Routes
app.use("/cards", Cards);
app.use("/cardsEffects", CardsEffects);
app.use("/Cardsparam", Cardsparam);
app.use("/Deck", Deck);
app.use("/DeckCards", DeckCards);
app.use("/Effects", Effects);
app.use("/Effectsparam", Effectsparam);
app.use("/Users", Users);
app.use("/postUsers", postUsers);
app.use("/putUsers", putUsers);
app.use("/putDeckUser", putDeckUser);
app.use("/postDeckCard", putDeckUser);
// app.get("/", (req, res) => {
//   res.send("Je suis une saucisse");
// });

// app.get("/store", (req, res) => {
//   res.send("Ceci est un store du cul");
// });

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Server Launch
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

let server = app.listen(8081, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.static("public"));
