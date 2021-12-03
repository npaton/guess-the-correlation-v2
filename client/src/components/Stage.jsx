import React from "react";
import { usePlayer, useRound, useStage } from "@empirica/player";
import { Button } from "./base/Button";
import { Neighbors } from "./Neighbors";
import { Response } from "./Response";
import { OtherResponses } from "./OtherResponses";
import { Outcome } from "./Outcome";

export function Stage() {
  const player = usePlayer();
  const stage = useStage();
  const round = useRound();

  const task = (
    <div className="flex">
      <Response />
      {stage.get("name") === "Interactive Response" ? <OtherResponses /> : ""}
      {stage.get("name") === "Round Outcome" ? <Outcome /> : ""}
    </div>
  );

  return (
    <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
      {task}
    </div>
  );
}
