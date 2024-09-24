import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";

interface Command {
  command: string;
  directory: string;
  result: string;
}

@Component({
  selector: 'app-coding',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.scss',
})
export class CodingComponent implements OnInit {
  currentDirectory: string = "/home/nikos";
  previousCommands: Command[] = [ // Sample history to make sure it is working. Will start blank, or with some help command(s)
    {
      command: 'pwd',
      directory: '/home/nikos',
      result: '/home/nikos',
    },
    {
      command: 'ls',
      directory: '/home/nikos',
      result: `fileA.txt\nfileB.txt\nfileC.txt`,
    }
  ];
  currentCommand: string = '';
  commandHistory: string[] = []; // Command history for the up and down buttons
  currentCommandHistoryIndex: number = 0; // Which command history item we are currently editing. If it is equal to commandHistory.length, we are creating a new item
  @ViewChild('terminalInput')
  private terminalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('innerTerminal')
  private innerTerminal!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    setTimeout(() => {
      this.terminalInput.nativeElement.focus();
    }, 1000); // TODO: Use the loading screen shown logic to use a better timeout (this fucks up the loading screen animations)
  }

  handleCommand(): void {
    const fullCommand: string = this.currentCommand.trim();

    const commandNoArgs: string = fullCommand === '' ? '' : fullCommand.split(' ')[0];

    switch (commandNoArgs) {
      case "":
        this.emptyCommand();
        break;
      case "pwd":
        this.pwd(fullCommand);
        break;
      case "clear":
        this.clear();
        break;
      default:
        this.commandNotImplemented(fullCommand, commandNoArgs);
        break;
    }

    // Save the command history, for pressing the up and down arrow keys
    if (fullCommand !== '') {
      this.commandHistory.push(fullCommand);
      this.currentCommandHistoryIndex = this.commandHistory.length;
    }

    this.currentCommand = '';

    this.terminalInput.nativeElement.focus();

    setTimeout(() => {
      const innerTerminalHeight = this.innerTerminal.nativeElement.scrollHeight;
      this.innerTerminal.nativeElement.scrollTo({top: innerTerminalHeight, left: 0}); // Inner scroll in the terminal
      this.terminalInput.nativeElement.scrollIntoView({block: "nearest"}); // Outer scroll if needed
    }); // In a setTimeout, to force the UI to update first, before scrolling
  }

  emptyCommand(): void {
    this.previousCommands.push({
      command: '',
      directory: this.currentDirectory,
      result: '',
    });
  }

  pwd(fullCommand: string): void {
    const command: Command = {
      command: fullCommand,
      directory: this.currentDirectory,
      result: this.currentDirectory,
    };
    this.previousCommands.push(command);
  }

  clear(): void {
    this.previousCommands = [];
  }

  commandNotImplemented(fullCommand: string, commandNoArgs: string): void {
    const command: Command = {
      command: fullCommand,
      directory: this.currentDirectory,
      result: commandNoArgs + " has not been implemented",
    }
    this.previousCommands.push(command);
  }

  // Used to give focus to the input element whenever any place on the terminal is clicked
  focusTerminal(): void {
    this.terminalInput.nativeElement.focus();
    this.innerTerminal.nativeElement.scrollTo({left: 0})
  }

  goToPreviousCommand(): void {
    if (this.currentCommandHistoryIndex > 0) {
      this.currentCommandHistoryIndex--;
      this.currentCommand = this.commandHistory[this.currentCommandHistoryIndex];
    }
  }

  goToNextCommand(): void {
    if (this.currentCommandHistoryIndex < this.commandHistory.length - 1) {
      this.currentCommandHistoryIndex++;
      this.currentCommand = this.commandHistory[this.currentCommandHistoryIndex];
    }
    else if (this.currentCommandHistoryIndex === this.commandHistory.length - 1) {
      this.currentCommandHistoryIndex++;
      this.currentCommand = '';
    }
  }
}
