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

export const BLOG_CATEGORIES = ['Teknik', 'Teknoloji', 'Rehber', 'Sürdürülebilirlik', 'Diğer'] as const;

export function normalizeCategory(category: string | null | undefined): string {
  if (!category) return 'Diğer';
  const cat = category.toLowerCase().trim();
  if (cat.includes('rehber')) return 'Rehber';
  if (cat.includes('teknik')) return 'Teknik';
  if (cat.includes('teknoloji')) return 'Teknoloji';
  if (cat.includes('sürdürülebilirlik')) return 'Sürdürülebilirlik';

  // Check for exact matches in BLOG_CATEGORIES
  const match = BLOG_CATEGORIES.find(c => c.toLowerCase() === cat);
  return match || 'Diğer';
}
