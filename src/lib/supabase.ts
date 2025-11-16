import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Updated Database Types
export interface Database {
  public: {
    Tables: {
      institutes: {
        Row: {
          id: string
          name: string
          logo: string
          created_at: string
        }
      }
      courses: {
        Row: {
          id: string
          code: string
          name: string
          professor: string
          created_at: string
        }
      }
      lectures: {
        Row: {
          id: string
          number: number
          date: string
          topic: string
          course_id: string
          created_at: string
        }
      }
      lecture_content: {
        Row: {
          id: string
          lecture_id: string
          topic: string
          definition: string
          recording_url: string
          book_reference: string
          content_data: {
            topic: string
            details: string
            question: string
            animations: {
              code: string
              title: string
              video: string | null
              duration: string
            }[]
            book_references: string[]
          }[]
          created_at?: string
          updated_at?: string
        }
      }
      professors: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
        }
      }
      students: {
        Row: {
          id: string
          name: string
          email: string
          course_id: string | null
          year: string | null
          created_at: string
        }
      }
      doubts: {
        Row: {
          id: string
          course_id: string
          student_name: string
          question: string
          date: string
          reply: string | null
          created_at: string
        }
      }
    }
  }
}
