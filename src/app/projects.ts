interface ProjectLink {
  site: string;
  link: string;
}

export interface Project {
  name: string;
  mainLink: string;
  imageLink: string;
  imageAlt: string;
  bulletPoints: string[];
  projectLinks: ProjectLink[];
}


export const projects: Project[] = [
  {
    name: 'Wili Wishlist',
    mainLink: 'https://play.google.com/store/apps/details?id=csd.nikos.wili',
    imageLink: 'images/wili_small.png',
    imageAlt: 'Wili Wishlist logo',
    bulletPoints: [
      'Android App created using Flutter',
      'Create a list of items to purchase, and add images, prices, categories, etc.',
      'Mark items as purchased and distinguish them from the rest',
      'Sort and filter items to easily organize them',
      'Customize the categories, the currency used, and the app theme (light or dark)',
    ],
    projectLinks: [
      {
        site: 'github',
        link: 'https://github.com/Nick-Trag/wili',
      },
      {
        site: 'play store',
        link: 'https://play.google.com/store/apps/details?id=csd.nikos.wili',
      }
    ]
  },
];
