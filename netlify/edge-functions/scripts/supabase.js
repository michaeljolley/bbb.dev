import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function getShortUrl(slug) {
  const { data, error } = await supabase
    .from('shorturls')
    .select()
    .eq('slug', slug);

  if (data && data[0] && data[0].target) {
    return data[0].target;
  }

  if (error) {
    console.error(error);
  }

  return undefined;
}