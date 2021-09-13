import "./Square.css";
import { XIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/outline";
import { useAppContext } from "../Store";
import { useEffect, useState } from "react";
// import anime from "animejs/lib/anime.es.js";

// import DrawSVG from "react-svg-drawing";

type Props = {
  index: number;
};

const Square = ({ index }: Props) => {
  console.log("rerender");
  const { player, dispatch, reset, probability } = useAppContext();

  const [marked, setMarked] = useState(false);
  const [own, setOwn] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    if (!reset) return;
    setMarked(false);
  }, [reset]);

  function onClickSquare(index: number) {
    if (marked) return;

    dispatch({ type: "MARK", payload: { index, player } });
    setMarked(true);

    if (player === "A") {
      setOwn("A");
    } else {
      setOwn("B");
    }
    dispatch({ type: "CHANGE_PLAYER" });
  }

  return (
    <button
      className="square"
      onClick={() => onClickSquare(index)}
      disabled={!!probability}
    >
      {own === "A" && marked && <XIcon />}
      {own === "B" && marked && <CheckIcon />}
      {/* <DrawSVG width="50" easing="easeOutSine" duration="500">
      </DrawSVG> */}
    </button>
  );
};

export default Square;

// anime({
//    targets: ".square path",
//    strokeDashoffset: [anime.setDashoffset, 0],
//    easing: "easeInOutSine",
//    duration: 1500,
//    delay: function (el: any, i: any) {
//      return i * 250;
//    },
//    direction: "alternate",
//  });
