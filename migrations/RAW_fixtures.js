let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");

  // -------------------------
  // RAW deck
  // -------------------------
  const checkRawDeck = "SELECT id FROM Decks WHERE name = 'RAW' LIMIT 1";
  const C_rawDeck = "INSERT INTO Decks (name, Qtt, img) VALUES ('RAW', 25, NULL)";

  // -------------------------
  // RAW cards
  // -------------------------
  const rawCards = [
    { name: "Roman Reigns", type: "superstar", dmg: 9, role: "main-event", effect: 0, animation: "pose", img: "roman.png", description: "Head of the Table.", music: "roman.mp3", qtt: 1 },
    { name: "Gunther", type: "superstar", dmg: 9, role: "main-event", effect: 0, animation: "chop", img: "gunther.png", description: "Ring General.", music: "gunther.mp3", qtt: 1 },
    { name: "CM Punk", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "pose", img: "cmpunk.png", description: "Best in the World.", music: "cmpunk.mp3", qtt: 1 },
    { name: "Seth Rollins", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "taunt", img: "seth.png", description: "Visionary.", music: "seth.mp3", qtt: 1 },
    { name: "Rhea Ripley", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "stare", img: "rhea.png", description: "Mami.", music: "rhea.mp3", qtt: 1 },

    { name: "Penta", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "penta.png", description: "Cero Miedo.", music: "penta.mp3", qtt: 1 },
    { name: "Dominik Mysterio", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "dom.png", description: "Judgment Day.", music: "dom.mp3", qtt: 1 },
    { name: "Rusev", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "power", img: "rusev.png", description: "Brutal powerhouse.", music: "rusev.mp3", qtt: 1 },
    { name: "Sheamus", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "brawl", img: "sheamus.png", description: "Brawler.", music: "sheamus.mp3", qtt: 1 },
    { name: "LA Knight", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "taunt", img: "laknight.png", description: "Yeah!", music: "laknight.mp3", qtt: 1 },

    { name: "Rey Mysterio", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "springboard", img: "rey.png", description: "Legend.", music: "rey.mp3", qtt: 1 },
    { name: "Jey Uso", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "yeet", img: "jey.png", description: "YEET.", music: "jey.mp3", qtt: 1 },
    { name: "IYO SKY", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "highfly", img: "iyo.png", description: "Genius of the Sky.", music: "iyo.mp3", qtt: 1 },
    { name: "Becky Lynch", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "taunt", img: "becky.png", description: "The Man.", music: "becky.mp3", qtt: 1 },
    { name: "Liv Morgan", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "liv.png", description: "Unpredictable.", music: "liv.mp3", qtt: 1 },

    { name: "Raquel Rodriguez", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "power", img: "raquel.png", description: "Power.", music: "raquel.mp3", qtt: 1 },
    { name: "AJ Lee", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "ajlee.png", description: "Crazy & sharp.", music: "ajlee.mp3", qtt: 1 },
    { name: "Logan Paul", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "logan.png", description: "Showman.", music: "logan.mp3", qtt: 1 },

    { name: "Chad Gable", type: "superstar", dmg: 5, role: "opener", effect: 0, animation: "grapple", img: "gable.png", description: "Technique.", music: "gable.mp3", qtt: 1 },
    { name: "Dragon Lee", type: "superstar", dmg: 5, role: "opener", effect: 0, animation: "highfly", img: "dragonlee.png", description: "Speed.", music: "dragonlee.mp3", qtt: 1 },

    { name: "Paul Heyman", type: "support", dmg: 0, role: "utility", effect: 0, animation: "talk", img: "heyman.png", description: "Manager boost.", music: "heyman.mp3", qtt: 1 },
    { name: "Adam Pearce", type: "support", dmg: 0, role: "utility", effect: 0, animation: "order", img: "pearce.png", description: "GM control.", music: "pearce.mp3", qtt: 1 },

    { name: "Reversal", type: "special", dmg: 0, role: "utility", effect: 0, animation: "reverse", img: "reversal.png", description: "Cancel a play.", music: "sfx_reversal.mp3", qtt: 1 },
    { name: "Steel Chair", type: "special", dmg: 0, role: "utility", effect: 0, animation: "chair", img: "chair.png", description: "Cheap shot.", music: "sfx_chair.mp3", qtt: 1 },
    { name: "Surprise Run-In", type: "special", dmg: 0, role: "utility", effect: 0, animation: "runin", img: "runin.png", description: "Chaos moment.", music: "sfx_rush.mp3", qtt: 1 }
  ];

  // -------------------------
  // Effect logic
  // -------------------------
  function dmgByRole(role) {
    if (role === "main-event") return 4;
    if (role === "mid-card") return 3;
    if (role === "opener") return 2;
    return 3;
  }

  const effectsToSeed = [
    { cardName: "Roman Reigns", effectName: "Spear (Roman Reigns)", state: "damage_enemy;cond=if_enemy_has_main-event", target: "enemy" },
    { cardName: "Gunther", effectName: "The Last Symphony (Gunther)", state: "damage_enemy;cond=if_enemy_played_special", target: "enemy" },
    { cardName: "CM Punk", effectName: "GTS (CM Punk)", state: "damage_enemy;cond=if_round_is_close", target: "enemy" },
    { cardName: "Seth Rollins", effectName: "Curb Stomp (Seth Rollins)", state: "damage_enemy;cond=if_you_played_support_this_round", target: "enemy" },
    { cardName: "Rhea Ripley", effectName: "Riptide (Rhea Ripley)", state: "damage_enemy;cond=if_enemy_has_more_cards_on_board", target: "enemy" },

    { cardName: "Penta", effectName: "Penta Driver (Penta)", state: "damage_enemy;cond=if_you_have_opener_on_board", target: "enemy" },
    { cardName: "Dominik Mysterio", effectName: "Frog Splash (Dominik Mysterio)", state: "damage_enemy;cond=if_enemy_has_support", target: "enemy" },
    { cardName: "Rusev", effectName: "Machka Kick (Rusev)", state: "damage_enemy;cond=if_enemy_is_debuffed", target: "enemy" },
    { cardName: "Sheamus", effectName: "Brogue Kick (Sheamus)", state: "damage_enemy;cond=if_enemy_played_main-event", target: "enemy" },
    { cardName: "LA Knight", effectName: "BFT (LA Knight)", state: "damage_enemy;cond=if_you_are_losing_round", target: "enemy" },

    { cardName: "Rey Mysterio", effectName: "619 (Rey Mysterio)", state: "damage_enemy;cond=if_enemy_has_mid-card", target: "enemy" },
    { cardName: "Jey Uso", effectName: "Samoan Splash (Jey Uso)", state: "damage_enemy;cond=if_you_played_two_superstars_this_round", target: "enemy" },
    { cardName: "IYO SKY", effectName: "Over the Moonsault (IYO SKY)", state: "damage_enemy;cond=if_enemy_has_opener", target: "enemy" },
    { cardName: "Becky Lynch", effectName: "Dis-arm-her (Becky Lynch)", state: "debuff_enemy;cond=if_enemy_has_main-event", target: "enemy" },
    { cardName: "Liv Morgan", effectName: "Oblivion (Liv Morgan)", state: "damage_enemy;cond=if_enemy_used_special", target: "enemy" },

    { cardName: "Raquel Rodriguez", effectName: "Tejana Bomb (Raquel Rodriguez)", state: "damage_enemy;cond=if_you_have_support_on_board", target: "enemy" },
    { cardName: "AJ Lee", effectName: "Black Widow (AJ Lee)", state: "debuff_enemy;cond=if_enemy_has_mid-card", target: "enemy" },
    { cardName: "Logan Paul", effectName: "Lucky Punch (Logan Paul)", state: "damage_enemy;cond=if_random_success", target: "enemy" },

    { cardName: "Chad Gable", effectName: "Ankle Lock (Chad Gable)", state: "debuff_enemy;cond=if_enemy_has_more_points", target: "enemy" },
    { cardName: "Dragon Lee", effectName: "Operation Dragon (Dragon Lee)", state: "damage_enemy;cond=if_you_played_opener_this_round", target: "enemy" },

    { cardName: "Reversal", effectName: "Reversal (Special)", state: "cancel_effect;cond=only_last_effect", target: "enemy", fixedDmg: 0 },
    { cardName: "Steel Chair", effectName: "Steel Chair (Special)", state: "damage_enemy;cond=if_enemy_has_superstar", target: "enemy", fixedDmg: 3 },
    { cardName: "Surprise Run-In", effectName: "Surprise Run-In (Special)", state: "damage_enemy;cond=if_you_are_losing_round", target: "enemy", fixedDmg: 2 }
  ];

  // -------------------------
  // SQL queries
  // -------------------------
  const qCheckCard = "SELECT id FROM cards WHERE name = ? LIMIT 1";
  const qInsertCard = "INSERT INTO cards (name,type,dmg,role,effect,animation,img,description,music) VALUES (?,?,?,?,?,?,?,?,?)";

  const qCheckDeckLink = "SELECT id FROM Decks_cards WHERE id_Deck=? AND id_Card=? LIMIT 1";
  const qInsertDeckLink = "INSERT INTO Decks_cards (id_Deck,id_Card,Qtt) VALUES (?,?,?)";
  const qUpdateDeckLink = "UPDATE Decks_cards SET Qtt=? WHERE id=?";

  const qGetCardRole = "SELECT id,role FROM cards WHERE name=? LIMIT 1";
  const qGetEffect = "SELECT id FROM effect WHERE description=? LIMIT 1";

  const qInsertEffect =
    "INSERT INTO effect (description,dgt,state,target,death,steal,can_generate,create_id,card_effect) VALUES (?,?,?,?,0,0,0,NULL,NULL)";

  const qCheckCardEffectLink = "SELECT id FROM cards_effect WHERE id_card=? AND id_e=? LIMIT 1";
  const qInsertCardEffectLink = "INSERT INTO cards_effect (id_card,id_e) VALUES (?,?)";

  const qSetCardHasEffect = "UPDATE cards SET effect=1 WHERE id=?";

  // -------------------------
  // Card insert
  // -------------------------
  function upsertOneCardInDeck(deckId, card, cb) {

    con.query(qCheckCard,[card.name],function(err,rows){

      if(err) return cb(err)

      function link(cardId){

        con.query(qCheckDeckLink,[deckId,cardId],function(err,linkRows){

          if(err) return cb(err)

          if(linkRows.length===0){

            con.query(qInsertDeckLink,[deckId,cardId,card.qtt],cb)

          }
          else{

            con.query(qUpdateDeckLink,[card.qtt,linkRows[0].id],cb)

          }

        })

      }

      if(rows.length===0){

        con.query(qInsertCard,[

          card.name,
          card.type,
          card.dmg,
          card.role,
          card.effect,
          card.animation,
          card.img,
          card.description,
          card.music

        ],function(err,ins){

          if(err) return cb(err)

          link(ins.insertId)

        })

      }

      else{

        link(rows[0].id)

      }

    })

  }

  function seedAllCards(deckId,cb){

    let i=0

    function next(err){

      if(err) return cb(err)

      if(i>=rawCards.length) return cb(null)

      upsertOneCardInDeck(deckId,rawCards[i],function(err){

        i++
        next(err)

      })

    }

    next()

  }

  // -------------------------
  // Effect seed
  // -------------------------
  function seedOneEffect(item,cb){

    con.query(qGetCardRole,[item.cardName],function(err,cardRows){

      if(err) return cb(err)

      if(cardRows.length===0) return cb(null)

      const cardId = cardRows[0].id
      const role = cardRows[0].role

      const dmg = typeof item.fixedDmg==="number" ? item.fixedDmg : dmgByRole(role)

      con.query(qGetEffect,[item.effectName],function(err,effRows){

        if(err) return cb(err)

        function link(effectId){

          con.query(qCheckCardEffectLink,[cardId,effectId],function(err,linkRows){

            if(err) return cb(err)

            function finalize(){

              con.query(qSetCardHasEffect,[cardId],cb)

            }

            if(linkRows.length===0){

              con.query(qInsertCardEffectLink,[cardId,effectId],function(err){

                if(err) return cb(err)

                finalize()

              })

            }

            else{

              finalize()

            }

          })

        }

        if(effRows.length===0){

          con.query(qInsertEffect,[

            item.effectName,
            dmg,
            item.state,
            item.target || "enemy"

          ],function(err,ins){

            if(err) return cb(err)

            link(ins.insertId)

          })

        }

        else{

          link(effRows[0].id)

        }

      })

    })

  }

  function seedAllEffects(cb){

    let i=0

    function next(err){

      if(err) return cb(err)

      if(i>=effectsToSeed.length) return cb(null)

      seedOneEffect(effectsToSeed[i],function(err){

        i++
        next(err)

      })

    }

    next()

  }

  // -------------------------
  // Checks
  // -------------------------
  function runChecks(deckId){

    const qCountDeckCards = "SELECT COUNT(*) AS nb FROM Decks_cards WHERE id_Deck=?"

    const qMissingEffectLinks =
      "SELECT c.name FROM cards c LEFT JOIN cards_effect ce ON ce.id_card=c.id WHERE c.effect=1 AND ce.id IS NULL"

    con.query(qCountDeckCards,[deckId],function(err,rows){

      if(err){
        console.error("Check failed:",err.message)
        return con.end()
      }

      console.log("RAW deck cards count =",rows[0].nb)

      con.query(qMissingEffectLinks,function(err,miss){

        if(err){
          console.error("Check failed:",err.message)
          return con.end()
        }

        console.log("Cards marked effect=1 but missing cards_effect links =",miss.length)

        con.end()

      })

    })

  }

  // -------------------------
  // FLOW
  // -------------------------
  con.query(checkRawDeck,function(err,deckRows){

    if(err) throw err

    function afterDeck(deckId){

      seedAllCards(deckId,function(err){

        if(err){
          console.error("Seed cards/deck failed:",err.message)
          return con.end()
        }

        seedAllEffects(function(err){

          if(err){
            console.error("Seed effects failed:",err.message)
            return con.end()
          }

          runChecks(deckId)

        })

      })

    }

    if(deckRows.length===0){

      con.query(C_rawDeck,function(err,ins){

        if(err) throw err

        afterDeck(ins.insertId)

      })

    }

    else{

      afterDeck(deckRows[0].id)

    }

  })

})