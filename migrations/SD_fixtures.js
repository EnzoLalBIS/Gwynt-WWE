let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");

  // -------------------------
  // SMACKDOWN deck
  // -------------------------
  const checksdDeck = "SELECT id FROM decks WHERE name = 'SMACKDOWN' LIMIT 1";
  const C_sdDeck = "INSERT INTO decks (name, Qtt, img) VALUES ('SMACKDOWN', 25, NULL)";

  // -------------------------
  // 25 cartes SMACKDOWN
  // Important: nom <= 40 recommandé (voir ALTER TABLE)
  // -------------------------
  const sdCards = [
    { nom: "Cody Rhodes", type: "superstar", dgt: 9, role: "main-event", effet: 0, animation: "pose", img: "cody.png", description: "Top star.", music: "cody.mp3", qtt: 1 },
    { nom: "Randy Orton", type: "superstar", dgt: 9, role: "main-event", effet: 0, animation: "stare", img: "orton.png", description: "Legend killer.", music: "orton.mp3", qtt: 1 },
    { nom: "AJ Styles", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "taunt", img: "ajstyles.png", description: "Phenomenal.", music: "ajstyles.mp3", qtt: 1 },
    { nom: "Charlotte Flair", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "pose", img: "charlotte.png", description: "The Queen.", music: "charlotte.mp3", qtt: 1 },
    { nom: "Bianca Belair", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "pose", img: "bianca.png", description: "Power & speed.", music: "bianca.mp3", qtt: 1 },

    { nom: "Kevin Owens", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "brawl", img: "ko.png", description: "Brawler.", music: "ko.mp3", qtt: 1 },
    { nom: "Sami Zayn", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "hype", img: "sami.png", description: "Underdog.", music: "sami.mp3", qtt: 1 },
    { nom: "Drew McIntyre", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "power", img: "drew.png", description: "Powerhouse.", music: "drew.mp3", qtt: 1 },
    { nom: "Bobby Lashley", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "power", img: "lashley.png", description: "Dominant.", music: "lashley.mp3", qtt: 1 },
    { nom: "Shinsuke Nakamura", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "shinsuke.png", description: "Striker.", music: "shinsuke.mp3", qtt: 1 },
    { nom: "Finn Balor", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "balor.png", description: "Precision.", music: "balor.mp3", qtt: 1 },
    { nom: "Asuka", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "taunt", img: "asuka.png", description: "Striker.", music: "asuka.mp3", qtt: 1 },
    { nom: "Bayley", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "bayley.png", description: "Veteran.", music: "bayley.mp3", qtt: 1 },
    { nom: "Solo Sikoa", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "stare", img: "solo.png", description: "Enforcer.", music: "solo.mp3", qtt: 1 },
    { nom: "Karrion Kross", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "stare", img: "kross.png", description: "Intimidation.", music: "kross.mp3", qtt: 1 },
    { nom: "Rey Fenix", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "highfly", img: "fenix.png", description: "High flyer.", music: "fenix.mp3", qtt: 1 },
    { nom: "Iyo Sky", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "highfly", img: "iyo.png", description: "High flyer.", music: "iyo.mp3", qtt: 1 },
    { nom: "Sasha Banks", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "sasha.png", description: "The Boss.", music: "sasha.mp3", qtt: 1 },

    { nom: "Ricochet", type: "superstar", dgt: 5, role: "opener", effet: 0, animation: "highfly", img: "ricochet.png", description: "Aerial.", music: "ricochet.mp3", qtt: 1 },
    { nom: "Carmelo Hayes", type: "superstar", dgt: 5, role: "opener", effet: 0, animation: "taunt", img: "melo.png", description: "Fast.", music: "melo.mp3", qtt: 1 },

    { nom: "Nick Aldis", type: "support", dgt: 0, role: "utility", effet: 0, animation: "order", img: "aldis.png", description: "GM control.", music: "aldis.mp3", qtt: 1 },
    { nom: "SD Crowd", type: "support", dgt: 0, role: "utility", effet: 0, animation: "cheer", img: "crowd_sd.png", description: "Crowd boost.", music: "crowd_sd.mp3", qtt: 1 },

    { nom: "Reversal SD", type: "special", dgt: 0, role: "utility", effet: 0, animation: "reverse", img: "reversal.png", description: "Cancel a play.", music: "sfx_reversal.mp3", qtt: 1 },
    { nom: "Kendo Stick", type: "special", dgt: 0, role: "utility", effet: 0, animation: "kendo", img: "kendo.png", description: "Cheap shot.", music: "sfx_kendo.mp3", qtt: 1 },
    { nom: "Interference", type: "special", dgt: 0, role: "utility", effet: 0, animation: "runin", img: "runin.png", description: "Chaos moment.", music: "sfx_rush.mp3", qtt: 1 },
  ];

  // -------------------------
  // Effects option A (unique par catcheur)
  // -------------------------
  function dgtByRole(role) {
    if (role === "main-event") return 4;
    if (role === "mid-card") return 3;
    if (role === "opener") return 2;
    return 3;
  }

  const effectsToSeed = [
    { cardNom: "Cody Rhodes", effectName: "Cross Rhodes (Cody Rhodes)", state: "damage_enemy;cond=if_enemy_has_main-event", Target: "enemy" },
    { cardNom: "Randy Orton", effectName: "RKO (Randy Orton)", state: "damage_enemy;cond=if_enemy_used_special", Target: "enemy" },
    { cardNom: "AJ Styles", effectName: "Styles Clash (AJ Styles)", state: "damage_enemy;cond=if_round_is_close", Target: "enemy" },
    { cardNom: "Charlotte Flair", effectName: "Figure Eight (Charlotte Flair)", state: "debuff_enemy;cond=if_enemy_has_mid-card", Target: "enemy" },
    { cardNom: "Bianca Belair", effectName: "KOD (Bianca Belair)", state: "damage_enemy;cond=if_enemy_has_more_cards_on_board", Target: "enemy" },

    { cardNom: "Kevin Owens", effectName: "Stunner (Kevin Owens)", state: "damage_enemy;cond=if_you_are_losing_round", Target: "enemy" },
    { cardNom: "Sami Zayn", effectName: "Helluva Kick (Sami Zayn)", state: "damage_enemy;cond=if_enemy_has_support", Target: "enemy" },
    { cardNom: "Drew McIntyre", effectName: "Claymore (Drew McIntyre)", state: "damage_enemy;cond=if_enemy_played_main-event", Target: "enemy" },
    { cardNom: "Bobby Lashley", effectName: "Hurt Lock (Bobby Lashley)", state: "debuff_enemy;cond=if_enemy_has_main-event", Target: "enemy" },
    { cardNom: "Shinsuke Nakamura", effectName: "Kinshasa (Shinsuke Nakamura)", state: "damage_enemy;cond=if_enemy_is_debuffed", Target: "enemy" },
    { cardNom: "Finn Balor", effectName: "Coup de Grace (Finn Balor)", state: "damage_enemy;cond=if_you_played_support_this_round", Target: "enemy" },
    { cardNom: "Asuka", effectName: "Asuka Lock (Asuka)", state: "debuff_enemy;cond=if_enemy_has_main-event", Target: "enemy" },
    { cardNom: "Bayley", effectName: "Rose Plant (Bayley)", state: "damage_enemy;cond=if_round_is_close", Target: "enemy" },
    { cardNom: "Solo Sikoa", effectName: "Samoan Spike (Solo Sikoa)", state: "damage_enemy;cond=if_enemy_used_special", Target: "enemy" },
    { cardNom: "Karrion Kross", effectName: "Kross Jacket (Karrion Kross)", state: "debuff_enemy;cond=if_enemy_has_mid-card", Target: "enemy" },
    { cardNom: "Rey Fenix", effectName: "Fenix Driver (Rey Fenix)", state: "damage_enemy;cond=if_enemy_has_opener", Target: "enemy" },
    { cardNom: "Iyo Sky", effectName: "Moonsault (Iyo Sky)", state: "damage_enemy;cond=if_enemy_has_opener", Target: "enemy" },
    { cardNom: "Sasha Banks", effectName: "Bank Statement (Sasha Banks)", state: "debuff_enemy;cond=if_enemy_has_more_points", Target: "enemy" },

    { cardNom: "Ricochet", effectName: "630 Splash (Ricochet)", state: "damage_enemy;cond=if_you_played_opener_this_round", Target: "enemy" },
    { cardNom: "Carmelo Hayes", effectName: "Nothing But Net (Carmelo Hayes)", state: "damage_enemy;cond=if_random_success", Target: "enemy" },

    { cardNom: "Reversal SD", effectName: "Reversal SD (Special)", state: "cancel_effect;cond=only_last_effect", Target: "enemy", fixedDgt: 0 },
    { cardNom: "Kendo Stick", effectName: "Kendo Stick (Special)", state: "damage_enemy;cond=if_enemy_has_superstar", Target: "enemy", fixedDgt: 3 },
    { cardNom: "Interference", effectName: "Interference (Special)", state: "damage_enemy;cond=if_you_are_losing_round", Target: "enemy", fixedDgt: 2 },
  ];

  // -------------------------
  // Queries: cards/deck/link
  // -------------------------
  const qCheckCard = "SELECT id FROM cards WHERE nom = ? LIMIT 1";
  const qInsertCard =
    "INSERT INTO cards (nom,type,dgt,role,effet,animation,img,description,music) VALUES (?,?,?,?,?,?,?,?,?)";

  const qCheckDeckLink = "SELECT id FROM Decks_cards WHERE id_Deck = ? AND id_Card = ? LIMIT 1";
  const qInsertDeckLink = "INSERT INTO Decks_cards (id_Deck,id_Card,Qtt) VALUES (?,?,?)";
  const qUpdateDeckLink = "UPDATE Decks_cards SET Qtt = ? WHERE id = ?";

  // Queries: effects/link
  const qGetCardRole = "SELECT id, role FROM cards WHERE nom = ? LIMIT 1";
  const qGetEffect = "SELECT id FROM effect WHERE description = ? LIMIT 1";
  const qInsertEffect =
    "INSERT INTO effect (description, dgt, state, Target, death, steal, can_generate, create_id, card_effect) " +
    "VALUES (?, ?, ?, ?, 0, 0, 0, NULL, NULL)";

  const qCheckCardEffectLink = "SELECT id FROM cards_effect WHERE id_card = ? AND id_e = ? LIMIT 1";
  const qInsertCardEffectLink = "INSERT INTO cards_effect (id_card, id_e) VALUES (?, ?)";
  const qSetCardHasEffect = "UPDATE cards SET effet = 1 WHERE id = ?";

  // -------------------------
  // Seed cards + deck composition
  // -------------------------
  function upsertOneCardInDeck(deckId, card, cb) {
    con.query(qCheckCard, [card.nom], function (err, rows) {
      if (err) return cb(err);

      function linkToDeck(cardId) {
        con.query(qCheckDeckLink, [deckId, cardId], function (err, linkRows) {
          if (err) return cb(err);

          if (linkRows.length === 0) {
            con.query(qInsertDeckLink, [deckId, cardId, card.qtt], function (err) {
              if (err) return cb(err);
              cb(null);
            });
          } else {
            con.query(qUpdateDeckLink, [card.qtt, linkRows[0].id], function (err) {
              if (err) return cb(err);
              cb(null);
            });
          }
        });
      }

      if (rows.length === 0) {
        con.query(
          qInsertCard,
          [card.nom, card.type, card.dgt, card.role, card.effet, card.animation, card.img, card.description, card.music],
          function (err, ins) {
            if (err) return cb(err);
            linkToDeck(ins.insertId);
          }
        );
      } else {
        linkToDeck(rows[0].id);
      }
    });
  }

  function seedAllCards(deckId, cb) {
    let i = 0;
    function next(err) {
      if (err) return cb(err);
      if (i >= sdCards.length) return cb(null);
      upsertOneCardInDeck(deckId, sdCards[i], function (err) {
        i++;
        next(err);
      });
    }
    next(null);
  }

  // -------------------------
  // Seed effects + links
  // -------------------------
  function seedOneEffect(item, cb) {
    con.query(qGetCardRole, [item.cardNom], function (err, cardRows) {
      if (err) return cb(err);
      if (cardRows.length === 0) return cb(null);

      const cardId = cardRows[0].id;
      const role = cardRows[0].role;

      const dgt = typeof item.fixedDgt === "number" ? item.fixedDgt : dgtByRole(role);

      con.query(qGetEffect, [item.effectName], function (err, effRows) {
        if (err) return cb(err);

        function link(effectId) {
          con.query(qCheckCardEffectLink, [cardId, effectId], function (err, linkRows) {
            if (err) return cb(err);

            function finalize() {
              con.query(qSetCardHasEffect, [cardId], function (err) {
                if (err) return cb(err);
                cb(null);
              });
            }

            if (linkRows.length === 0) {
              con.query(qInsertCardEffectLink, [cardId, effectId], function (err) {
                if (err) return cb(err);
                finalize();
              });
            } else {
              finalize();
            }
          });
        }

        if (effRows.length === 0) {
          con.query(qInsertEffect, [item.effectName, dgt, item.state, item.Target || "enemy"], function (err, ins) {
            if (err) return cb(err);
            link(ins.insertId);
          });
        } else {
          link(effRows[0].id);
        }
      });
    });
  }

  function seedAllEffects(cb) {
    let i = 0;
    function next(err) {
      if (err) return cb(err);
      if (i >= effectsToSeed.length) return cb(null);
      seedOneEffect(effectsToSeed[i], function (err) {
        i++;
        next(err);
      });
    }
    next(null);
  }

  // -------------------------
  // Checks
  // -------------------------
  function runChecks(deckId) {
    const qCountDeckCards = "SELECT COUNT(*) AS nb FROM Decks_cards WHERE id_Deck = ?";
    const qMissingEffectLinks =
      "SELECT c.nom FROM cards c LEFT JOIN cards_effect ce ON ce.id_card = c.id WHERE c.effet = 1 AND ce.id IS NULL";

    con.query(qCountDeckCards, [deckId], function (err, rows) {
      if (err) {
        console.error("Check failed:", err.message);
        return con.end();
      }
      console.log("SMACKDOWN deck cards count =", rows[0].nb);

      con.query(qMissingEffectLinks, function (err, miss) {
        if (err) {
          console.error("Check failed:", err.message);
          return con.end();
        }
        console.log("Cards marked effet=1 but missing cards_effect links =", miss.length);
        con.end();
      });
    });
  }

  // -------------------------
  // FLOW
  // -------------------------
  con.query(checksdDeck, function (err, deckRows) {
    if (err) throw err;

    function afterDeck(deckId) {
      seedAllCards(deckId, function (err) {
        if (err) {
          console.error("Seed cards/deck failed:", err.message);
          return con.end();
        }
        seedAllEffects(function (err) {
          if (err) {
            console.error("Seed effects failed:", err.message);
            return con.end();
          }
          runChecks(deckId);
        });
      });
    }

    if (deckRows.length === 0) {
      con.query(C_sdDeck, function (err, ins) {
        if (err) throw err;
        afterDeck(ins.insertId);
      });
    } else {
      afterDeck(deckRows[0].id);
    }
  });
});