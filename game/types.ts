type Player = {
  // generated at the time of joining the game
  // used to identify the player in the game
  id: string;
  // selected by the player at the time of joining the game
  // should be stored in the local storage of the client,
  // to be used for future games
  name: string;
  // score in the current game, not the total score across multiple games
  score: number;
  connected: boolean;
};

// the player list is an array of Player objects,
// used to store the players in the game
type PlayerList = Array<Player>;

// Game configuration type,
// used to setup the game at the time of creation
type GameConfig = {
  // the maximum number of players allowed in the game
  maxPlayers: number;
  // the time allowed for drawing in minutes
  drawTimeMinutes: number;
  // the time allowed for guessing in minutes
  guessTimeMinutes: number;
  // the maximum number of rounds in the game
  maxRounds: number;
};

type GameContext = {
  // the list of players in the game, stored as an array of Player objects
  playerList: PlayerList;
  // the playerId of the current drawer, null if no drawer is set
  drawerId: string | null;
  dictionary: string[];
  // the correct word to be guessed by the players,
  // set by the game itself
  // shown to the drawer only, hidden from the guessers
  word: string | null;
  // the guesses made by the players, stored as a record of playerId to their guess
  // to be used for scoring and determining if the guess is correct
  playerGuesses: Record<string, string>;
  // current drawer index (the turn)
  turn: number;
  // current round number (not the turn)
  // a game can have multiple rounds, each round has multiple turns
  round: number;
  // config setup by the game creator
  config: GameConfig;
};

type GameEvent =
  | { type: "PLAYER_JOINED"; player: Player }
  | { type: "PLAYER_LEFT"; player: Player }
  | { type: "PLAYER_RECONNECTED"; player: Player }
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "PAUSE_GAME"; player: Player }
  | { type: "DRAW_TIME_UP" }
  | { type: "GUESS"; player: Player; guess: string };

export type { Player, PlayerList, GameContext, GameEvent };
