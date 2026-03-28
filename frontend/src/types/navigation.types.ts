export type RootStackParams = {
  index:             undefined;
  'onboarding/slides':   undefined;
  'onboarding/language': undefined;
  'onboarding/login':    undefined;
};

export type TabParams = {
  'home/index':                       undefined;
  'bible/index':                      undefined;
  'bible/[bookId]/index':             { bookId: string };
  'bible/[bookId]/[chapter]':         { bookId: string; chapter: string };
  'search/index':                     undefined;
  'bookmarks/index':                  undefined;
  'settings/index':                   undefined;
};