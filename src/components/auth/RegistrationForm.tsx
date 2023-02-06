import { FormEvent, useRef } from 'react'
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export function RegistrationForm({ csrfToken }: { csrfToken?: string }) {
  const nameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const router = useRouter()

  async function onSubmitHandle(event: FormEvent) {
    event.preventDefault()
    const name = nameRef.current!.value!
    const email = emailRef.current!.value!
    const password = passwordRef.current!.value!
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    })
    if (response.ok) {
      await signIn('credentials', { email, password })
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={onSubmitHandle}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>

          <input type="hidden" name="remember" defaultValue="true"/>

          <div className="-space-y-px rounded-md shadow-sm">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              ref={nameRef}
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Display name"
            />
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              ref={emailRef}
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />

            <input
              id="password"
              name="password"
              ref={passwordRef}
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
