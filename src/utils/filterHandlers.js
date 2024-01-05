export const handleSearch = ({ query, store }) => {
  if (query.length) {
    store.setPageIndex(1);
    store.setSearchQuery(query ?? "");
  } else {
    return store.setSearchQuery("");
  }
};

export const handleSort = ({ query, store }) => {
  if (query) {
    store.setSort(query);
  } else {
    store.setSort("");
  }
};
