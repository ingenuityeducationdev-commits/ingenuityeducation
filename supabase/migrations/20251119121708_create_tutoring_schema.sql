/*
  # Tutoring Business Database Schema

  1. New Tables
    - `teachers`
      - `id` (uuid, primary key)
      - `name` (text, teacher's full name)
      - `title` (text, professional title/role)
      - `qualifications` (text, academic credentials)
      - `bio` (text, detailed background)
      - `image_url` (text, profile photo URL)
      - `atar_score` (numeric, ATAR achievement if applicable)
      - `specializations` (text array, subject areas)
      - `display_order` (integer, for ordering on site)
      - `created_at` (timestamptz)
    
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text, course name)
      - `description` (text, course details)
      - `year_level` (text, e.g., "Year 11", "Year 12")
      - `subject` (text, subject area)
      - `duration_weeks` (integer, course length)
      - `class_size_max` (integer, maximum students)
      - `includes` (text array, what's included in course)
      - `display_order` (integer)
      - `is_active` (boolean, whether course is available)
      - `created_at` (timestamptz)
    
    - `pricing_options`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses)
      - `name` (text, e.g., "Termly", "Yearly")
      - `price` (numeric, price in dollars)
      - `original_price` (numeric, for showing discounts)
      - `billing_period` (text, e.g., "per term", "per year")
      - `savings_amount` (numeric, discount value)
      - `is_popular` (boolean, highlight as popular option)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (these are marketing pages)
    - No insert/update/delete policies needed as content will be managed via admin panel
*/

CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  qualifications text NOT NULL,
  bio text NOT NULL,
  image_url text DEFAULT '',
  atar_score numeric,
  specializations text[] DEFAULT '{}',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  year_level text NOT NULL,
  subject text NOT NULL,
  duration_weeks integer DEFAULT 10,
  class_size_max integer DEFAULT 6,
  includes text[] DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pricing_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  billing_period text NOT NULL,
  savings_amount numeric DEFAULT 0,
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers are publicly readable"
  ON teachers FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Courses are publicly readable"
  ON courses FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Pricing options are publicly readable"
  ON pricing_options FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS teachers_display_order_idx ON teachers(display_order);
CREATE INDEX IF NOT EXISTS courses_year_level_idx ON courses(year_level);
CREATE INDEX IF NOT EXISTS courses_display_order_idx ON courses(display_order);
CREATE INDEX IF NOT EXISTS pricing_options_course_id_idx ON pricing_options(course_id);