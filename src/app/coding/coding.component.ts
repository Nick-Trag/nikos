import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {

  }

  handleCommand(): void {
    const fullCommand: string = this.currentCommand;

    if (fullCommand === '') { // TODO: Might let the empty command go through, currently not doing this
      return;
    }

    const commandNoArgs: string = fullCommand.split(' ')[0];

    switch (commandNoArgs) {
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

    this.commandHistory.push(fullCommand);

    this.currentCommand = '';
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
