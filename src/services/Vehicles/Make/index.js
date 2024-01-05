import { supabase } from "./../../Supabase";

const PAGE_SIZE = 8;

export class Make {
  static makeEndpoint = "vehicle_make";

  static get = async ({ pageIndex, searchQuery, sort }) => {
    const range = pageIndex ? pageIndex - 1 : 0;
    const offset = range * PAGE_SIZE;
    let query = supabase
      .from(this.makeEndpoint)
      .select("*", { count: "exact" });

    const sortActions = {
      "NameA ": () => query.order("name", { ascending: true }),
      "NameD ": () => query.order("name", { ascending: false }),
      "ManufacturerA ": () => query.order("manufacturer", { ascending: true }),
      "ManufacturerD ": () => query.order("manufacturer", { ascending: false }),
    };

    if (sort && sortActions.hasOwnProperty(sort)) {
      query = sortActions[sort]();
    }

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,abrv.ilike.%${searchQuery}%,manufacturer.ilike.%${searchQuery}%`
      );
    }

    if (offset) {
      query = query.range(offset, offset + PAGE_SIZE - 1);
    }

    const { data, error, count } = await query.limit(8);

    if (error) {
      throw new Error(error.message);
    }

    const PAGE_COUNT = count !== null ? Math.ceil(count / PAGE_SIZE) : 0;

    return {
      data: data ?? [],
      pageCount: PAGE_COUNT,
    };
  };

  static getSingle = async (id) => {
    let query = supabase
      .from(this.makeEndpoint)
      .select("*")
      .eq("id", id)
      .single();
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  static create = async (values) => {
    const { error } = await supabase.from(this.makeEndpoint).insert(values);
    if (error) {
      throw new Error(error.message);
    }
  };

  static edit = async (values) => {
    const { error } = await supabase
      .from(this.makeEndpoint)
      .update(values)
      .eq("id", values.id);
    if (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (id) => {
    const { error } = await supabase
      .from(this.makeEndpoint)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  };

  static getFileURL = async (key, storage = "uploads") => {
    const { data } = supabase.storage.from(storage).getPublicUrl(key);
    return data?.publicUrl;
  };

  static uploadFile = async ({ file, storageName }) => {
    const fileName = file.name.split(".");
    const fileExt = fileName.pop();

    const filePath = `${fileName.join("")}-${new Date().getTime()}.${fileExt}`;
    const filePathWithoutSpaces = filePath.replace(/\s/g, "");

    const { error } = await supabase.storage
      .from(storageName)
      .upload(filePathWithoutSpaces, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
    if (error) throw error;

    return this.getFileURL(filePathWithoutSpaces, storageName);
  };
}
