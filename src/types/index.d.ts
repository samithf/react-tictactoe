export type AppState = {
  player: "A" | "B";
  reset: boolean;
  markedByA: number[];
  markedByB: number[];
  probability: Probability;
};

type Probability = "WIN_A" | "WIN_B" | "DRAW" | null;
