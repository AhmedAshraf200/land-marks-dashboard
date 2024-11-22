'use client'
import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo'
import { getUsername, isLoggedIn, logout } from '@/app/(auth)/(utils)/helpers/auth.helper'

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const links = [
    { id: '1', label: 'Landmarks' },
    { id: '2', label: 'Cities' },
    { id: '3', label: 'Tags' }
  ]

  useEffect(() => {
    setIsAuth(isLoggedIn())
  }, [])
  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map(link => (
          <NavbarItem key={link.id}> {/* Don't forget to add a unique key for each iterated item */}
            <Link color="foreground" href={`/${link.label}`.toLowerCase()}>
              {link.label} {/* Assuming 'label' and 'url' are properties of your 'link' object */}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {isAuth ? isAuthNavbar(): notAuthNavbar()}
    </Navbar>
  )
}

const notAuthNavbar = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/sign-up" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  )
}

const isAuthNavbar = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/login" onClick={logout}>Logout</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/profile" variant="flat">
          {getUsername()}
        </Button>
      </NavbarItem>
    </NavbarContent>
  )
}