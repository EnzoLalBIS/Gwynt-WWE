let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");

  // -------------------------
  // RAW deck
  // -------------------------
  const checkrawDeck = "SELECT id FROM decks WHERE name = 'RAW' LIMIT 1";
  const C_rawDeck = "INSERT INTO decks (name, Qtt, img) VALUES ('RAW', 25, NULL)";

  // -------------------------
  // 25 cartes RAW
  // -------------------------
  const rawCards = [
    { nom: "Roman Reigns", type: "superstar", dgt: 9, role: "main-event", effet: 0, animation: "pose", img: "roman.png", description: "Head of the Table.", music: "roman.mp3", qtt: 1 },
    { nom: "Gunther", type: "superstar", dgt: 9, role: "main-event", effet: 0, animation: "chop", img: "gunther.png", description: "Ring General.", music: "gunther.mp3", qtt: 1 },
    { nom: "CM Punk", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "pose", img: "cmpunk.png", description: "Best in the World.", music: "cmpunk.mp3", qtt: 1 },
    { nom: "Seth Rollins", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "taunt", img: "seth.png", description: "Visionary.", music: "seth.mp3", qtt: 1 },
    { nom: "Rhea Ripley", type: "superstar", dgt: 8, role: "main-event", effet: 0, animation: "stare", img: "rhea.png", description: "Mami.", music: "rhea.mp3", qtt: 1 },

    { nom: "Penta", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "penta.png", description: "Cero Miedo.", music: "penta.mp3", qtt: 1 },
    { nom: "Dominik Mysterio", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "dom.png", description: "Judgment Day.", music: "dom.mp3", qtt: 1 },
    { nom: "Rusev", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "power", img: "rusev.png", description: "Brutal powerhouse.", music: "rusev.mp3", qtt: 1 },
    { nom: "Sheamus", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "brawl", img: "sheamus.png", description: "Brawler.", music: "sheamus.mp3", qtt: 1 },
    { nom: "LA Knight", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "taunt", img: "laknight.png", description: "Yeah!", music: "laknight.mp3", qtt: 1 },
    { nom: "Rey Mysterio", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "springboard", img: "rey.png", description: "Legend.", music: "rey.mp3", qtt: 1 },
    { nom: "Jey Uso", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "yeet", img: "jey.png", description: "YEET.", music: "jey.mp3", qtt: 1 },
    { nom: "IYO SKY", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "highfly", img: "iyo.png", description: "Genius of the Sky.", music: "iyo.mp3", qtt: 1 },
    { nom: "Becky Lynch", type: "superstar", dgt: 7, role: "mid-card", effet: 0, animation: "taunt", img: "becky.png", description: "The Man.", music: "becky.mp3", qtt: 1 },
    { nom: "Liv Morgan", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "liv.png", description: "Unpredictable.", music: "liv.mp3", qtt: 1 },
    { nom: "Raquel Rodriguez", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "power", img: "raquel.png", description: "Power.", music: "raquel.mp3", qtt: 1 },
    { nom: "AJ Lee", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "ajlee.png", description: "Crazy & sharp.", music: "ajlee.mp3", qtt: 1 },
    { nom: "Logan Paul", type: "superstar", dgt: 6, role: "mid-card", effet: 0, animation: "taunt", img: "logan.png", description: "Showman.", music: "logan.mp3", qtt: 1 },

    { nom: "Chad Gable", type: "superstar", dgt: 5, role: "opener", effet: 0, animation: "grapple", img: "gable.png", description: "Technique.", music: "gable.mp3", qtt: 1 },
    { nom: "Dragon Lee", type: "superstar", dgt: 5, role: "opener", effet: 0, animation: "highfly", img: "dragonlee.png", description: "Speed.", music: "dragonlee.mp3", qtt: 1 },

    { nom: "Paul Heyman", type: "support", dgt: 0, role: "utility", effet: 0, animation: "talk", img: "heyman.png", description: "Manager boost.", music: "heyman.mp3", qtt: 1 },
    { nom: "Adam Pearce", type: "support", dgt: 0, role: "utility", effet: 0, animation: "order", img: "pearce.png", description: "GM control.", music: "pearce.mp3", qtt: 1 },

    { nom: "Reversal", type: "special", dgt: 0, role: "utility", effet: 0, animation: "reverse", img: "reversal.png", description: "Cancel a play.", music: "sfx_reversal.mp3", qtt: 1 },
    { nom: "Steel Chair", type: "special", dgt: 0, role: "utility", effet: 0, animation: "chair", img: "chair.png", description: "Cheap shot.", music: "sfx_chair.mp3", qtt: 1 },
    { nom: "Surprise Run-In", type: "special", dgt: 0, role: "utility", effet: 0, animation: "runin", img: "runin.png", description: "Chaos moment.", music: "sfx_rush.mp3", qtt: 1 },
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
    { cardNom: "Roman Reigns", effectName: "Spear (Roman Reigns)", state: "damage_enemy;cond=if_enemy_has_main-event", Target: "enemy" },
    { cardNom: "Gunther", effectName: "The Last Symphony (Gunther)", state: "damage_enemy;cond=if_enemy_played_special", Target: "enemy" },
    { cardNom: "CM Punk", effectName: "GTS (CM Punk)", state: "damage_enemy;cond=if_round_is_close", Target: "enemy" },
    { cardNom: "Seth Rollins", effectName: "Curb Stomp (Seth Rollins)", state: "damage_enemy;cond=if_you_played_support_this_round", Target: "enemy" },
    { cardNom: "Rhea Ripley", effectName: "Riptide (Rhea Ripley)", state: "damage_enemy;cond=if_enemy_has_more_cards_on_board", Target: "enemy" },

    { cardNom: "Penta", effectName: "Penta Driver (Penta)", state: "damage_enemy;cond=if_you_have_opener_on_board", Target: "enemy" },
    { cardNom: "Dominik Mysterio", effectName: "Frog Splash (Dominik Mysterio)", state: "damage_enemy;cond=if_enemy_has_support", Target: "enemy" },
    { cardNom: "Rusev", effectName: "Machka Kick (Rusev)", state: "damage_enemy;cond=if_enemy_is_debuffed", Target: "enemy" },
    { cardNom: "Sheamus", effectName: "Brogue Kick (Sheamus)", state: "damage_enemy;cond=if_enemy_played_main-event", Target: "enemy" },
    { cardNom: "LA Knight", effectName: "BFT (LA Knight)", state: "damage_enemy;cond=if_you_are_losing_round", Target: "enemy" },
    { cardNom: "Rey Mysterio", effectName: "619 (Rey Mysterio)", state: "damage_enemy;cond=if_enemy_has_mid-card", Target: "enemy" },
    { cardNom: "Jey Uso", effectName: "Samoan Splash (Jey Uso)", state: "damage_enemy;cond=if_you_played_two_superstars_this_round", Target: "enemy" },
    { cardNom: "IYO SKY", effectName: "Over the Moonsault (IYO SKY)", state: "damage_enemy;cond=if_enemy_has_opener", Target: "enemy" },
    { cardNom: "Becky Lynch", effectName: "Dis-arm-her (Becky Lynch)", state: "debuff_enemy;cond=if_enemy_has_main-event", Target: "enemy" },
    { cardNom: "Liv Morgan", effectName: "Oblivion (Liv Morgan)", state: "damage_enemy;cond=if_enemy_used_special", Target: "enemy" },
    { cardNom: "Raquel Rodriguez", effectName: "Tejana Bomb (Raquel Rodriguez)", state: "damage_enemy;cond=if_you_have_support_on_board", Target: "enemy" },
    { cardNom: "AJ Lee", effectName: "Black Widow (AJ Lee)", state: "debuff_enemy;cond=if_enemy_has_mid-card", Target: "enemy" },
    { cardNom: "Logan Paul", effectName: "Lucky Punch (Logan Paul)", state: "damage_enemy;cond=if_random_success", Target: "enemy" },

    { cardNom: "Chad Gable", effectName: "Ankle Lock (Chad Gable)", state: "debuff_enemy;cond=if_enemy_has_more_points", Target: "enemy" },
    { cardNom: "Dragon Lee", effectName: "Operation Dragon (Dragon Lee)", state: "damage_enemy;cond=if_you_played_opener_this_round", Target: "enemy" },

    { cardNom: "Reversal", effectName: "Reversal (Special)", state: "cancel_effect;cond=only_last_effect", Target: "enemy", fixedDgt: 0 },
    { cardNom: "Steel Chair", effectName: "Steel Chair (Special)", state: "damage_enemy;cond=if_enemy_has_superstar", Target: "enemy", fixedDgt: 3 },
    { cardNom: "Surprise Run-In", effectName: "Surprise Run-In (Special)", state: "damage_enemy;cond=if_you_are_losing_round", Target: "enemy", fixedDgt: 2 },
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
      if (i >= rawCards.length) return cb(null);
      upsertOneCardInDeck(deckId, rawCards[i], function (err) {
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

      if (cardRows.length === 0) {
        // carte inexistante -> skip
        return cb(null);
      }

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
      console.log("RAW deck cards count =", rows[0].nb);

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
  con.query(checkrawDeck, function (err, deckRows) {
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
      con.query(C_rawDeck, function (err, ins) {
        if (err) throw err;
        afterDeck(ins.insertId);
      });
    } else {
      afterDeck(deckRows[0].id);
    }
  });
});