/*
  # Fix Function Search Path Security Issue

  1. Security Fix
    - Update `update_updated_at_column` function to have immutable search_path
    - Prevents search path hijacking vulnerabilities by explicitly setting search_path
    - Uses `SET search_path = ''` to ensure function uses fully qualified names only

  This addresses the security warning: "Function has a role mutable search_path"
*/

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;