import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  full_name?: string;
  plan_type: string;
  purchased_otos: string[];
  created_at: string;
  subscription_status: string;
  usage_limits: {
    content_limit: number;
    research_limit: number;
  };
  affiliate_settings: Record<string, any>;
  stripe_customer_id?: string;
};

export type ContentJob = {
  id: string;
  user_id: string;
  input_type: 'url' | 'text' | 'keyword' | 'competitor';
  input_content: string;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  output_content: Record<string, any>;
  platforms_generated: string[];
  created_at: string;
  completed_at?: string;
  error_message?: string;
};

export type AffiliateLink = {
  id: string;
  user_id: string;
  content_job_id?: string;
  original_url: string;
  shortened_url?: string;
  affiliate_network?: string;
  product_id?: string;
  clicks: number;
  conversions: number;
  earnings: number;
  created_at: string;
};
