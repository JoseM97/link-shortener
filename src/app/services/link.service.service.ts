import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://iutluczpwicwyhadnkag.supabase.co',
      'sb_publishable_zcXdvWo_VlAyy0ftZN5vHQ_VfYvu8Kf',
      {
        auth: { persistSession: false }
      } 
    );
  }

  async addUrl(oldUrl: string) {
    const newUrl = nanoid(6);

    const { error } = await this.supabase
      .from('links')
      .insert({ new_url: newUrl, old_url: oldUrl });

    if (error) throw error;

    return { new_url: newUrl, old_url: oldUrl };
  }

  async getOriginalUrl(shortId: string) {
    const { data, error } = await this.supabase
      .from('links')
      .select('old_url')
      .eq('new_url', shortId)
      .single();

    if (error) return null;

    return data.old_url;
  }
}