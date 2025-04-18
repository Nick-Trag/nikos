interface ProjectLink {
  faIcons: string;
  link: string;
  ariaLabel: string;
}

export interface Project {
  name: string;
  mainLink: string;
  imageLink: string;
  imageAlt: string;
  imageHeight: number;
  imageWidth: number;
  bulletPoints: string[];
  projectLinks: ProjectLink[];
}


export const projects: Project[] = [
  {
    name: 'Wili Wishlist',
    mainLink: 'https://play.google.com/store/apps/details?id=csd.nikos.wili',
    imageLink: 'images/compressed/wili_small.png',
    imageAlt: 'Wili Wishlist logo',
    imageHeight: 512,
    imageWidth: 512,
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
        ariaLabel: 'GitHub link for Wili Wishlist',
      },
      {
        faIcons: 'fa-brands fa-google-play',
        link: 'https://play.google.com/store/apps/details?id=csd.nikos.wili',
        ariaLabel: 'Play Store link for Wili Wishlist',
      },
    ],
  },
  {
    name: 'nikostragkas.eu',
    mainLink: "#",
    imageLink: "images/site_logos/nikos_logo_full_small_horizontal.png",
    imageAlt: "nikostragkas.eu logo",
    imageHeight: 300,
    imageWidth: 500,
    bulletPoints: [
      'Personal website, including a portfolio, and featuring multiple pages about my interests',
      'Every page was built to show off a different skill in web development',
      'Includes animations, responsiveness, cool layouts, maps, and more to come!',
      'Built using Angular framework and Tailwind CSS',
    ],
    projectLinks: [
      {
        faIcons: "fa-brands fa-github",
        link: "https://github.com/Nick-Trag/nikos",
        ariaLabel: 'GitHub link for nikostragkas.eu',
      },
      {
        faIcons: "fa-solid fa-link",
        link: "#",
        ariaLabel: 'Link to nikostragkas.eu',
      },
    ],
  },
  {
    name: "Thessmetro",
    mainLink: "https://nick-trag.github.io/thessmetro",
    imageLink: "images/compressed/thessmetro_logo_small_horizontal.png",
    imageAlt: "Thessmetro logo",
    imageHeight: 200,
    imageWidth: 250,
    bulletPoints: [
      "Website meant for posting news, articles, and images regarding the construction of Thessaloniki’s subway",
      "Built using Angular framework and Bootstrap",
      "Utilized Angular concepts, such as components, services, and routing, to create a fast and fully responsive web application",
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://nick-trag.github.io/thessmetro",
        ariaLabel: 'Link to Thessmetro',
      },
    ],
  },
  {
    name: "Achaikos Faros website",
    mainLink: "https://cavaaxaikosfaros.gr",
    imageLink: "images/compressed/axaikos_faros_small.png",
    imageAlt: "Achaikos Faros logo",
    imageHeight: 147,
    imageWidth: 250,
    bulletPoints: [
      'A liquor store\'s website, containing its contact info, hours of operation, and location on Google Maps',
      'Used HTML and CSS',
    ],
    projectLinks: [
      {
        faIcons: "fa-solid fa-link",
        link: "https://cavaaxaikosfaros.gr",
        ariaLabel: 'Link to the Achaikos Faros website',
      },
    ],
  },
];
