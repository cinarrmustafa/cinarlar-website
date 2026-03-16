import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your .env file.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  rejection_count: number;
  created_at: string;
};
