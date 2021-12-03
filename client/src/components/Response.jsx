import React from "react";
import { usePlayer, useRound, useStage } from "@empirica/player";
import { Slider } from "./Slider";
import { Button } from "./base/Button";
import { scoreColor } from "./Outcome";

export function Response() {
  const player = usePlayer();
  const stage = useStage();
  const round = useRound();

  function handleChange(e) {
    player.round.set("guess", e.target.valueAsNumber);
  }

  const path = round.get("task").difficultyPath[round.get("difficulty")];

  const isOutcome = stage.get("name") === "Round Outcome";
  // const isOutcome = false;

  let outcome;
  if (isOutcome) {
    const color = scoreColor(player.round.get("score"));
    outcome = (
      <div className="grid grid-cols-3 text-center pb-5">
        <div className="text-gray-400">Your guess</div>
        <div className="text-gray-400">Actual correlation</div>
        <div className="text-gray-400">Score Increment</div>
        <div className="text-gray-600 text-4xl font-semi-bold leading-none">
          {player.round.get("guess")}
        </div>
        <div className="text-gray-600 text-4xl font-semi-bold leading-none">
          {round.get("task").correctAnswer}
        </div>
        <div className="text-gray-600 text-4xl font-semi-bold leading-none">
          <div className={color}>+{player.round.get("score")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center">
        <div className="w-136 px-4">
          <img
            src={path}
            alt="..."
            className="pr-9 rounded max-w-full h-auto align-middle border-none"
          />
        </div>
      </div>

      {isOutcome ? (
        outcome
      ) : (
        <div className="pt-4 text-gray-600">
          You current guess of the correlation is:
        </div>
      )}

      <Slider
        min={0}
        max={1}
        stepSize={0.01}
        value={player.round.get("guess")}
        onChange={handleChange}
        disabled={isOutcome || player.stage.get("submit")}
      />

      <div className="w-128 h-20">
        <Submit />
      </div>
    </div>
  );
}

function Submit() {
  const player = usePlayer();

  if (player.stage.get("submit")) {
    return (
      <div className="text-center text-gray-400">
        Please wait for the other players.
      </div>
    );
  }

  const guess = player.round.get("guess");

  function handleSubmit() {
    if (guess === null) {
      alert("You must first make a guess");
      return;
    }

    player.stage.set("submit", true);
  }

  return (
    <Button full handleClick={handleSubmit} primary>
      Submit
    </Button>
  );
}
