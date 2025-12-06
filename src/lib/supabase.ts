import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Teacher = {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  bio: string;
  image_url: string;
  atar_score: number | null;
  specializations: string[];
  display_order: number;
  created_at: string;
};

export type Course = {
  id: string;
  name: string;
  description: string;
  year_level: string;
  subject: string;
  duration_weeks: number;
  class_size_max: number;
  includes: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type PricingOption = {
  id: string;
  course_id: string;
  name: string;
  price: number;
  original_price: number | null;
  billing_period: string;
  savings_amount: number;
  is_popular: boolean;
  created_at: string;
};

export type IntensiveProgram = {
  id: string;
  name: string;
  description: string;
  price: number;
  year_level: string;
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
};
