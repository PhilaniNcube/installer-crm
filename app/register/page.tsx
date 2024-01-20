/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Oyybf8JwqLs
 */
import { signUp } from "@/actions/auth/sign-up";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <form action={signUp} className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="first_name"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="first_name"
                  name="first_name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="last_name"
                  name="last_name"
                  required
                  type="text"
                />
              </div>
            </div>
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
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-gray-900"
                  htmlFor="terms"
                >
                  I agree to the
                  <Link
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    href="#"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
            <div>
              <SubmitButton className="w-full">
                Sign Up
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
