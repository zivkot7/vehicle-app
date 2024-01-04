import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zhlupivvxuzonfgvquzn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobHVwaXZ2eHV6b25mZ3ZxdXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MDY2MjIsImV4cCI6MjAxOTE4MjYyMn0.tTUAdcF2T-s8jcfzLJ0nSDbr5uGJd_R05KujXE7RXHg";
export const supabase = createClient(supabaseUrl, supabaseKey);
