import { setup } from "xstate";
import { type GameContext } from "./types";

// machine setup for type safety
const machineSetp = setup({
    types: {
        context: {} as GameContext
        
    }
})