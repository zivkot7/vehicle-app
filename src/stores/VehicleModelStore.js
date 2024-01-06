import {
  observable,
  makeObservable,
  action,
  reaction,
  runInAction,
} from "mobx";
import { Vehicles } from "../services/Vehicles";

export class VehicleModelStore {
  models = [];
  make_id = "";
  singleModel = null;
  singleModelId = "";
  isLoading = false;
  pageIndex = 1;
  pageCount = 1;
  searchQuery = "";
  sort = "";
  cache = new Map();

  constructor() {
    makeObservable(this, {
      models: observable,
      singleModel: observable,
      make_id: observable,
      singleModelId: observable,
      pageIndex: observable,
      pageCount: observable,
      searchQuery: observable,
      isLoading: observable,
      sort: observable,
      setModels: action,
      setLoading: action,
      setSingleModel: action,
      deleteModel: action,
      setPageIndex: action,
      setPageCount: action,
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
        this.getModels(this.make_id);
      }
    );
  }

  setModels(apiData, id) {
    this.models = apiData;
    this.make_id = id;
  }

  setLoading(condition) {
    this.isLoading = condition;
  }

  setPageIndex(page) {
    this.pageIndex = page;
  }

  setPageCount(count) {
    this.pageCount = count;
  }

  setSearchQuery(search) {
    this.searchQuery = search;
  }

  setSingleModel(apiData, id) {
    this.singleModel = apiData;
    this.singleModelId = id;
  }

  setSort(sort) {
    this.sort = sort;
  }

  async getModels(id) {
    this.setLoading(true);
    const cacheKey = `Model_${this.pageIndex}_${this.searchQuery}_${id}_${this.sort}`;
    if (this.cache.has(cacheKey)) {
      const cacheData = this.cache.get(cacheKey);
      if (cacheData) {
        runInAction(() => {
          this.setModels(cacheData.data, id);
          this.setPageCount(cacheData.pageCount);
          this.setLoading(false);
        });
      }
    } else {
      const apiData = await Vehicles.Model.get({
        pageIndex: this.pageIndex,
        searchQuery: this.searchQuery,
        id,
        sort: this.sort,
      });
      runInAction(() => {
        this.setModels(apiData.data, id);
        this.setPageCount(apiData.pageCount);
        this.setLoading(false);
        this.cache.set(cacheKey, apiData);
      });
    }
  }

  async getSingleModel(id) {
    if (this.singleModelId !== id) {
      this.setLoading(true);
      const apiData = await Vehicles.Model.getSingle(id);
      runInAction(() => {
        this.setSingleModel(apiData, id);
        this.setLoading(false);
      });
    }
  }

  async deleteModel(id) {
    await Vehicles.Model.delete(id);
    runInAction(() => {
      this.models = this.models.filter((item) => item.id !== id);
      this.cache.clear();
      this.setPageIndex(1);
    });
  }
}

export const modelStore = new VehicleModelStore();
