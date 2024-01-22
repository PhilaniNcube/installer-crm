import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {data: {session}} = await supabase.auth.getSession()

  if(session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account or Sign Up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <span className="font-medium">
            Connect with the world&apos;s professionals
          </span>
        </p>
      </div>
      <div className="space-x-5">
        <Link href="/login">
          <Button type="button">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button type="button" className="bg-blue-600">
            Create An Account
          </Button>
        </Link>
      </div>
    </main>
  );
}
