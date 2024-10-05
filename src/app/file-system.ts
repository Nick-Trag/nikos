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
              name: 'education.txt',
              type: 'file',
              content: 'I have a Bachelor\'s degree in Computer Science from the Aristotle University of Thessaloniki, and a Master\'s degree in Artificial Intelligence ' +
              'from the same university. During my Master\'s cycle, I also spent one semester studying at the Universidad Politécnica de Madrid, as an Erasmus+ ' +
              'exchange student.',
            },
            {
              name: 'experience.txt',
              type: 'file',
              content: 'I have worked as an intern front-end web developer at the Aristotle University\'s IT center during my studies, where I contributed to the development of ' +
              'the new and open-source student information system, called UniverSIS, which is now used by multiple universities in Greece. ' +
              'I also worked as a Software Engineer at INCA Hellas, where I completely modernized the company\'s website, and where I was responsible for the ' +
              'refactoring of a queueing system that is used by large companies across Greece.',
            },
            {
              name: 'projects.txt',
              type: 'file',
              content: 'My most recent personal project is this very website, in which I highlight and practice my skills ' +
              'in web development, while also showcasing many of my interests and hobbies. Another personal project that I am particularly proud of is \'Wili Wishlist\', ' +
              'an Android app that I created using Flutter, which is useful for saving and organizing a user\'s personal wishlist, with all the things they would like to buy. ' +
              'Other than those, throughout many years I have worked on multiple projects, big and small, including Thessmetro, the Achaikos Faros website, the Criminal ' +
              'Maps Android application, and the Domino desktop game.',
            },
            {
              name: 'hobbies.txt',
              type: 'file',
              content: 'I can have a different hobby in any given week, but the ones that have most stood the test of time and remained constant are:\n' +
              '1. Travelling\n' +
              '2. Photography\n' +
              '3. Coding\n' +
              '4. Going to the gym\n' +
              '5. Playing sports\n' +
              '6. Playing video games\n' +
              'This website has information on all of the above, each page featuring something about one of my interests. This page in particular is focused on coding, ' +
              'so there is an extra directory in this terminal, with more information about my coding journey. You can explore it to learn more!',
            },
            {
              name: 'welcome.txt',
              type: 'file',
              content: 'Welcome to the terminal! You can browse around using standard Linux commands, such as \'cd\', ' +
              '\'ls\', and \'cat\'. Type \'help\' if you need a list of the commands and their uses.',
            },
            {
              name: 'coding',
              type: 'directory',
              children: [
                {
                  name: 'info.py',
                  type: 'file',
                  content:
                    'from datetime import datetime\n' +
                    '\n' +
                    '\n' +
                    'languages_known = ["python", "javascript", "java", "c", "c++", "c#", "php", "dart"]\n' +
                    'favorite_language = languages_known[0]\n' +
                    '\n' +
                    'print("The programming languages I know are:")\n' +
                    'for language in languages:\n' +
                    '\tprint(language)\n' +
                    '\n' +
                    'print("My favorite one of these is " + favorite_language)\n' +
                    '\n' +
                    'frameworks_used = ["angular", "django", "react", "flutter", "pytorch"]\n' +
                    'favorite_ide = "jetbrains"\n' +
                    '\n' +
                    'coding_projects = {\n' +
                    '\t"angular": ["nikostragkas.eu", "thessmetro"],\n' +
                    '\t"flutter": ["wili wishlist"],\n' +
                    '\t"java": ["domino game"],\n' +
                    '\t"html": ["cavaaxaikosfaros.gr"]\n' +
                    '}\n' +
                    '\n' +
                    'coding_journey_started = 2008\n' +
                    'university_entry_year = 2016\n' +
                    'current_year = datetime.now().year\n' +
                    '\n' +
                    'print(f"I\'ve been coding for {current_year - coding_journey_started} years, seriously for {current_year - university_entry_year} of those years!")\n' +
                    '',
                },
                {
                  name: 'history.txt',
                  type: 'file',
                  content: 'I\'ve always been fascinated by computers, and technology in general, ever since I was a little kid. ' +
                  'My first contact with coding came when I was as young as 10 years old, when I asked my dad, also a programmer, to teach me how to make websites. ' +
                  'He taught me the basics of HTML, and even a bit of JavaScript, and I created my first coding project, a simple website summing up the Pokémon movies, ' +
                  'with pictures and videos. I loved working on that project so much that, from that point on, my path was clear; I wanted to become a developer!\n\n' +
                  'As I got older, I followed online tutorials on Java and other languages to expand my knowledge, until I reached 18 years old and went to university. ' +
                  'Of course the choice of my field of study was obvious; Computer Science! Four years of studies only reinforced how much I loved coding, and ' +
                  'also gave me a newfound love for the field of Computer Science in general. So much so, that I decided to continue my studies even further, getting a ' +
                  'Master\'s degree in Artificial Intelligence.\n\nAfter finishing my studies, I was forced to stop coding for a year, due to the military obligations in Greece. ' +
                  'After being done with that, I came back even more excited, working professionally and creating a bunch of personal projects to improve and update my skills.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
