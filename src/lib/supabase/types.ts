/** Hand-written subset of the generated Supabase types (MVP scope). */

export type Guest = {
  id: string;
  full_name: string;
  is_attending: boolean;
  guest_count: number;
  dietary_restrictions: string | null;
  created_at: string;
};

export type GuestInsert = Omit<Guest, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      guests: {
        Row: Guest;
        Insert: GuestInsert;
        Update: Partial<GuestInsert>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
