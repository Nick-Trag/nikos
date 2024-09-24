export interface File {
  name: string;
  content: string;
}

export interface Directory {
  name: string;
  children: FileSystemEntity[];
}

type FileSystemEntity = Directory | File;

export const root: Directory = {
  name: '',
  children: [
    {
      name: 'home',
      children: [
        {
          name: 'nikos',
          children: [
            {
              name: 'test1.txt',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet sagittis libero. Ut sit amet molestie eros. ' +
                'Vivamus volutpat venenatis arcu. Vivamus porttitor metus ut erat consequat, non congue purus tempor. Suspendisse in massa ultrices, ' +
                'vehicula magna sit amet, finibus ex. Duis ut tincidunt nisi. Aenean semper eros ipsum. Duis lobortis, libero ac tempor bibendum, quam ' +
                'nisi congue ligula, et pellentesque augue mi sed quam. Donec in sagittis libero, vel lobortis dui. Praesent feugiat lacus lorem, ' +
                'eget aliquam ligula euismod nec. Cras maximus lacinia tellus nec hendrerit. Donec mattis mi et euismod aliquam.',
            },
            {
              name: 'test2.txt',
              content: 'small text content',
            },
            {
              name: 'test3.txt',
              content: 'This is the third and final .txt file in the filesystem',
            },
            {
              name: 'documents',
              children: [
                {
                  name: 'doc1.docx',
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
