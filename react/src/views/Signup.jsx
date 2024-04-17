
import { LockClosedIcon } from '@heroicons/react/20/solid'

export default function Signup() {
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign up for free
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <a href="#" className='font-medium text-indigo-600 hover:text-indigo-500'>
            start your 14-day free trial
          </a>
        </p>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden="true" />
              </span>
              Sign up
            </button>
          </div>
        </form>
        </div>
    </>
  )
}
