import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FileSystemEntity, root } from "../file-system";

interface Command {
  command: string;
  directory: string;
  result: string;
}

const homeDirectory = '/home/nikos';

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
  fileSystemRoot: FileSystemEntity = root;
  currentDirectory: string = homeDirectory;
  previousCommands: Command[] = [ // Sample history to make sure it is working. Will start blank, or with some help command(s)
    {
      command: 'pwd',
      directory: homeDirectory,
      result: homeDirectory,
    },
    {
      command: 'ls',
      directory: homeDirectory,
      result: `test1.txt\ntest2.txt\ntest3.txt`,
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

    const commandResult = this.getCommandResult(fullCommand);

    if (commandResult !== null) {
      this.previousCommands.push(commandResult);
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

  emptyCommand(): Command {
    return {
      command: '',
      directory: this.currentDirectory,
      result: '',
    };
    // this.previousCommands.push({
    //   command: '',
    //   directory: this.currentDirectory,
    //   result: '',
    // });
  }

  pwd(fullCommand: string): Command {
    return {
      command: fullCommand,
      directory: this.currentDirectory,
      result: this.currentDirectory,
    };
    // this.previousCommands.push(command);
  }

  clear(): null {
    this.previousCommands = [];
    return null;
  }

  // Formats the home directory and its sub-dirs to use the ~ representation
  formatHomeSubDirs(directory: string): string {
    return directory.startsWith(homeDirectory) ? directory.replace(homeDirectory, '~') : directory;
  }

  // Returns the absolute path that a given path resolves to. This path does not necessarily exist, it is checked by other functions
  // DOES NOT HANDLE SPACES. Spaces are not allowed in paths in this filesystem
  getAbsolutePath(fileName: string): string {
    if (fileName === '/') { // Return the root directory itself
      return '/';
    }
    if (fileName === '~') { // Return the home directory itself
      return homeDirectory;
    }

    let searchPath: string[];

    if (fileName.startsWith('/')) {
      searchPath = ['']; // Start the search from the root directory
      fileName = fileName.slice(1, fileName.length);
    }
    else if (fileName.startsWith('~/')) { // We are in the home directory, so we start the search from there
      searchPath = homeDirectory.split('/');
      fileName = fileName.slice(2, fileName.length);
    }
    else {
      searchPath = this.currentDirectory === '/' ? [''] : this.currentDirectory.split('/'); // We've been given a relative path, so we start the search from the current directory
    }

    const directories = fileName.split('/');

    for (let directory of directories) {
      if (directory === '' || directory === '.') {
        continue; // We are staying in the same directory
      }

      if (directory === '..') {
        if (searchPath.length === 1) { // We are in the root directory
          continue; // Cannot go up any further from the root directory, so stay in it
        }

        searchPath = searchPath.slice(0, searchPath.length - 1); // Go up and search in the parent directory
      }
      else {
        searchPath.push(directory);
      }
    }

    let fullFilePath = searchPath.join('/');

    if (fullFilePath === '') { // The empty path is the root path
      fullFilePath = '/';
    }

    return fullFilePath;
  }

  getFileSystemEntityByAbsolutePath(absolutePath: string): FileSystemEntity | null {
    if (absolutePath === '/') {
      return this.fileSystemRoot;
    }

    let pathSegments: string[] = absolutePath.split('/');
    let searchedDirectory: FileSystemEntity = this.fileSystemRoot; // Start searching from the root directory

    for (let i = 1; i < pathSegments.length - 1; i++) { // Starting from i = 1, as i = 0 is always the root path: ''
      let pathFound: boolean = false;
      if (searchedDirectory.type === 'directory') {
        for (let child of searchedDirectory.children!) {
          if (child.name === pathSegments[i]) {
            searchedDirectory = child;
            pathFound = true;
            break;
          }
        }
      }
      if (!pathFound) {
        return null;
      }
    }

    let fileName = pathSegments[pathSegments.length - 1]; // The final part of the path, which is the actual file
    // e.g. in /home/nikos/index.html, this is index.html

    let result: FileSystemEntity | null = null;

    if (searchedDirectory.type === 'directory') {
      for (let child of searchedDirectory.children!) {
        if (child.name === fileName) {
          result = child;
          break;
        }
      }
    }

    return result;
  }

  sudo(fullCommand: string): Command | null {
    const sudoArgs: string[] = fullCommand.split(' ').filter((sudoArg) => sudoArg !== '' && !sudoArg.startsWith('-')).slice(1);
    let resultingCommand: Command | null = {
      command: fullCommand,
      directory: this.currentDirectory,
      result: '',
    };

    if (sudoArgs.length === 0) {
      resultingCommand.result = 'sudo: no command given'
      return resultingCommand;
    }

    const sudoCommand: string = sudoArgs.join(' ');

    resultingCommand = this.getCommandResult(sudoCommand);

    if (resultingCommand !== null) {
      resultingCommand.command = fullCommand;
    }

    return resultingCommand;
  }

  getCommandResult(fullCommand: string): Command | null {
    const commandNoArgs: string = fullCommand === '' ? '' : fullCommand.split(' ')[0];

    let commandResult: Command | null;

    // TODO commands: cat, ls, cd (with .. and . and even ./ or ../), help, sudo, !!, whois/whoami
    // TODO files: about-me, code samples, w/e, we'll see
    // TODO: Flags (ignore for now)
    switch (commandNoArgs) {
      case "":
        commandResult = this.emptyCommand();
        break;
      case "sudo":
        commandResult = this.sudo(fullCommand);
        break;
      case "pwd":
        commandResult = this.pwd(fullCommand);
        break;
      case "cat":
        commandResult = this.cat(fullCommand);
        break;
      case "cd":
        commandResult = this.cd(fullCommand);
        break;
      case "ls":
        commandResult = this.ls(fullCommand);
        break;
      case "clear":
        commandResult = this.clear();
        break;
      default:
        commandResult = this.commandNotImplemented(fullCommand, commandNoArgs);
        break;
    }

    return commandResult;
  }

  cat(fullCommand: string): Command {
    const commandArgs: string[] = fullCommand.split(' ').slice(1);

    let result = '';

    if (commandArgs.length === 0) {
      result = 'cat: no file name given';
    }

    let fileNamesGiven = 0;

    for (let fileName of commandArgs) {
      if (fileName === '' || fileName.startsWith('-')) { // Ignore all flags and whitespace
        continue;
      }

      fileNamesGiven++;
      const absolutePath = this.getAbsolutePath(fileName);
      const fileSystemEntity = this.getFileSystemEntityByAbsolutePath(absolutePath);

      if (fileSystemEntity === null) {
        result += 'cat: ' + fileName + ': No such file or directory';
      }
      else if (fileSystemEntity.type === 'directory') {
        result += 'cat: ' + fileName + ': Is a directory';
      }
      else if (fileName.endsWith('/')) { // The user gave us a path that ends in /, which actually resolves, but the resolved path is a file, not a directory
        result += 'cat: ' + fileName + ': Not a directory';
      }
      else {
        result += fileSystemEntity.content;
      }

      result += '\n';
    }

    if (fileNamesGiven === 0) {
      result = 'cat: no file name given';
    }

    return {
      command: fullCommand,
      directory: this.currentDirectory,
      result: result,
    };
    // this.previousCommands.push({
    //   command: fullCommand,
    //   directory: this.currentDirectory,
    //   result: result,
    // });
  }

  // Helper function for when we need to run ls on the current directory. Returns the result directly as a string
  lsCurrentDir(): string {
    let result = '';
    const currentDirectoryEntity = this.getFileSystemEntityByAbsolutePath(this.currentDirectory);
    for (let child of currentDirectoryEntity!.children!) {
      result += child.name;
      if (child.type === 'directory') {
        result += '/';
      }
      result += '\n';
    }
    return result;
  }

  ls(fullCommand: string): Command {
    const commandArgs: string[] = fullCommand.split(' ').slice(1);

    let result = '';

    if (commandArgs.length === 0) { // No file name or directory name was given, so we ls the current directory
      result = this.lsCurrentDir();
    }
    else { // If we get one or more dirs given to us
      const resultingLists: string[][] = []; // Used to store the result of each individual ls operation

      for (let commandArg of commandArgs) {
        if (commandArg === '' || commandArg.startsWith('-')) { // Ignore all flags and whitespace
          continue;
        }

        const absolutePath = this.getAbsolutePath(commandArg);
        const directoryEntity = this.getFileSystemEntityByAbsolutePath(absolutePath);

        if (directoryEntity === null) {
          resultingLists.push([`ls: cannot access '${commandArg}': No such file or directory`]);
          continue;
        }

        if (directoryEntity.type === 'file') {
          resultingLists.push([commandArg + ':', directoryEntity.name]);
          continue;
        }

        const directoryChildren: string[] = [commandArg + ':']; // Start by pushing the file/dir name that was requested

        for (let child of directoryEntity.children!) {
          let fileName = child.name;
          if (child.type === 'directory') {
            fileName += '/';
          }
          directoryChildren.push(fileName);
        }

        resultingLists.push(directoryChildren);

      }

      if (resultingLists.length === 0) { // The only arguments we have been given are flags and whitespaces, so we ls the current directory
        result = this.lsCurrentDir();
      }
      else if (resultingLists.length === 1) {
        if (resultingLists[0].length === 1) {
          // This means that this is an error message, so the file name has not been given. Therefore, we don't ignore the first (and only) item
          // This if statement is only satisfied if we use ls with a single error-causing argument, such as: ls /home/fakeDir or ls  -x  /home  -la --hello
          result = resultingLists[0][0];
        }
        for (let i = 1; i < resultingLists[0].length; i++) { // Ignore the first item in the list, as it is the file name, which we won't show if it is the only one
          result += resultingLists[0][i] + '\n';
        }
      }
      else if (resultingLists.length > 1) {
        for (let outputList of resultingLists) {
          for (let output of outputList) {
            result += output + '\n';
          }
          result += '\n';
        }
        result = result.slice(0, result.length - 1); // Remove the final \n, to make it look better and more consistent
      }

    }

    return {
      command: fullCommand,
      directory: this.currentDirectory,
      result: result,
    };
    // this.previousCommands.push({
    //   command: fullCommand,
    //   directory: this.currentDirectory,
    //   result: result,
    // });
  }

  cd(fullCommand: string): Command {
    const startingDirectory = this.currentDirectory;
    let commandArgs: string[] = fullCommand.split(' ').slice(1);
    let errorMessage: string = ''; // Successful invocations do not trigger an output. This is used to output any error messages

    commandArgs = commandArgs.filter((commandArg) => commandArg !== '' && !commandArg.startsWith('-')); // Ignore all whitespace and flags

    if (commandArgs.length === 0) {
      this.currentDirectory = homeDirectory;
    }
    else if (commandArgs.length === 1) {
      const commandArg = commandArgs[0];
      const absolutePath = this.getAbsolutePath(commandArg);
      const fileSystemEntity = this.getFileSystemEntityByAbsolutePath(absolutePath);

      if (fileSystemEntity === null) {
        errorMessage = `cd: ${commandArg}: No such file or directory`;
      }
      else if (fileSystemEntity.type === 'file') {
        errorMessage = `cd: ${commandArg}: Not a directory`;
      }
      else {
        this.currentDirectory = absolutePath;
      }
    }
    else if (commandArgs.length > 1) {
      errorMessage = 'cd: Too many arguments';
    }

    return {
      command: fullCommand,
      directory: startingDirectory,
      result: errorMessage,
    };
    // this.previousCommands.push({
    //   command: fullCommand,
    //   directory: startingDirectory,
    //   result: errorMessage,
    // });
  }

  commandNotImplemented(fullCommand: string, commandNoArgs: string): Command {
    return {
      command: fullCommand,
      directory: this.currentDirectory,
      result: commandNoArgs + " has not been implemented",
    };
    // this.previousCommands.push(command);
  }

  // Used to give focus to the input element whenever any place on the terminal is clicked
  focusTerminal(): void {
    this.terminalInput.nativeElement.focus();
    this.innerTerminal.nativeElement.scrollTo({left: 0});
  }

  goToPreviousCommand(): void {
    if (this.currentCommandHistoryIndex > 0) {
      this.currentCommandHistoryIndex--;
      this.currentCommand = this.commandHistory[this.currentCommandHistoryIndex];
      setTimeout(() => {
        this.terminalInput.nativeElement.setSelectionRange(this.currentCommand.length, this.currentCommand.length);
      }); // Set the caret to the end of the input element. Needs the setTimeout, to happen on the next tick
    }
  }

  goToNextCommand(): void {
    if (this.currentCommandHistoryIndex < this.commandHistory.length - 1) {
      this.currentCommandHistoryIndex++;
      this.currentCommand = this.commandHistory[this.currentCommandHistoryIndex];
      setTimeout(() => {
        this.terminalInput.nativeElement.setSelectionRange(this.currentCommand.length, this.currentCommand.length);
      }); // Set the caret to the end of the input element. Needs the setTimeout, to happen on the next tick
    }
    else if (this.currentCommandHistoryIndex === this.commandHistory.length - 1) {
      this.currentCommandHistoryIndex++;
      this.currentCommand = '';
    }
  }
}
