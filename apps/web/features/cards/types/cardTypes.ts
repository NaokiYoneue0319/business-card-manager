export type CardUser = {
  id: string;
  userName: string;
};

export type CardTag = {
  id: string;
  tagName: string;
};

export type CardListItem = {
  id: string;
  name: string;
  frontImageUrl: string;
  store: {
    id: string;
    storeName: string;
    prefecture: string;
    area: string;
  };
  cardUsers: {
    user: CardUser;
  }[];
  cardTags: {
    tag: CardTag;
  }[];
};

export type SearchCardsParams = {
  name?: string;
  storeName?: string;
  area?: string;
  usedByUserName?: string;
  tagName?: string;
  usedYearMonth?: string;
};
