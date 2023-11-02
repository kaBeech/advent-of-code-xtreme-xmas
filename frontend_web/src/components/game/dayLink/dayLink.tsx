import { component$ } from "@builder.io/qwik";
import { renderSpentTokens } from "~/util/renderSpentTokens";
import { renderTokens } from "~/util/renderTokens";

export interface DayLinkData {
  challengeModifierId: string;
  modifierOptionId: string;
  part1Completed: string | null;
  part2Completed: string | null;
  challengeModifierRerollsUsed: number;
  modifierOptionRerollsUsed: number;
  ChallengeModifier?: {
    name: string;
  };
  ModifierOption?: {
    name: string;
    text: string;
  };
  netScore: number;
}

export interface DayLinkProps {
  dayNumber: number;
  dayLinkData?: DayLinkData;
}

export default component$((props: DayLinkProps) => {
  if (!props.dayLinkData) {
    return (
      <div class="textDim">
        #######################################################{" "}
        <span class="textBright">
          {props.dayNumber < 10 ? " " + props.dayNumber : props.dayNumber}
        </span>
      </div>
    );
  }

  const challengeModifier = props.dayLinkData.ChallengeModifier
    ? props.dayLinkData.ChallengeModifier.name
    : "";
  const modifierOption = props.dayLinkData.ModifierOption?.text
    ? props.dayLinkData.ModifierOption.text
    : "";
  let score = String(props.dayLinkData.netScore);
  if (+score >= 0) {
    score = "+" + score;
  }
  let tokensGained = 0;
  let tokensSpent = 0;
  props.dayLinkData.part1Completed && tokensGained++;
  props.dayLinkData.part2Completed && tokensGained++;
  tokensSpent += props.dayLinkData.challengeModifierRerollsUsed * 2;
  tokensSpent += props.dayLinkData.modifierOptionRerollsUsed;

  const dayDataString = `${challengeModifier}${
    challengeModifier.length < 26
      ? " ".repeat(26 - challengeModifier.length)
      : ""
  }d${modifierOption}${
    modifierOption.length < 18 && " ".repeat(18 - modifierOption.length)
  }${score} points${score.length < 6 && " ".repeat(6 - score.length)} `;

  return (
    <div>
      <a href={`day/${props.dayNumber}`}>{dayDataString}</a>
      <span class="textBright">
        {props.dayNumber < 10 ? " " + props.dayNumber : props.dayNumber}
        {"    "}
      </span>
      <span class="token stitch">{renderTokens(tokensGained)}</span>
      <span class="tokenSpent stitch">{renderSpentTokens(tokensSpent)}</span>
    </div>
  );
});
