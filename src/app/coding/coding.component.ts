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
  commandHistory: Command[] = [ // Sample history to make sure it is working. Will start blank, or with some help command(s)
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

  ngOnInit(): void {

  }

  handleCommand(): void {
    const command: string = this.currentCommand;

    switch (command) {
      case "pwd":
        console.log(this.currentDirectory);
        break;
      case "clear":
        this.commandHistory = [];
        break;
      default:
        console.log(command + " has not been implemented");
        break;
    }

    this.currentCommand = '';
  }

}
