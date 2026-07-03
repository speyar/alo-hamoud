import { setup } from "xstate";
import { GameEvent, type GameContext } from "./types";

// machine setup for type safety
const machineSetup = setup({
  types: {
    context: {} as GameContext,
    events: {} as GameEvent,
  },
});




