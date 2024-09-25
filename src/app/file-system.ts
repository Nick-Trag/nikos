export interface FileSystemEntity {
  name: string;
  type: 'file' | 'directory';
  children?: FileSystemEntity[]; // Used if the entity is a directory
  content?: string; // Used if the entity is a file
}

export const root: FileSystemEntity = {
  name: '',
  type: 'directory',
  children: [
    {
      name: 'home',
      type: 'directory',
      children: [
        {
          name: 'nikos',
          type: 'directory',
          children: [
            {
              name: 'test1.txt',
              type: 'file',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sagittis libero. Ut sit amet molestie eros. ' +
                'Vivamus volutpat venenatis arcu. Vivamus porttitor metus ut erat consequat, non congue purus tempor. Suspendisse in massa ultrices, ' +
                'vehicula magna sit amet, finibus ex. Duis ut tincidunt nisi. Aenean semper eros ipsum. Duis lobortis, libero ac tempor bibendum, quam ' +
                'nisi congue ligula, et pellentesque augue mi sed quam. Donec in sagittis libero, vel lobortis dui. Praesent feugiat lacus lorem, ' +
                'eget aliquam ligula euismod nec. Cras maximus lacinia tellus nec hendrerit. Donec mattis mi et euismod aliquam.',
            },
            {
              name: 'test2.txt',
              type: 'file',
              content: 'small text content',
            },
            {
              name: 'test3.txt',
              type: 'file',
              content: 'This is the third and final .txt file in the filesystem',
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
