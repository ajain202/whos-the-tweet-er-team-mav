import {
  OAuthCredential,
  signInWithRedirect,
  signOut,
  TwitterAuthProvider,
  User,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandTwitter, Icon, Menu2, X } from 'tabler-icons-react';
import logo from '../../assets/images/logo.png';
import firebaseAuth from '../../firebase/firebase-client';
import Button from '../resusable-controls/button';

interface NavOptions {
  name: string;
  link: string;
  icon: Icon;
  active: boolean;
}

interface Props {
  session: User | null;
  setSession: React.Dispatch<React.SetStateAction<User | null>>;
  setOAuthCredential: React.Dispatch<React.SetStateAction<OAuthCredential | null>>;
}

function Navigation({ session, setSession, setOAuthCredential }: Props) {
  const [navOptions, setNavOptions] = useState<Array<NavOptions>>([]);
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const authHandler = () => {
    if (session) {
      signOut(firebaseAuth)
        .then(() => {
          setSession(null);
          setOAuthCredential(null);
          localStorage.clear();
          window.location.href = '/';
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      const provider = new TwitterAuthProvider();
      signInWithRedirect(firebaseAuth, provider);
    }
  };

  useEffect(() => {
    setNavOptions([
      {
        name: 'About',
        link: '/about',
        icon: BrandTwitter,
        active: window.location.pathname === '/about',
      },
    ]);
  }, [navigate]);

  const setCurrentNav = (clickedNav: string) => {
    setNavOptions(
      navOptions.map((nav) => {
        if (nav.name === clickedNav) return { ...nav, active: true };
        return { ...nav, active: false };
      }),
    );
  };

  return (
    <div className="bg-gray-200 h-full w-full">
      <nav className="bg-white shadow lg:block hidden">
        <div className="mx-auto container px-6 py-2 lg:py-0">
          <div className="flex items-center justify-between">
            <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
              <Link to="/" className="flex items-center" onClick={() => setCurrentNav('home')}>
                <img src={logo} alt="logo" style={{ width: '50px' }} />
                <h2 className="text-base font-bold leading-normal pl-3">Who's The Tweeter</h2>
              </Link>
            </div>
            <div className="flex">
              <div className="flex md:mr-6 lg:mr-16 xl:mr-32">
                {navOptions.map((nav) => (
                  <Link
                    to={nav.link}
                    key={nav.name}
                    className={`flex px-5 items-center py-6 text-sm leading-5 hover:bg-gray-100 focus:bg-gray-100 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none transition duration-150 ease-in-out ${
                      nav.active
                        ? 'border-b-2 border-b-indigo-700/50 bg-gray-100 text-indigo-700'
                        : ''
                    }`}
                    onClick={() => setCurrentNav(nav.name)}
                  >
                    <span className="mr-2">
                      <nav.icon strokeWidth={1.5} className="w-full h-full" />
                    </span>
                    {nav.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center">
                <Button label={session ? 'Logout' : 'Login'} type="button" onClick={authHandler} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-white shadow">
        <div
          className={`py-4 px-6 w-full flex lg:hidden justify-between items-center bg-white ${
            show ? 'fixed ' : ''
          }top-0 z-40`}
        >
          <div>
            <img src={logo} alt="logo" style={{ width: '50px' }} />
          </div>
          {show ? (
            ''
          ) : (
            <h2 className="text-base text-gray-700 font-bold leading-normal">Who's The Tweet-er</h2>
          )}
          <div className="flex items-center">
            <div id="menu" className="text-gray-800" onClick={() => setShow(!show)}>
              {show ? '' : <Menu2 strokeWidth={1.5} />}
            </div>
          </div>
        </div>
        {/* Mobile responsive sidebar */}
        <div
          className={
            show
              ? 'w-full lg:hidden h-full absolute z-40  transform  translate-x-0'
              : 'w-full lg:hidden h-full absolute z-40  transform -translate-x-full'
          }
        >
          <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
          <div className="w-64 z-40 fixed overflow-y-auto top-0 bg-white shadow h-full flex-col justify-between pb-4 transition duration-150 ease-in-out">
            <div className="px-6 h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <div className="mt-6 flex w-full items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <img src={logo} alt="logo" style={{ width: '50px' }} />
                        <h2 className="text-base text-gray-700 font-bold leading-normal ml-3">
                          Who's The Tweet-er
                        </h2>
                      </div>
                      <div id="cross" className="text-gray-800" onClick={() => setShow(!show)}>
                        <X strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                  <ul className="f-m-m">
                    {navOptions.map((nav) => (
                      <li className="text-gray-800 pt-8" key={nav.name}>
                        <Link
                          to={nav.link}
                          onClick={() => setShow(!show)}
                          className="cursor-pointer text-gray-700 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none transition duration-150 ease-in-out"
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6">
                              <nav.icon strokeWidth={1.5} className="w-full h-full" />
                            </div>
                            <p className="text-base ml-3 ">{nav.name}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full pt-4">
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between pt-1">
                      <Button
                        label={session ? 'Logout' : 'Login'}
                        type="button"
                        onClick={authHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
