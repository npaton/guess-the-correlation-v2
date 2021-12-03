import React from "react";
import {
  useGame,
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/player";
import { Slider } from "./Slider";
import { Avatar } from "./base/Avatar";
import { Button } from "./base/Button";

export function Outcome() {
  const game = useGame();
  const player = usePlayer();
  const alterIDs = player.get("alterIDs");
  const players = usePlayers();
  const alters = players.filter((p) => alterIDs.includes(p.id));
  const others = players.filter(
    (p) => !alterIDs.includes(p.id) && player.id !== p.id
  );

  if (alters.length === 0 && others.length === 0) {
    return <></>;
  }

  function remove(p) {
    player.set(
      "alterIDs",
      alterIDs.filter((id) => id !== p.id)
    );
    console.log(
      player.id,
      alterIDs,
      alterIDs.filter((id) => id !== p.id)
    );
  }

  function add(p) {
    const alters = game.get("treatment").alters;
    if (alterIDs.length >= alters) {
      alert(`You can add up to ${alters} players`);
      return;
    }

    player.set("alterIDs", [...alterIDs, p.id]);
  }

  return (
    <div className="px-12 space-y-8 divide-y rounded text-center">
      <div className="space-y-8">
        <h1 className="text-lg text-gray-500 font-medium">You are following</h1>
        <div className="grid grid-cols-3 items-center justify-center gap-x-6 gap-y-6">
          {alters.map((p) => (
            <PlayerBox p={p} handleClick={() => remove(p)} />
          ))}
        </div>
        {alters.length === 0 ? (
          <div className="w-full text-center text-gray-400">
            No one. Add Players to follow below
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pt-8 space-y-8">
        <h1 className="text-lg text-gray-500 font-medium">You can follow</h1>
        <div className="grid grid-cols-3 items-center gap-x-6 gap-y-6">
          {others.map((p) => (
            <PlayerBox add p={p} handleClick={() => add(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function scoreColor(roundScore) {
  if (roundScore > 0.2) {
    return "text-orange-500";
  } else if (roundScore > 0.5) {
    return "text-green-500";
  }
  return "text-red-500";
}

function PlayerBox({ p, handleClick, add = false }) {
  const color = scoreColor(p.round.get("score"));

  return (
    <>
      <div key={p.id} className="flex justify-end">
        <div className="h-18 w-18">
          <Avatar player={p} />
        </div>
      </div>
      <div key={p.id + "val"} className="flex flex-col justify-start">
        <Slider
          min={0}
          max={1}
          stepSize={0.01}
          value={p.round.get("guess")}
          disabled
        />
        <div className="flex justify-center space-x-4">
          <div className={color}>+{p.round.get("score")}</div>
          <div>${p.get("score")}</div>
        </div>
      </div>
      <div className="text-left">
        <Button handleClick={handleClick}>
          {add ? (
            <div className="text-green-500 font-semi-bold">ADD</div>
          ) : (
            <div className="text-red-500 font-semi-bold">REMOVE</div>
          )}
        </Button>
      </div>
    </>
  );
}
