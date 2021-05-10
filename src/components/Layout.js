import Link from 'next/link';

export const Layout = ({ children }) => {
  return (
    <div className='mx-auto max-w-xl bg-gray-200 my-8'>
      <header>
        <h1 className='text-4xl text-center font-bold'>Templater</h1>
        <nav className='my-4'>
          <ul className='flex flex-row justify-center space-x-4'>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/list'>
                <a>Video List</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
