async function fetchCardEffect(cardId) {
  const response = await fetch(`http://localhost:8081/cardsEffects/${cardId}`);
  const json = await response.json();

  if (!json.data || json.data.length === 0) {
    return null;
  }

  return json.data[0];
}

function applyDamage(enemyId, dmg, state) {
  state.players[enemyId].damageReceived += dmg;
  state.calculateScore(enemyId);
  state.addLog(
    `Player ${enemyId} took ${dmg} damage - new score: ${state.players[enemyId].score}`,
  );
}

function applyDebuff(enemyId, targetCardIndex, dmg, state) {
  const enemy = state.players[enemyId];
  const rows = ["boost", "hype", "inRing"];

  let allCards = [];
  rows.forEach((row) => {
    enemy.field[row].cards.forEach((card, index) => {
      allCards.push({ card, row, index });
    });
  });

  if (allCards.length === 0) {
    state.addLog(`No cards on enemy field to debuff`);
    return;
  }

  if (targetCardIndex < 0 || targetCardIndex >= allCards.length) {
    state.addLog(`Invalid debuff target index: ${targetCardIndex}`);
    return;
  }

  const target = allCards[targetCardIndex];
  target.card.dmg = Math.max(0, target.card.dmg - dmg);
  target.card.debuffed = true;

  state.addLog(
    `Player ${enemyId} card ${target.card.name} debuffed to ${target.card.dmg} dmg`,
  );

  state.calculateScore(enemyId);
  state.addLog(`Player ${enemyId} score updated: ${enemy.score}`);
}

function applyBoostSelf(card, playerId, dmg, state) {
  card.dmg += dmg;
  state.calculateScore(playerId);
  state.addLog(
    `Player ${playerId} card ${card.name} boosted to ${card.dmg} dmg`,
  );
}

function applyBoostAlly(playerId, dmg, state) {
  const player = state.players[playerId];
  const rows = ["boost", "hype", "inRing"];

  let allCards = [];
  rows.forEach((row) => {
    player.field[row].cards.forEach((card) => {
      allCards.push(card);
    });
  });

  if (allCards.length === 0) {
    state.addLog(`No ally cards on field to boost`);
    return;
  }

  allCards.forEach((card) => {
    card.dmg += dmg;
  });

  state.calculateScore(playerId);
  state.addLog(
    `Player ${playerId} all allies boosted by ${dmg} - new score: ${player.score}`,
  );
}

function spawnToken(playerId, row, state) {
  const token = {
    id: null,
    name: "Judgment Day Token",
    type: "token",
    dmg: 2,
    role: "token",
    effect: 0,
    img: "token.png",
  };

  state.players[playerId].field[row].cards.push(token);
  state.calculateScore(playerId);
  state.addLog(
    `Player ${playerId} spawned ${token.name} on ${row} - new score: ${state.players[playerId].score}`,
  );
}

export async function triggerOnPlayEffect(
  card,
  playerId,
  state,
  targetCardIndex = null,
  row = "inRing",
) {
  if (!card.effect) return;

  const effectData = await fetchCardEffect(card.id);
  if (!effectData) {
    state.addLog(`No effect data found for ${card.name}`);
    return;
  }

  if (effectData.effect_trigger !== "on_play") return;

  const enemyId = playerId === 1 ? 2 : 1;

  state.addLog(`${card.name} triggers: ${effectData.description}`);

  switch (effectData.state) {
    case "damage_enemy":
      applyDamage(enemyId, effectData.dmg, state);
      break;

    case "debuff_enemy":
      if (targetCardIndex === null) {
        state.addLog(`debuff_enemy requires a target - skipping`);
        return;
      }
      applyDebuff(enemyId, targetCardIndex, effectData.dmg, state);
      break;

    case "boost_self":
      applyBoostSelf(card, playerId, effectData.dmg, state);
      break;

    case "boost_ally":
      applyBoostAlly(playerId, effectData.dmg, state);
      break;

    case "spawn_token":
      spawnToken(playerId, row, state);
      break;

    default:
      state.addLog(`Unknown effect state: ${effectData.state}`);
  }
}

export async function triggerOnTurnStartEffects(playerId, state) {
  const player = state.players[playerId];
  const rows = ["boost", "hype", "inRing"];

  for (const row of rows) {
    for (const card of player.field[row].cards) {
      if (!card.effect) continue;

      const effectData = await fetchCardEffect(card.id);
      if (!effectData) continue;
      if (effectData.effect_trigger !== "on_turn_start") continue;

      state.addLog(
        `${card.name} triggers on turn start: ${effectData.description}`,
      );

      switch (effectData.state) {
        case "boost_self":
          applyBoostSelf(card, playerId, effectData.dmg, state);
          break;

        default:
          state.addLog(`Unknown on_turn_start effect: ${effectData.state}`);
      }
    }
  }
}
