import { Game, GameMode } from "./game";

const game = new Game();

Array.prototype.forEach.call(
  document.getElementsByClassName("field"),
  (element: Element) => {
    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const field = Number(target.id.replace("field-", ""));
      game.move(field);
    });
  }
);

document
  .getElementById("restart-button")
  ?.addEventListener("click", (event) => {
    game.restart();
  });

const gameMode = localStorage.getItem("game_mode");
const gameModeElement = document.getElementById(
  "game-mode"
) as HTMLInputElement;
if (gameModeElement) {
  if (gameMode) {
    gameModeElement.checked = gameMode === GameMode.Local;
    game.mode =
      gameMode === GameMode.Local ? GameMode.Local : GameMode.Computer;
  }

  gameModeElement.addEventListener("click", () => {
    game.mode = gameModeElement.checked ? GameMode.Local : GameMode.Computer;
    localStorage.setItem("game_mode", game.mode);
    game.restart();
  });
}
