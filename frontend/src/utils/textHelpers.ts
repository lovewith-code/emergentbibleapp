export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const highlightMatch = (text: string, query: string): string => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '**$1**');
};

export const shareFormat = (bookName: string, chapter: number, verse: number, text: string): string => {
  return `${bookName} ${chapter}:${verse}\n\n${text}\n\n— HolyBook`;
};