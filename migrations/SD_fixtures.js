let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected !");

  // -------------------------
  // SMACKDOWN deck
  // -------------------------
  const checkSdDeck = "SELECT id FROM Decks WHERE name = 'SMACKDOWN' LIMIT 1";
  const C_sdDeck = "INSERT INTO Decks (name, Qtt, img) VALUES ('SMACKDOWN', 25, NULL)";

  // -------------------------
  // SMACKDOWN cards
  // -------------------------
  const sdCards = [
    { name: "Cody Rhodes", type: "superstar", dmg: 9, role: "main-event", effect: 0, animation: "pose", img: "cody.png", description: "Top star.", music: "cody.mp3", qtt: 1 },
    { name: "Randy Orton", type: "superstar", dmg: 9, role: "main-event", effect: 0, animation: "stare", img: "orton.png", description: "Legend killer.", music: "orton.mp3", qtt: 1 },
    { name: "AJ Styles", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "taunt", img: "ajstyles.png", description: "Phenomenal.", music: "ajstyles.mp3", qtt: 1 },
    { name: "Charlotte Flair", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "pose", img: "charlotte.png", description: "The Queen.", music: "charlotte.mp3", qtt: 1 },
    { name: "Bianca Belair", type: "superstar", dmg: 8, role: "main-event", effect: 0, animation: "pose", img: "bianca.png", description: "Power & speed.", music: "bianca.mp3", qtt: 1 },

    { name: "Kevin Owens", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "brawl", img: "ko.png", description: "Brawler.", music: "ko.mp3", qtt: 1 },
    { name: "Sami Zayn", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "hype", img: "sami.png", description: "Underdog.", music: "sami.mp3", qtt: 1 },
    { name: "Drew McIntyre", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "power", img: "drew.png", description: "Powerhouse.", music: "drew.mp3", qtt: 1 },
    { name: "Bobby Lashley", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "power", img: "lashley.png", description: "Dominant.", music: "lashley.mp3", qtt: 1 },
    { name: "Shinsuke Nakamura", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "shinsuke.png", description: "Striker.", music: "shinsuke.mp3", qtt: 1 },
    { name: "Finn Balor", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "balor.png", description: "Precision.", music: "balor.mp3", qtt: 1 },
    { name: "Asuka", type: "superstar", dmg: 7, role: "mid-card", effect: 0, animation: "taunt", img: "asuka.png", description: "Striker.", music: "asuka.mp3", qtt: 1 },
    { name: "Bayley", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "bayley.png", description: "Veteran.", music: "bayley.mp3", qtt: 1 },
    { name: "Solo Sikoa", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "stare", img: "solo.png", description: "Enforcer.", music: "solo.mp3", qtt: 1 },
    { name: "Karrion Kross", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "stare", img: "kross.png", description: "Intimidation.", music: "kross.mp3", qtt: 1 },
    { name: "Rey Fenix", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "highfly", img: "fenix.png", description: "High flyer.", music: "fenix.mp3", qtt: 1 },
    { name: "Iyo Sky", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "highfly", img: "iyo.png", description: "High flyer.", music: "iyo.mp3", qtt: 1 },
    { name: "Sasha Banks", type: "superstar", dmg: 6, role: "mid-card", effect: 0, animation: "taunt", img: "sasha.png", description: "The Boss.", music: "sasha.mp3", qtt: 1 },

    { name: "Ricochet", type: "superstar", dmg: 5, role: "opener", effect: 0, animation: "highfly", img: "ricochet.png", description: "Aerial.", music: "ricochet.mp3", qtt: 1 },
    { name: "Carmelo Hayes", type: "superstar", dmg: 5, role: "opener", effect: 0, animation: "taunt", img: "melo.png", description: "Fast.", music: "melo.mp3", qtt: 1 },

    { name: "Nick Aldis", type: "support", dmg: 0, role: "utility", effect: 0, animation: "order", img: "aldis.png", description: "GM control.", music: "aldis.mp3", qtt: 1 },
    { name: "SD Crowd", type: "support", dmg: 0, role: "utility", effect: 0, animation: "cheer", img: "crowd_sd.png", description: "Crowd boost.", music: "crowd_sd.mp3", qtt: 1 },

    { name: "Reversal SD", type: "special", dmg: 0, role: "utility", effect: 0, animation: "reverse", img: "reversal.png", description: "Cancel a play.", music: "sfx_reversal.mp3", qtt: 1 },
    { name: "Kendo Stick", type: "special", dmg: 0, role: "utility", effect: 0, animation: "kendo", img: "kendo.png", description: "Cheap shot.", music: "sfx_kendo.mp3", qtt: 1 },
    { name: "Interference", type: "special", dmg: 0, role: "utility", effect: 0, animation: "runin", img: "runin.png", description: "Chaos moment.", music: "sfx_rush.mp3", qtt: 1 }
  ];

  function dmgByRole(role) {
    if (role === "main-event") return 4;
    if (role === "mid-card") return 3;
    if (role === "opener") return 2;
    return 3;
  }

  const effectsToSeed = [
    { cardName: "Cody Rhodes", effectName: "Cross Rhodes (Cody Rhodes)", state: "damage_enemy;cond=if_enemy_has_main-event", target: "enemy" },
    { cardName: "Randy Orton", effectName: "RKO (Randy Orton)", state: "damage_enemy;cond=if_enemy_used_special", target: "enemy" },
    { cardName: "AJ Styles", effectName: "Styles Clash (AJ Styles)", state: "damage_enemy;cond=if_round_is_close", target: "enemy" },
    { cardName: "Charlotte Flair", effectName: "Figure Eight (Charlotte Flair)", state: "debuff_enemy;cond=if_enemy_has_mid-card", target: "enemy" },
    { cardName: "Bianca Belair", effectName: "KOD (Bianca Belair)", state: "damage_enemy;cond=if_enemy_has_more_cards_on_board", target: "enemy" },

    { cardName: "Kevin Owens", effectName: "Stunner (Kevin Owens)", state: "damage_enemy;cond=if_you_are_losing_round", target: "enemy" },
    { cardName: "Sami Zayn", effectName: "Helluva Kick (Sami Zayn)", state: "damage_enemy;cond=if_enemy_has_support", target: "enemy" },
    { cardName: "Drew McIntyre", effectName: "Claymore (Drew McIntyre)", state: "damage_enemy;cond=if_enemy_played_main-event", target: "enemy" },
    { cardName: "Bobby Lashley", effectName: "Hurt Lock (Bobby Lashley)", state: "debuff_enemy;cond=if_enemy_has_main-event", target: "enemy" },
    { cardName: "Shinsuke Nakamura", effectName: "Kinshasa (Shinsuke Nakamura)", state: "damage_enemy;cond=if_enemy_is_debuffed", target: "enemy" },

    { cardName: "Finn Balor", effectName: "Coup de Grace (Finn Balor)", state: "damage_enemy;cond=if_you_played_support_this_round", target: "enemy" },
    { cardName: "Asuka", effectName: "Asuka Lock (Asuka)", state: "debuff_enemy;cond=if_enemy_has_main-event", target: "enemy" },
    { cardName: "Bayley", effectName: "Rose Plant (Bayley)", state: "damage_enemy;cond=if_round_is_close", target: "enemy" },
    { cardName: "Solo Sikoa", effectName: "Samoan Spike (Solo Sikoa)", state: "damage_enemy;cond=if_enemy_used_special", target: "enemy" },
    { cardName: "Karrion Kross", effectName: "Kross Jacket (Karrion Kross)", state: "debuff_enemy;cond=if_enemy_has_mid-card", target: "enemy" },

    { cardName: "Rey Fenix", effectName: "Fenix Driver (Rey Fenix)", state: "damage_enemy;cond=if_enemy_has_opener", target: "enemy" },
    { cardName: "Iyo Sky", effectName: "Moonsault (Iyo Sky)", state: "damage_enemy;cond=if_enemy_has_opener", target: "enemy" },
    { cardName: "Sasha Banks", effectName: "Bank Statement (Sasha Banks)", state: "debuff_enemy;cond=if_enemy_has_more_points", target: "enemy" },

    { cardName: "Ricochet", effectName: "630 Splash (Ricochet)", state: "damage_enemy;cond=if_you_played_opener_this_round", target: "enemy" },
    { cardName: "Carmelo Hayes", effectName: "Nothing But Net (Carmelo Hayes)", state: "damage_enemy;cond=if_random_success", target: "enemy" },

    { cardName: "Reversal SD", effectName: "Reversal SD (Special)", state: "cancel_effect;cond=only_last_effect", target: "enemy", fixedDmg: 0 },
    { cardName: "Kendo Stick", effectName: "Kendo Stick (Special)", state: "damage_enemy;cond=if_enemy_has_superstar", target: "enemy", fixedDmg: 3 },
    { cardName: "Interference", effectName: "Interference (Special)", state: "damage_enemy;cond=if_you_are_losing_round", target: "enemy", fixedDmg: 2 }
  ];

  const qCheckCard = "SELECT id FROM cards WHERE name = ? LIMIT 1";
  const qInsertCard = "INSERT INTO cards (name,type,dmg,role,effect,animation,img,description,music) VALUES (?,?,?,?,?,?,?,?,?)";

  const qCheckDeckLink = "SELECT id FROM Decks_cards WHERE id_Deck = ? AND id_Card = ? LIMIT 1";
  const qInsertDeckLink = "INSERT INTO Decks_cards (id_Deck,id_Card,Qtt) VALUES (?,?,?)";
  const qUpdateDeckLink = "UPDATE Decks_cards SET Qtt = ? WHERE id = ?";

  const qGetCardRole = "SELECT id, role FROM cards WHERE name = ? LIMIT 1";
  const qGetEffect = "SELECT id FROM effect WHERE description = ? LIMIT 1";

  const qInsertEffect =
    "INSERT INTO effect (description,dgt,state,target,death,steal,can_generate,create_id,card_effect) VALUES (?,?,?,?,0,0,0,NULL,NULL)";

  const qCheckCardEffectLink = "SELECT id FROM cards_effect WHERE id_card = ? AND id_e = ? LIMIT 1";
  const qInsertCardEffectLink = "INSERT INTO cards_effect (id_card,id_e) VALUES (?,?)";

  const qSetCardHasEffect = "UPDATE cards SET effect = 1 WHERE id = ?";

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

      if(i>=sdCards.length) return cb(null)

      upsertOneCardInDeck(deckId,sdCards[i],function(err){

        i++
        next(err)

      })

    }

    next()

  }

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

  function runChecks(deckId){

    const qCountDeckCards = "SELECT COUNT(*) AS nb FROM Decks_cards WHERE id_Deck=?"

    const qMissingEffectLinks =
      "SELECT c.name FROM cards c LEFT JOIN cards_effect ce ON ce.id_card=c.id WHERE c.effect=1 AND ce.id IS NULL"

    con.query(qCountDeckCards,[deckId],function(err,rows){

      if(err){
        console.error("Check failed:",err.message)
        return con.end()
      }

      console.log("SMACKDOWN deck cards count =",rows[0].nb)

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

  con.query(checkSdDeck,function(err,deckRows){

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

      con.query(C_sdDeck,function(err,ins){

        if(err) throw err

        afterDeck(ins.insertId)

      })

    }

    else{

      afterDeck(deckRows[0].id)

    }

  })

})