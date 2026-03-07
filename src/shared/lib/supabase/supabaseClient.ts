import { env } from '@/shared/config';
import { createClient } from '@supabase/supabase-js';


export const supabaseClient = createClient(env.supabaseUrl, env.supabaseKey);