
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios'
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
  const { setCurrentUser, setUserToken} = useStateContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ __html: '' });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: '' })

    axiosClient.post('/login', {
      email,
      password,
    })
    .then(({ data }) => {
      setCurrentUser(data.user)
      setUserToken(data.token)
    })
    .catch((error) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        setError({ __html: finalErrors.join('<br>') })
      }
      console.log(error)
    });
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <Link to="/signup" className='font-medium text-indigo-600 hover:text-indigo-500'>
            Signup for free
          </Link>
        </p>

        {error.__html && (<div className='bg-red-500 rounded py-2 px-3 text-white' dangerouslySetInnerHTML={error}></div>)}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
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
                value={password}
                onChange={ev => setPassword(ev.target.value)}
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
              Sign in
            </button>
          </div>
        </form>
        </div>
    </>
  )
}
