/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Oyybf8JwqLs
 */
import { signIn } from "@/actions/auth/sign-in";
import SubmitButton from "@/components/submit-button";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form action={signIn} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  required
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </div>
            </div>
            <div>
              <SubmitButton className="w-full">Sign In</SubmitButton>
            </div>
          </div>{" "}
          <span className="flex mt-2">
            <p className="text-sm">
              Don&apos;t have an account,{" "}
              <Link className="text-blue-600" href="/register">
                Sign Up
              </Link>
            </p>{" "}
          </span>
        </div>
      </form>
    </main>
  );
}
