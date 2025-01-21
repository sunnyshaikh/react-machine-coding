export interface TrelloCardType {
  id: number;
  title: string;
  isEditing: boolean;
}

export interface TrelloCardsType {
  id: number;
  title: string;
  cards: TrelloCardType[];
}
