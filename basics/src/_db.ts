let games = [
  { id: '1', title: 'Zelda: Breath of the Wild', platform: ['Switch'] },
  { id: '2', title: 'Final Fantasy VII', platform: ['PS5', 'Xbox', 'PC'] },
  { id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'] },
  { id: '4', title: 'Mario Kart 8', platform: ['Switch'] },
  { id: '5', title: 'God of War: Ragnarok', platform: ['PS5', 'PC'] }
];

let authors = [
  { id: '1', name: 'John Doe', verified: true },
  { id: '2', name: 'Jane Smith', verified: false },
  { id: '3', name: 'Alex Johnson', verified: true }
];

let reviews = [
  { id: '1', rating: 9, content: 'Amazing game, best in the series!', author_id: '1', game_id: '1' },
  { id: '2', rating: 10, content: 'Perfect masterpiece, highly recommended.', author_id: '2', game_id: '1' },
  { id: '3', rating: 7, content: 'Good game but has some issues.', author_id: '3', game_id: '2' },
  { id: '4', rating: 8, content: 'Great story and gameplay.', author_id: '1', game_id: '3' },
  { id: '5', rating: 9, content: 'Incredible open world experience.', author_id: '2', game_id: '3' },
  { id: '6', rating: 6, content: 'Fun but gets repetitive.', author_id: '3', game_id: '4' },
  { id: '7', rating: 10, content: 'Absolutely stunning visuals and story.', author_id: '1', game_id: '5' }
];

export default { games, authors, reviews };
