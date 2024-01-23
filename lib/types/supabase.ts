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
      expense_debtors: {
        Row: {
          amount: number
          created_at: string
          expense_id: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expense_id: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expense_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_debtors_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_debtors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      expense_payers: {
        Row: {
          amount: number
          created_at: string
          expense_id: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expense_id: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expense_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_payers_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_payers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      expenses: {
        Row: {
          amount: number
          created_at: string
          date: string
          description: string | null
          id: string
          type: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Insert: {
          amount: number
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          type: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          type?: Database["public"]["Enums"]["transaction_type_enum"]
        }
        Relationships: []
      }
      groups: {
        Row: {
          category: Database["public"]["Enums"]["group_type_enum"]
          created_at: string
          currency: string
          id: string
          name: string
        }
        Insert: {
          category: Database["public"]["Enums"]["group_type_enum"]
          created_at?: string
          currency?: string
          id?: string
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["group_type_enum"]
          created_at?: string
          currency?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          is_admin: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          is_admin?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          is_admin?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      group_type_enum: "friends" | "family" | "travel" | "work"
      transaction_type_enum: "payment" | "expense"
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
