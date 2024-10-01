export interface FileSystemEntity {
  name: string;
  type: 'file' | 'directory';
  children?: FileSystemEntity[]; // Used if the entity is a directory
  content?: string; // Used if the entity is a file
}

// TODO files: about-me, code samples, w/e, we'll see
export const root: FileSystemEntity = {
  name: '',
  type: 'directory',
  children: [
    {
      name: 'dev',
      type: 'directory',
      children: [
        {
          name: 'null',
          type: 'file',
          content: '',
        },
      ],
    },
    {
      name: 'home',
      type: 'directory',
      children: [
        {
          name: 'nikos',
          type: 'directory',
          children: [
            {
              name: 'about-me.txt',
              type: 'file',
              content: 'My name is Nikos Tragkas. I am a software engineer from Thessaloniki, Greece, with a passion for web development. ' +
              'I have studied Computer Science and Artificial Intelligence. Among my many hobbies, the ones I love the most ' +
              'are travelling, photography, coding, playing sports, going to the gym, and playing video games.',
            },
            {
              name: 'welcome.txt',
              type: 'file',
              content: 'Welcome to the terminal! You can browse around using standard Linux commands, such as \'cd\', ' +
              '\'ls\', and \'cat\'. Type \'help\' if you need a list of the commands and their uses.',
            },
            {
              name: 'documents',
              type: 'directory',
              children: [
                {
                  name: 'doc1.docx',
                  type: 'file',
                  content: 'XSS Testing <script>alert("hacked")</script>',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
