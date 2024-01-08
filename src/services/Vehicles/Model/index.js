import { supabase } from "../../Supabase";

const PAGE_SIZE = 8;
export class Model {
  static modelEndpoint = "vehicle_model";

  static get = async ({ pageIndex, searchQuery, id, sort, colorSort }) => {
    const range = pageIndex ? pageIndex - 1 : 0;
    const offset = range * PAGE_SIZE;
    let query = supabase
      .from(this.modelEndpoint)
      .select("*", { count: "exact" })
      .eq("make_id", id);

    const sortActions = {
      "NameA ": () => query.order("name", { ascending: true }),
      "NameD ": () => query.order("name", { ascending: false }),
      "yearA ": () => query.order("year", { ascending: true }),
      "yearD ": () => query.order("year", { ascending: false }),
    };

    if (sort && sortActions.hasOwnProperty(sort)) {
      query = sortActions[sort]();
    }

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,color.ilike.%${searchQuery}%,engine.ilike.%${searchQuery},transmission.ilike.%${searchQuery}`
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

  static getColors = async (id) => {
    let query = supabase
      .from(this.modelEndpoint)
      .select("color")
      .eq("make_id", id);
    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    const colorsWithValues = data.map((color) => ({
      value: color.color,
      label: color.color,
    }));

    return colorsWithValues;
  };

  static getSingle = async (id) => {
    let query = supabase
      .from(this.modelEndpoint)
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
    const { error } = await supabase.from(this.modelEndpoint).insert(values);
    if (error) {
      throw new Error(error.message);
    }
  };

  static edit = async (values) => {
    const { error } = await supabase
      .from(this.modelEndpoint)
      .update(values)
      .eq("id", values.id);
    if (error) {
      throw new Error(error.message);
    }
  };

  static delete = async (id) => {
    const { error } = await supabase
      .from(this.modelEndpoint)
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
