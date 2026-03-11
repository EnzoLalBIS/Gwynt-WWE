let mysql = require("mysql");
let config = require("../config");

let con = mysql.createConnection(config.db);

con.connect(function (err) {

  if (err) throw err;
  console.log("Connected!");

  // -------------------------
  // SMACKDOWN deck
  // -------------------------

  const checkDeck =
    "SELECT id FROM Decks WHERE name='SMACKDOWN' LIMIT 1";

  const createDeck =
    "INSERT INTO Decks (name,Qtt,img) VALUES ('SMACKDOWN',25,NULL)";

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
  // SMACKDOWN cards
  // -------------------------

  const smackCards = [

{ name:"Bianca Belair",type:"superstar",dmg:14,role:"finisher",effect:0,animation:"pose",img:"bianca.png",description:"EST of WWE.",music:"bianca.mp3",qtt:1 },

{ name:"Bobby Lashley",type:"superstar",dmg:14,role:"finisher",effect:0,animation:"power",img:"lashley.png",description:"The All Mighty.",music:"lashley.mp3",qtt:1 },

{ name:"LA Knight",type:"superstar",dmg:9,role:"value",effect:0,animation:"taunt",img:"laknight.png",description:"YEAH!",music:"laknight.mp3",qtt:1 },

{ name:"Charlotte Flair",type:"superstar",dmg:8,role:"engine",effect:0,animation:"pose",img:"charlotte.png",description:"The Queen.",music:"charlotte.mp3",qtt:1 },

{ name:"Rey Mysterio",type:"superstar",dmg:7,role:"value",effect:0,animation:"springboard",img:"rey.png",description:"Legend.",music:"rey.mp3",qtt:2 },

{ name:"Santos Escobar",type:"superstar",dmg:6,role:"engine",effect:0,animation:"pose",img:"escobar.png",description:"LWO leader.",music:"escobar.mp3",qtt:2 },

{ name:"Dragon Lee",type:"superstar",dmg:5,role:"control",effect:0,animation:"highfly",img:"dragonlee.png",description:"Lucha prodigy.",music:"dragonlee.mp3",qtt:2 },

{ name:"Austin Theory",type:"superstar",dmg:5,role:"setup",effect:0,animation:"pose",img:"theory.png",description:"The Now.",music:"theory.mp3",qtt:2 },

{ name:"Grayson Waller",type:"superstar",dmg:5,role:"value",effect:0,animation:"taunt",img:"waller.png",description:"Grayson Waller Effect.",music:"waller.mp3",qtt:2 },

{ name:"Sheamus",type:"superstar",dmg:4,role:"control",effect:0,animation:"brawl",img:"sheamus.png",description:"Celtic Warrior.",music:"sheamus.mp3",qtt:2 },

{ name:"Ridge Holland",type:"superstar",dmg:4,role:"value",effect:0,animation:"power",img:"ridge.png",description:"Heavy hitter.",music:"ridge.mp3",qtt:2 },

{ name:"Butch",type:"superstar",dmg:4,role:"control",effect:0,animation:"rage",img:"butch.png",description:"Wild striker.",music:"butch.mp3",qtt:2 },

{ name:"Shotzi",type:"superstar",dmg:4,role:"engine",effect:0,animation:"taunt",img:"shotzi.png",description:"Ballsy.",music:"shotzi.mp3",qtt:2 },

{ name:"Iyo Sky",type:"superstar",dmg:4,role:"engine",effect:0,animation:"highfly",img:"iyo.png",description:"Genius of the Sky.",music:"iyo.mp3",qtt:2 },

{ name:"Damage CTRL",type:"support",dmg:4,role:"setup",effect:0,animation:"pose",img:"damagectrl.png",description:"Faction control.",music:"damagectrl.mp3",qtt:1 },

{ name:"SmackDown GM",type:"support",dmg:0,role:"tutor",effect:0,animation:"order",img:"gm.png",description:"Show authority.",music:"gm.mp3",qtt:1 },

{ name:"Tag Team Match",type:"special",dmg:0,role:"removal",effect:0,animation:"tag",img:"tag.png",description:"Tag team chaos.",music:"tag.mp3",qtt:1 },

{ name:"SmackDown Live",type:"artifact",dmg:0,role:"setup",effect:0,animation:"arena",img:"sd.png",description:"Friday Night SmackDown.",music:"sd.mp3",qtt:1 }

  ];

  // -------------------------
  // Effects
  // -------------------------

  const effects = [

{ card:"Bianca Belair",desc:"KOD",dgt:5,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Bobby Lashley",desc:"Spear",dgt:4,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"LA Knight",desc:"BFT",dgt:3,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Charlotte Flair",desc:"Figure Eight",dgt:2,state:"debuff_enemy",target:"enemy",trigger:"on_play" },

{ card:"Rey Mysterio",desc:"619",dgt:2,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Dragon Lee",desc:"Flying Kick",dgt:2,state:"damage_enemy",target:"enemy",trigger:"on_play" },

{ card:"Iyo Sky",desc:"Moonsault",dgt:2,state:"damage_enemy",target:"enemy",trigger:"on_play" }

  ];

  // -------------------------
  // Seed logic
  // -------------------------

  function seed(deckId){

    smackCards.forEach(card=>{

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

  con.query(checkDeck,function(err,res){

    if(err) throw err;

    if(res.length === 0){

      con.query(createDeck,function(err,deckRes){

        if(err) throw err;

        seed(deckRes.insertId);

      });

    } else {

      seed(res[0].id);

    }

  });

});