let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {

  if (err) throw err;
  console.log("Connected!");

  // -------------------------
  // RAW deck
  // -------------------------

  const checkRawDeck =
    "SELECT id FROM Decks WHERE name='RAW' LIMIT 1";

  const createRawDeck =
    "INSERT INTO Decks (name,Qtt,img) VALUES ('RAW',25,NULL)";

  // -------------------------
  // SQL queries
  // -------------------------

  const qCheckCard =
    "SELECT id FROM cards WHERE name=? LIMIT 1";

  const qInsertCard =
    "INSERT INTO cards (name,type,dmg,role,effect,animation,img,description,music) VALUES (?,?,?,?,?,?,?,?,?)";

  const qInsertDeckCard =
    "INSERT INTO Decks_cards (id_Deck,id_Card,Qtt) VALUES (?,?,?)";

  const qInsertEffect =
    "INSERT INTO effect (description,dgt,state,target,effect_trigger,death,steal,can_generate,create_id,card_effect) VALUES (?,?,?,?,?,0,0,0,NULL,NULL)";

  const qInsertCardEffect =
    "INSERT INTO cards_effect (id_card,id_e) VALUES (?,?)";

  const qUpdateCardEffect =
    "UPDATE cards SET effect=1 WHERE id=?";

  // -------------------------
  // RAW cards
  // -------------------------

  const rawCards = [

{ name:"Roman Reigns",type:"superstar",dmg:12,role:"finisher",effect:0,animation:"pose",img:"roman.png",description:"Head of the Table.",music:"roman.mp3",qtt:1 },

{ name:"Seth Rollins",type:"superstar",dmg:11,role:"value",effect:0,animation:"taunt",img:"seth.png",description:"Visionary.",music:"seth.mp3",qtt:1 },

{ name:"Brock Lesnar",type:"superstar",dmg:8,role:"finisher",effect:0,animation:"power",img:"brock.png",description:"The Beast.",music:"brock.mp3",qtt:1 },

{ name:"Rhea Ripley",type:"superstar",dmg:7,role:"spawn",effect:0,animation:"stare",img:"rhea.png",description:"Mami.",music:"rhea.mp3",qtt:1 },

{ name:"Cody Rhodes",type:"superstar",dmg:7,role:"engine",effect:0,animation:"pose",img:"cody.png",description:"American Nightmare.",music:"cody.mp3",qtt:1 },

{ name:"AJ Styles",type:"superstar",dmg:7,role:"support",effect:0,animation:"taunt",img:"aj.png",description:"Phenomenal.",music:"aj.mp3",qtt:1 },

{ name:"Gunther",type:"superstar",dmg:7,role:"setup",effect:0,animation:"chop",img:"gunther.png",description:"Ring General.",music:"gunther.mp3",qtt:1 },

{ name:"The Usos",type:"superstar",dmg:5,role:"consume",effect:0,animation:"yeet",img:"usos.png",description:"Tag Team.",music:"usos.mp3",qtt:2 },

{ name:"Kevin Owens",type:"superstar",dmg:5,role:"engine",effect:0,animation:"brawl",img:"owens.png",description:"Fight anyone.",music:"owens.mp3",qtt:2 },

{ name:"Solo Sikoa",type:"superstar",dmg:5,role:"scaling",effect:0,animation:"power",img:"solo.png",description:"The Enforcer.",music:"solo.mp3",qtt:2 },

{ name:"Sami Zayn",type:"superstar",dmg:5,role:"support",effect:0,animation:"taunt",img:"sami.png",description:"Underdog hero.",music:"sami.mp3",qtt:2 },

{ name:"Dominik Mysterio",type:"superstar",dmg:5,role:"resurrection",effect:0,animation:"taunt",img:"dom.png",description:"Judgment Day.",music:"dom.mp3",qtt:2 },

{ name:"Street Profits",type:"superstar",dmg:4,role:"consume",effect:0,animation:"taunt",img:"profits.png",description:"High Energy.",music:"profits.mp3",qtt:2 },

{ name:"Chad Gable",type:"superstar",dmg:4,role:"control",effect:0,animation:"grapple",img:"gable.png",description:"Technician.",music:"gable.mp3",qtt:2 },

{ name:"Adam Pearce",type:"support",dmg:0,role:"tutor",effect:0,animation:"order",img:"pearce.png",description:"RAW GM.",music:"pearce.mp3",qtt:1 },

{ name:"JDay Interference",type:"special",dmg:0,role:"removal",effect:0,animation:"runin",img:"jd.png",description:"Run In.",music:"jd.mp3",qtt:1 },

{ name:"Crowd Pop",type:"special",dmg:0,role:"boost",effect:0,animation:"crowd",img:"crowd.png",description:"Huge reaction.",music:"crowd.mp3",qtt:1 },

{ name:"RAW Show",type:"artifact",dmg:0,role:"setup",effect:0,animation:"arena",img:"raw.png",description:"Monday Night RAW.",music:"raw.mp3",qtt:1 }

  ];

  // -------------------------
  // Effects
  // -------------------------

  const effects = [

{ card:"Roman Reigns",desc:"Spear",dgt:5,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Seth Rollins",desc:"Curb Stomp",dgt:4,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Brock Lesnar",desc:"F5",dgt:5,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Rhea Ripley",desc:"Judgment Backup",dgt:0,state:"spawn_token",target:"ally",trigger:"on_play" },

{ card:"Cody Rhodes",desc:"American Comeback",dgt:2,state:"boost_self",target:"self",trigger:"on_turn_start" },

{ card:"AJ Styles",desc:"Phenomenal Assist",dgt:2,state:"boost_ally",target:"ally",trigger:"on_play" },

{ card:"Gunther",desc:"Ring General",dgt:1,state:"boost_self",target:"self",trigger:"on_turn_start" }

  ];

  // -------------------------
  // Seed logic
  // -------------------------

  function seed(deckId){

    rawCards.forEach(card=>{

      con.query(qCheckCard,[card.name],function(err,res){

        if(err) throw err;

        if(res.length === 0){

          con.query(qInsertCard,
            [card.name,card.type,card.dmg,card.role,card.effect,card.animation,card.img,card.description,card.music],
            function(err,cardRes){

              if(err) throw err;

              processCard(deckId,cardRes.insertId,card);

            });

        } else {

          processCard(deckId,res[0].id,card);

        }

      });

    });

  }

  function processCard(deckId,cardId,card){

    con.query(qInsertDeckCard,[deckId,cardId,card.qtt]);

    effects.forEach(e=>{

      if(e.card === card.name){

        con.query(qInsertEffect,
          [e.desc,e.dgt,e.state,e.target,e.trigger],
          function(err,eRes){

            if(err) throw err;

            con.query(qInsertCardEffect,[cardId,eRes.insertId]);

            con.query(qUpdateCardEffect,[cardId]);

          });

      }

    });

  }

  // -------------------------
  // Start script
  // -------------------------

  con.query(checkRawDeck,function(err,res){

    if(err) throw err;

    if(res.length === 0){

      con.query(createRawDeck,function(err,deckRes){

        if(err) throw err;

        seed(deckRes.insertId);

      });

    } else {

      seed(res[0].id);

    }

  });

});