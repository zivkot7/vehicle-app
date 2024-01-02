import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.VEHICLE_APP_SUPABASE_URL;
const supabaseKey = process.env.VEHICLE_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);