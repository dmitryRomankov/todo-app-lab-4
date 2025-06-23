type CommandPair = {
  do: () => void;
  undo: () => void;
};

export class CommandManager {
  private undoStack: CommandPair[] = [];
  private redoStack: CommandPair[] = [];

  execute(doCommand: () => void, undoCommand: () => void) {
    doCommand();
    this.undoStack.push({ do: doCommand, undo: undoCommand });
    this.redoStack = [];
  }

  undo() {
    const pair = this.undoStack.pop();
    if (pair) {
      pair.undo();
      this.redoStack.push(pair);
    }
  }

  redo() {
    const pair = this.redoStack.pop();
    if (pair) {
      pair.do();
      this.undoStack.push(pair);
    }
  }
}

export const commandManager = new CommandManager();
