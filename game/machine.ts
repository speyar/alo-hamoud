import { setup } from "xstate";
import { type GameEvent, type GameContext, type GameConfig } from "./types";
import { DEFAULT_GAME_CONFIG } from "./config";

const machineSetup = setup({
  types: {
    context: {} as GameContext,
    events: {} as GameEvent,
    input: {} as GameConfig,
  },
});

const machine = machineSetup.createMachine({
  context: ({ input }) => ({
    playerList: [],
    drawerId: null,
    dictionary: [],
    word: null,
    playerGuesses: {},
    turn: 0,
    round: 0,
    config: {
      drawTimeMinutes:
        input.drawTimeMinutes ?? DEFAULT_GAME_CONFIG.drawTimeMinutes,
      guessTimeMinutes:
        input.guessTimeMinutes ?? DEFAULT_GAME_CONFIG.guessTimeMinutes,
      maxPlayers: input.maxPlayers ?? DEFAULT_GAME_CONFIG.maxPlayers,
      maxRounds: input.maxRounds ?? DEFAULT_GAME_CONFIG.maxRounds,
    },
  }),
  initial: "gameLobby",
  states: {
    gameLobby: {
      on: {
        START_GAME: {
          target: "gameRunning.drawing",
        },
      },
    },
    gameRunning: {
      initial: "drawing",
      states: {
        drawing: {
          on: {
            DRAWING_FINISHED: {
              target: "guessing",
            },
            DRAW_TIME_UP: {
              target: "guessing",
            },
            PAUSE_GAME: {
              target: "#gamePaused",
            },
          },
        },
        guessing: {
          on: {
            GUESSING_FINISHED: {
              target: "drawing",
            },
            GUESS_TIME_UP: {
              target: "drawing",
            },
            PAUSE_GAME: {
              target: "#gamePaused",
            },
            END_GAME: {
              target: "#gameOver",
            },
          },
        },
        hist: {
          type: "history",
          history: "shallow",
        },
      },
    },
    gamePaused: {
      id: "gamePaused",
      on: {
        RESUME_GAME: {
          target: "gameRunning.hist",
        },
      },
    },
    gameOver: {
      id: "gameOver",
      type: "final",
    },
  },
});
