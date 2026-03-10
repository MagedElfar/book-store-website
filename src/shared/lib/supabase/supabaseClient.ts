import { createClient } from '@supabase/supabase-js';

import { env } from '@/shared/config';


export const supabaseClient = createClient(env.supabaseUrl, env.supabaseKey);