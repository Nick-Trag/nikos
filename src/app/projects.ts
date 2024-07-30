interface ProjectLink {
  faIcons: string;
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
        faIcons: 'fa-brands fa-github',
        link: 'https://github.com/Nick-Trag/wili',
      },
      {
        faIcons: 'fa-brands fa-google-play',
        link: 'https://play.google.com/store/apps/details?id=csd.nikos.wili',
      }
    ]
  },
  { // TODO: The actual project, with the correct image and links when it is complete
    name: 'Nikos',
    mainLink: "#",
    imageLink: "images/wili_small.png",
    imageAlt: "Wili Wishlist logo",
    bulletPoints: [
      'Personal Portfolio website',
      'Built using Angular, Tailwind',
      'Blah, blah...',
      'More things to say',
    ],
    projectLinks: [
      {
        faIcons: "fa-brands fa-github",
        link: "https://github.com/Nick-Trag/nikos"
      },
      {
        faIcons: "fa-solid fa-link",
        link: "#"
      },
    ],
  },
  {
    name: "Achaikos Faros website",
    mainLink: "https://cavaaxaikosfaros.gr",
    imageLink: "images/axaikos_faros.png",
    imageAlt: "Achaikos Faros logo",
    bulletPoints: [
      'Website with information about a liquor store',
      'Used HTML and CSS',
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://cavaaxaikosfaros.gr"
      },
    ],
  },
  {
    name: "Thessmetro",
    mainLink: "https://nick-trag.github.io/thessmetro",
    imageLink: "images/thessmetro_logo.jpg",
    imageAlt: "Thessmetro logo",
    bulletPoints: [
      "Website for posting news about the construction of Thessaloniki's subway",
      "Used Angular and Bootstrap",
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://nick-trag.github.io/thessmetro",
      },
    ],
  },
];
