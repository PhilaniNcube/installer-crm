export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contractors: {
        Row: {
          city: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lead_id: string
          phone: string | null
          postal_code: string | null
          suburb: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lead_id: string
          phone?: string | null
          postal_code?: string | null
          suburb?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lead_id?: string
          phone?: string | null
          postal_code?: string | null
          suburb?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          }
        ]
      }
      enquiries: {
        Row: {
          contractor_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          status: string
        }
        Insert: {
          contractor_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          status?: string
        }
        Update: {
          contractor_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enquiries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      installations: {
        Row: {
          contractor_id: string | null
          cost: number
          created_at: string
          customer_id: string
          id: string
          installation_date: string | null
          status: string
        }
        Insert: {
          contractor_id?: string | null
          cost?: number
          created_at?: string
          customer_id: string
          id?: string
          installation_date?: string | null
          status?: string
        }
        Update: {
          contractor_id?: string | null
          cost?: number
          created_at?: string
          customer_id?: string
          id?: string
          installation_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "installations_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      lead_notes: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          note: string
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id: string
          note: string
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string
          postal_code: string | null
          source: string | null
          status: string
          suburb: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone: string
          postal_code?: string | null
          source?: string | null
          status?: string
          suburb?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string
          postal_code?: string | null
          source?: string | null
          status?: string
          suburb?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quote_products: {
        Row: {
          product_id: string
          quantity: number
          quote_id: string
        }
        Insert: {
          product_id: string
          quantity?: number
          quote_id: string
        }
        Update: {
          product_id?: string
          quantity?: number
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_products_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          }
        ]
      }
      quote_status: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "quote_status"
            referencedColumns: ["id"]
          }
        ]
      }
      site_visits: {
        Row: {
          contractor_id: string
          created_at: string
          date: string
          id: string
          lead_id: string
          status: string | null
        }
        Insert: {
          contractor_id: string
          created_at?: string
          date: string
          id?: string
          lead_id: string
          status?: string | null
        }
        Update: {
          contractor_id?: string
          created_at?: string
          date?: string
          id?: string
          lead_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_visits_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_visits_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_visits_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "visit_status"
            referencedColumns: ["id"]
          }
        ]
      }
      visit_status: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
