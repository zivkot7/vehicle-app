import {
  observable,
  makeObservable,
  runInAction,
  reaction,
  action,
} from "mobx";
import { Vehicles } from "./../services/Vehicles";

export class VehicleMakeStore {
  make = [];
  singleMake = null;
  singleMakeId = "";
  isLoading = false;
  pageIndex = 1;
  pageCount = 1;
  searchQuery = "";
  sort = "";
  cache = new Map();

  constructor() {
    makeObservable(this, {
      make: observable,
      singleMake: observable,
      singleMakeId: observable,
      isLoading: observable,
      pageIndex: observable,
      pageCount: observable,
      searchQuery: observable,
      sort: observable,
      setMake: action,
      setLoading: action,
      setPageIndex: action,
      setPageCount: action,
      setSingleMake: action,
      setSearchQuery: action,
      setSort: action,
    });

    reaction(
      () => ({
        searchQuery: this.searchQuery,
        pageIndex: this.pageIndex,
        sort: this.sort,
      }),
      () => {
        this.getMake();
      }
    );
  }

  setMake = (apiData) => {
    this.make = apiData;
  };

  setLoading(condition) {
    this.isLoading = condition;
  }

  setPageIndex(page) {
    this.pageIndex = page;
  }

  setPageCount(count) {
    this.pageCount = count;
  }

  setSingleMake(apiData, id) {
    this.singleMake = apiData;
    this.singleMakeId = id;
  }

  setSearchQuery(search) {
    this.searchQuery = search;
  }

  setSort(sort) {
    this.sort = sort;
  }

  async getMake() {
    this.setLoading(true);
    const cacheKey = `Make_${this.pageIndex}_${this.searchQuery}_${this.sort}`;
    if (this.cache.has(cacheKey)) {
      const cacheData = this.cache.get(cacheKey);
      if (cacheData) {
        runInAction(() => {
          this.setMake(cacheData.data);
          this.setPageCount(cacheData.pageCount);
          this.setLoading(false);
        });
      }
    } else {
      const apiData = await Vehicles.Make.get({
        pageIndex: this.pageIndex,
        searchQuery: this.searchQuery,
        sort: this.sort,
      });
      runInAction(() => {
        this.setMake(apiData.data);
        this.setPageCount(apiData.pageCount);
        this.setLoading(false);
        this.cache.set(cacheKey, apiData);
      });
    }
  }

  async getSingleMake(id) {
    if (this.singleMakeId !== id) {
      this.setLoading(true);
      const apiData = await Vehicles.Make.getSingle(id);
      runInAction(() => {
        this.setSingleMake(apiData, id);
        this.setLoading(false);
      });
    }
  }

  async deleteMake(id) {
    await Vehicles.Make.delete(id);
    runInAction(() => {
      this.make = this.make.filter((item) => item.id !== id);
      this.cache.clear();
      this.setPageIndex(1);
    });
  }
}

export const makeStore = new VehicleMakeStore();
