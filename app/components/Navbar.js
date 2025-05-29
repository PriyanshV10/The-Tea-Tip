"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click - solved using onBlur()

  return (
    <nav className="px-4 py-2 pt-3 text-white flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        The Tea Tip
      </Link>

      <div className="relative" ref={dropdownRef}>
        {session ? (<>
          <button
            onBlur={() => setTimeout(() => {
              setDropdownOpen(false)
            }, 100)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer focus:outline-none "
          >
            <img
              src={session.user.image || "avatar.gif"}
              width={44}
              height={44}
              alt="Avatar"
              className="rounded-full"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 text-white w-fit bg-gray-700 rounded-lg shadow-lg z-50">
              <ul className="py-2 text-sm ">
                <li className="text-sm px-4 py-1 pb-2 w-fit whitespace-nowrap">
                  {session.user.email}
                </li>
                <div className="bg-gray-500 h-0.5"></div>
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href={`/user/${session.user.name}`} className="block px-4 py-2 hover:bg-blue-700">
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut({callbackUrl: "/"})}
                    className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-blue-700"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
        ) : (<Link href="/login">
          <button className="cursor-pointer text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Log In
          </button>
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
