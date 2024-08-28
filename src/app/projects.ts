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
    imageLink: 'images/compressed/wili_small.png',
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
    name: 'nikostragkas.eu',
    mainLink: "#",
    imageLink: "images/site_logos/nikos_logo_full_small_horizontal.png",
    imageAlt: "nikostragkas.eu logo",
    bulletPoints: [
      'Personal website, including a portfolio, and featuring multiple pages about my interests',
      'Every page was built to show off a different skill in web development',
      'Includes animations, responsiveness, cool layouts and more...',
      'Built using Angular framework and Tailwind CSS',
    ],
    projectLinks: [
      {
        faIcons: "fa-brands fa-github",
        link: "https://github.com/Nick-Trag/nikos",
      },
      {
        faIcons: "fa-solid fa-link",
        link: "#",
      },
    ],
  },
  {
    name: "Achaikos Faros website",
    mainLink: "https://cavaaxaikosfaros.gr",
    imageLink: "images/compressed/axaikos_faros_small.png",
    imageAlt: "Achaikos Faros logo",
    bulletPoints: [
      'A liquor store\'s website, containing its contact info, hours of operation, and location on Google Maps',
      'Used HTML and CSS',
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://cavaaxaikosfaros.gr",
      },
    ],
  },
  {
    name: "Thessmetro",
    mainLink: "https://nick-trag.github.io/thessmetro",
    imageLink: "images/compressed/thessmetro_logo_small_horizontal.png",
    imageAlt: "Thessmetro logo",
    bulletPoints: [
      "Website meant for posting news, articles, and images regarding the construction of Thessaloniki’s subway",
      "Used Angular framework and Bootstrap",
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://nick-trag.github.io/thessmetro",
      },
    ],
  },
];
