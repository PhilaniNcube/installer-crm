import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page'))

  //list how many products per page
  const perPage = 10

  //calculate the start and end points
  const start = (page - 1) * perPage

  //calculate the end points
  const end = (page * perPage) + 1

  //fetch a list of paginated products from supabase inside a tyrcatch block
  try {
    const { data: products, error, count } = await supabase.from('products').select('*', {count: "exact"}).range(start, end).order("name", {ascending: true})

    if (error) {
     return NextResponse.json({products: null, count: null, error: "Error: " + error.message})
    }

    return NextResponse.json({products, count, error: null})

  } catch (err) {
    console.error(err)
    return NextResponse.json({products: null, count: null, error: "Error: Server Error"})
  }

}
