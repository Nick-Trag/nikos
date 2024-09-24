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
  currentDirectory: string = "~";
  previousCommands: Command[] = [ // Sample history to make sure it is working. Will start blank, or with some help command(s)
    {
      command: 'pwd',
      directory: '~',
      result: '~',
    },
    {
      command: 'ls',
      directory: '~',
      result: `fileA.txt\nfileB.txt\nfileC.txt`,
    }
  ];
  currentCommand: string = '';
  commandHistory: string[] = []; // Command history for the up and down buttons. TODO: Use this
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

    if (fullCommand !== '') {
      this.commandHistory.push(fullCommand);
    }

    this.currentCommand = '';

    this.terminalInput.nativeElement.focus();

    setTimeout(() => {
      const innerTerminalHeight = this.innerTerminal.nativeElement.scrollHeight;
      this.innerTerminal.nativeElement.scrollTo({top: innerTerminalHeight}); // Inner scroll in the terminal
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
}
