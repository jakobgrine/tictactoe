import { Game } from "./game";

const game = new Game();

Array.prototype.forEach.call(
  document.getElementsByClassName("field"),
  (element: Element) => {
    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const field = Number(target.id.replace("field-", ""));
      game.click(field);
    });
  }
);

document
  .getElementById("restart-button")
  ?.addEventListener("click", (event) => {
    game.restart();
  });
