import { BibleBook } from '@/types/bible.types';

export const BIBLE_BOOKS: BibleBook[] = [
  // OLD TESTAMENT — LAW
  { id:1,  nameEnglish:'Genesis',         nameTelugu:'ఆదికాండము',           shortCode:'GEN', testament:'old', category:'law',       chapters:50  },
  { id:2,  nameEnglish:'Exodus',          nameTelugu:'నిర్గమకాండము',         shortCode:'EXO', testament:'old', category:'law',       chapters:40  },
  { id:3,  nameEnglish:'Leviticus',       nameTelugu:'లేవీయకాండము',          shortCode:'LEV', testament:'old', category:'law',       chapters:27  },
  { id:4,  nameEnglish:'Numbers',         nameTelugu:'సంఖ్యాకాండము',         shortCode:'NUM', testament:'old', category:'law',       chapters:36  },
  { id:5,  nameEnglish:'Deuteronomy',     nameTelugu:'ద్వితీయోపదేశకాండము',  shortCode:'DEU', testament:'old', category:'law',       chapters:34  },
  // OLD TESTAMENT — HISTORY
  { id:6,  nameEnglish:'Joshua',          nameTelugu:'యెహోషువ',             shortCode:'JOS', testament:'old', category:'history',   chapters:24  },
  { id:7,  nameEnglish:'Judges',          nameTelugu:'న్యాయాధిపతులు',       shortCode:'JDG', testament:'old', category:'history',   chapters:21  },
  { id:8,  nameEnglish:'Ruth',            nameTelugu:'రూతు',                shortCode:'RUT', testament:'old', category:'history',   chapters:4   },
  { id:9,  nameEnglish:'1 Samuel',        nameTelugu:'1 సమూయేలు',           shortCode:'1SA', testament:'old', category:'history',   chapters:31  },
  { id:10, nameEnglish:'2 Samuel',        nameTelugu:'2 సమూయేలు',           shortCode:'2SA', testament:'old', category:'history',   chapters:24  },
  { id:11, nameEnglish:'1 Kings',         nameTelugu:'1 రాజులు',            shortCode:'1KI', testament:'old', category:'history',   chapters:22  },
  { id:12, nameEnglish:'2 Kings',         nameTelugu:'2 రాజులు',            shortCode:'2KI', testament:'old', category:'history',   chapters:25  },
  { id:13, nameEnglish:'1 Chronicles',    nameTelugu:'1 దినవృత్తాంతములు',  shortCode:'1CH', testament:'old', category:'history',   chapters:29  },
  { id:14, nameEnglish:'2 Chronicles',    nameTelugu:'2 దినవృత్తాంతములు',  shortCode:'2CH', testament:'old', category:'history',   chapters:36  },
  { id:15, nameEnglish:'Ezra',            nameTelugu:'ఎజ్రా',               shortCode:'EZR', testament:'old', category:'history',   chapters:10  },
  { id:16, nameEnglish:'Nehemiah',        nameTelugu:'నెహెమ్యా',            shortCode:'NEH', testament:'old', category:'history',   chapters:13  },
  { id:17, nameEnglish:'Esther',          nameTelugu:'ఎస్తేరు',             shortCode:'EST', testament:'old', category:'history',   chapters:10  },
  // OLD TESTAMENT — POETRY
  { id:18, nameEnglish:'Job',             nameTelugu:'యోబు',                shortCode:'JOB', testament:'old', category:'poetry',    chapters:42  },
  { id:19, nameEnglish:'Psalms',          nameTelugu:'కీర్తనలు',            shortCode:'PSA', testament:'old', category:'poetry',    chapters:150 },
  { id:20, nameEnglish:'Proverbs',        nameTelugu:'సామెతలు',             shortCode:'PRO', testament:'old', category:'poetry',    chapters:31  },
  { id:21, nameEnglish:'Ecclesiastes',    nameTelugu:'ప్రసంగి',             shortCode:'ECC', testament:'old', category:'poetry',    chapters:12  },
  { id:22, nameEnglish:'Song of Solomon', nameTelugu:'పరమగీతము',           shortCode:'SNG', testament:'old', category:'poetry',    chapters:8   },
  // OLD TESTAMENT — PROPHECY (Major)
  { id:23, nameEnglish:'Isaiah',          nameTelugu:'యెషయా',               shortCode:'ISA', testament:'old', category:'prophecy',  chapters:66  },
  { id:24, nameEnglish:'Jeremiah',        nameTelugu:'యిర్మీయా',           shortCode:'JER', testament:'old', category:'prophecy',  chapters:52  },
  { id:25, nameEnglish:'Lamentations',    nameTelugu:'విలాపవాక్యములు',      shortCode:'LAM', testament:'old', category:'prophecy',  chapters:5   },
  { id:26, nameEnglish:'Ezekiel',         nameTelugu:'యెహెజ్కేలు',         shortCode:'EZK', testament:'old', category:'prophecy',  chapters:48  },
  { id:27, nameEnglish:'Daniel',          nameTelugu:'దానియేలు',            shortCode:'DAN', testament:'old', category:'prophecy',  chapters:12  },
  // OLD TESTAMENT — PROPHECY (Minor)
  { id:28, nameEnglish:'Hosea',           nameTelugu:'హోషేయ',              shortCode:'HOS', testament:'old', category:'prophecy',  chapters:14  },
  { id:29, nameEnglish:'Joel',            nameTelugu:'యోవేలు',              shortCode:'JOL', testament:'old', category:'prophecy',  chapters:3   },
  { id:30, nameEnglish:'Amos',            nameTelugu:'ఆమోసు',              shortCode:'AMO', testament:'old', category:'prophecy',  chapters:9   },
  { id:31, nameEnglish:'Obadiah',         nameTelugu:'ఓబద్యా',              shortCode:'OBA', testament:'old', category:'prophecy',  chapters:1   },
  { id:32, nameEnglish:'Jonah',           nameTelugu:'యోనా',               shortCode:'JON', testament:'old', category:'prophecy',  chapters:4   },
  { id:33, nameEnglish:'Micah',           nameTelugu:'మీకా',               shortCode:'MIC', testament:'old', category:'prophecy',  chapters:7   },
  { id:34, nameEnglish:'Nahum',           nameTelugu:'నహూము',              shortCode:'NAM', testament:'old', category:'prophecy',  chapters:3   },
  { id:35, nameEnglish:'Habakkuk',        nameTelugu:'హబక్కూకు',           shortCode:'HAB', testament:'old', category:'prophecy',  chapters:3   },
  { id:36, nameEnglish:'Zephaniah',       nameTelugu:'జెఫన్యా',            shortCode:'ZEP', testament:'old', category:'prophecy',  chapters:3   },
  { id:37, nameEnglish:'Haggai',          nameTelugu:'హగ్గయి',             shortCode:'HAG', testament:'old', category:'prophecy',  chapters:2   },
  { id:38, nameEnglish:'Zechariah',       nameTelugu:'జెకర్యా',            shortCode:'ZEC', testament:'old', category:'prophecy',  chapters:14  },
  { id:39, nameEnglish:'Malachi',         nameTelugu:'మలాకీ',              shortCode:'MAL', testament:'old', category:'prophecy',  chapters:4   },
  // NEW TESTAMENT — GOSPEL
  { id:40, nameEnglish:'Matthew',         nameTelugu:'మత్తయి',             shortCode:'MAT', testament:'new', category:'gospel',    chapters:28  },
  { id:41, nameEnglish:'Mark',            nameTelugu:'మార్కు',             shortCode:'MRK', testament:'new', category:'gospel',    chapters:16  },
  { id:42, nameEnglish:'Luke',            nameTelugu:'లూకా',               shortCode:'LUK', testament:'new', category:'gospel',    chapters:24  },
  { id:43, nameEnglish:'John',            nameTelugu:'యోహాను',             shortCode:'JHN', testament:'new', category:'gospel',    chapters:21  },
  // NEW TESTAMENT — HISTORY
  { id:44, nameEnglish:'Acts',            nameTelugu:'అపొస్తలుల కార్యములు',shortCode:'ACT', testament:'new', category:'history',   chapters:28  },
  // NEW TESTAMENT — EPISTLES
  { id:45, nameEnglish:'Romans',          nameTelugu:'రోమీయులకు',          shortCode:'ROM', testament:'new', category:'epistle',   chapters:16  },
  { id:46, nameEnglish:'1 Corinthians',   nameTelugu:'1 కొరింథీయులకు',    shortCode:'1CO', testament:'new', category:'epistle',   chapters:16  },
  { id:47, nameEnglish:'2 Corinthians',   nameTelugu:'2 కొరింథీయులకు',    shortCode:'2CO', testament:'new', category:'epistle',   chapters:13  },
  { id:48, nameEnglish:'Galatians',       nameTelugu:'గలతీయులకు',          shortCode:'GAL', testament:'new', category:'epistle',   chapters:6   },
  { id:49, nameEnglish:'Ephesians',       nameTelugu:'ఎఫెసీయులకు',         shortCode:'EPH', testament:'new', category:'epistle',   chapters:6   },
  { id:50, nameEnglish:'Philippians',     nameTelugu:'ఫిలిప్పీయులకు',      shortCode:'PHP', testament:'new', category:'epistle',   chapters:4   },
  { id:51, nameEnglish:'Colossians',      nameTelugu:'కొలొస్సయులకు',       shortCode:'COL', testament:'new', category:'epistle',   chapters:4   },
  { id:52, nameEnglish:'1 Thessalonians', nameTelugu:'1 థెస్సలొనీకయులకు', shortCode:'1TH', testament:'new', category:'epistle',   chapters:5   },
  { id:53, nameEnglish:'2 Thessalonians', nameTelugu:'2 థెస్సలొనీకయులకు', shortCode:'2TH', testament:'new', category:'epistle',   chapters:3   },
  { id:54, nameEnglish:'1 Timothy',       nameTelugu:'1 తిమోతికి',         shortCode:'1TI', testament:'new', category:'epistle',   chapters:6   },
  { id:55, nameEnglish:'2 Timothy',       nameTelugu:'2 తిమోతికి',         shortCode:'2TI', testament:'new', category:'epistle',   chapters:4   },
  { id:56, nameEnglish:'Titus',           nameTelugu:'తీతుకు',             shortCode:'TIT', testament:'new', category:'epistle',   chapters:3   },
  { id:57, nameEnglish:'Philemon',        nameTelugu:'ఫిలేమోనుకు',         shortCode:'PHM', testament:'new', category:'epistle',   chapters:1   },
  { id:58, nameEnglish:'Hebrews',         nameTelugu:'హెబ్రీయులకు',        shortCode:'HEB', testament:'new', category:'epistle',   chapters:13  },
  { id:59, nameEnglish:'James',           nameTelugu:'యాకోబు',             shortCode:'JAS', testament:'new', category:'epistle',   chapters:5   },
  { id:60, nameEnglish:'1 Peter',         nameTelugu:'1 పేతురు',           shortCode:'1PE', testament:'new', category:'epistle',   chapters:5   },
  { id:61, nameEnglish:'2 Peter',         nameTelugu:'2 పేతురు',           shortCode:'2PE', testament:'new', category:'epistle',   chapters:3   },
  { id:62, nameEnglish:'1 John',          nameTelugu:'1 యోహాను',           shortCode:'1JN', testament:'new', category:'epistle',   chapters:5   },
  { id:63, nameEnglish:'2 John',          nameTelugu:'2 యోహాను',           shortCode:'2JN', testament:'new', category:'epistle',   chapters:1   },
  { id:64, nameEnglish:'3 John',          nameTelugu:'3 యోహాను',           shortCode:'3JN', testament:'new', category:'epistle',   chapters:1   },
  { id:65, nameEnglish:'Jude',            nameTelugu:'యూదా',               shortCode:'JUD', testament:'new', category:'epistle',   chapters:1   },
  // NEW TESTAMENT — APOCALYPSE
  { id:66, nameEnglish:'Revelation',      nameTelugu:'ప్రకటన గ్రంథము',     shortCode:'REV', testament:'new', category:'apocalypse',chapters:22  },
];

// Helper functions
export const getBookById = (id: number): BibleBook | undefined => {
  return BIBLE_BOOKS.find(book => book.id === id);
};

export const getBooksByTestament = (testament: 'old' | 'new'): BibleBook[] => {
  return BIBLE_BOOKS.filter(book => book.testament === testament);
};

export const getBooksByCategory = (category: string): BibleBook[] => {
  return BIBLE_BOOKS.filter(book => book.category === category);
};
