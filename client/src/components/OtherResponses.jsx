import React from "react";
import { usePlayer, usePlayers, useRound, useStage } from "@empirica/player";
import { Slider } from "./Slider";
import { Avatar } from "./base/Avatar";

export function OtherResponses() {
  const player = usePlayer();
  const alterIDs = player.get("alterIDs");
  const players = usePlayers().filter((p) => alterIDs.includes(p.id));

  if (players.length === 0) {
    return <></>;
  }

  const pps = players.map((p) => {
    return (
      <>
        <div key={p.id} className="flex justify-end">
          <div className="h-18 w-18">
            <Avatar player={p} />
          </div>
        </div>
        <div key={p.id + "val"} className="flex justify-start">
          <Slider
            min={0}
            max={1}
            stepSize={0.01}
            value={p.round.get("guess")}
            disabled
          />
        </div>
      </>
    );
  });

  return (
    <div className="mt-12 space-y-8 rounded text-center">
      <h1 className="text-lg text-gray-500 font-medium">You are following</h1>

      <div className="grid grid-cols-2 items-center gap-x-6 gap-y-6">{pps}</div>
    </div>
  );
}
