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

async function getShortUrl(slug) {
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

export default async function handler(req) {
  // Search for the placeholder
  const url = new URL(req.url);
  const slug = url.searchParams.get('path');

  if (slug) {
    try {
      const target = await getShortUrl(slug);

      if (target) {
        return Response.redirect(target, 301);
      } else {
        return Response.redirect('http://baldbeardedbuilder.com/404/', 404);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return Response.redirect('http://baldbeardedbuilder.com/', 301);
}

export const config = {
  path: '/api/smolify',
};
