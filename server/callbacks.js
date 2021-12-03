import { Callbacks } from "@empirica/admin";
import { shuffle } from "./advanced/utils.js";
import { taskData } from "./constants.js";

const Empirica = new Callbacks();

Empirica.onGameStart(function ({ game }) {
  console.log("game start");

  const treatment = game.get("treatment");

  for (let i = 0; i < 20; i++) {
    const round = game.addRound({
      name: `Round ${i + 1}`,
      task: taskData[i],
      difficulty: "medium",
    });

    round.addStage({ name: "Response", duration: 20_0000 });

    if (game.players.length > 1) {
      round.addStage({ name: "Interactive Response", duration: 10_0000 });
      round.addStage({ name: "Round Outcome", duration: 20_0000 });
    }
  }

  for (const player of game.players) {
    player.set("score", 0);

    if (treatment.alters) {
      const ids = game.players
        .map((p) => p.id)
        .filter((id) => id !== player.id);
      const alterIDs = shuffle(ids).slice(0, treatment.alters);
      player.set("alterIDs", alterIDs);
    }
  }

  console.log("game start done");
});

Empirica.onRoundStart(function ({ round }) {
  for (const player of round.game.players) {
    player.round.set("alterIds", player.get("alterIds"));
    player.round.set("guess", null);
  }
  console.log("round start");
});

Empirica.onStageStart(function ({ stage }) {
  console.log("stage start");
});

Empirica.onStageEnd(function ({ stage }) {
  if (stage.get("name") === "Round Outcome") {
    return;
  }

  if (stage.get("name") === "Reponse") {
    for (const player of stage.round.game.players) {
      player.round.set("initialGuess", player.round.get("guess"));
    }
  }

  computeScore(stage.round);
});

Empirica.onRoundEnd(function ({ round }) {
  for (const player of round.game.players) {
    const currentScore = player.get("score");
    const roundScore = player.round.get("score");
    const cumScore = Math.round((currentScore + roundScore) * 10) / 10;
    player.set("score", cumScore);
  }
});

Empirica.onGameEnd(function ({ game }) {
  console.log("game end");
});

export default Empirica;

// These are just some helper functions for the Guess the Correlation Game
// compute score.
function computeScore(round) {
  const correctAnswer = round.get("task").correctAnswer;

  for (const player of round.game.players) {
    const guess = player.round.get("guess");
    // If no guess given, score is 0
    const error =
      guess === undefined || guess === null
        ? 1
        : Math.abs(correctAnswer - guess);

    const score = Math.round((1 - error) * 10) / 10;

    player.round.set("score", score);
  }
}
