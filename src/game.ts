enum Player {
  X = "x",
  O = "o",
}

export enum GameMode {
  Computer = "computer",
  Local = "local",
}

export class Game {
  board: (Player | undefined)[] = new Array(9).fill(undefined);
  turn: Player = Player.X;
  // The computer is O.
  mode: GameMode = GameMode.Computer;

  click(field: number) {
    if (this.board[field] !== undefined) return;

    this.board[field] = this.turn;
    document.getElementById(`field-${field}`)?.classList.add(this.turn);

    const winner = this.getWinner();
    if (winner) {
      this.showRestartDialog(
        `<span class="${winner}">${winner.toUpperCase()}</span> won.`
      );
    } else if (this.isBoardFull()) {
      this.showRestartDialog(`Tie.`);
    } else {
      this.switchTurns();
    }

    if (this.mode === GameMode.Computer) {
      // TODO
    }
  }

  // Switches the current turn and updates the displayed value.
  switchTurns() {
    this.turn = this.turn === Player.X ? Player.O : Player.X;
    const element = document.getElementById("turn");
    if (!element) return;
    element.innerHTML = `<span class="${
      this.turn
    }">${this.turn.toUpperCase()}</span>'s`;
  }

  // Returns the `Player` if someone won, otherwise `undefined`.
  getWinner(): Player | undefined {
    // Diagonals
    if (
      this.board[0] &&
      this.board[0] === this.board[4] &&
      this.board[0] === this.board[8]
    )
      return this.board[0];
    if (
      this.board[2] &&
      this.board[2] === this.board[4] &&
      this.board[2] === this.board[6]
    )
      return this.board[2];

    for (let i = 0; i < 3; i++) {
      // Verticals
      if (
        this.board[i] &&
        this.board[i] === this.board[i + 3] &&
        this.board[i] === this.board[i + 2 * 3]
      )
        return this.board[i];
      // Horizontals
      if (
        this.board[3 * i] &&
        this.board[3 * i] === this.board[3 * i + 1] &&
        this.board[3 * i] === this.board[3 * i + 2]
      )
        return this.board[3 * i];
    }

    return;
  }

  // Returns `true` if the board has no more unoccupied fields, otherwise `false`.
  isBoardFull(): boolean {
    return this.board.every((value) => value);
  }

  // Shows a dialog with the given `message` and a restart button.
  showRestartDialog(message: string) {
    const messageElement = document.getElementById("restart-dialog-message");
    if (!messageElement) return;
    messageElement.innerHTML = message;

    const dialogElement = document.getElementById(
      "restart-dialog"
    ) as HTMLDialogElement;
    dialogElement?.showModal();
  }

  // Clears the board and resets the turn.
  restart() {
    this.board = new Array(9).fill(undefined);
    for (let i = 0; i < 9; i++)
      document.getElementById(`field-${i}`)?.classList.remove("x", "o");

    // TODO first turn of next game by winner of last game
    this.turn = Player.X;
    const element = document.getElementById("turn");
    if (!element) return;
    element.innerHTML = `<span class="${
      this.turn
    }">${this.turn.toUpperCase()}</span>'s`;
  }
}
