const { createClient } = require("@supabase/supabase-js");

// ✅ Replace with your actual Supabase project credentials
const SUPABASE_URL = "https://reqnpcukejtinwcawxjx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcW5wY3VrZWp0aW53Y2F3eGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODA5NzIsImV4cCI6MjA1Njg1Njk3Mn0.4aYi2xD0aEIKEOYA-8NPw1neC1SxvUlwokLnUYuc-IQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
