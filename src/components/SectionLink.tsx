import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

/** Links to a section of the home page from anywhere, without relying on URL hashes. */
export default function SectionLink({
  to,
  children,
  className,
  onNavigate,
}: {
  to: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onNavigate?.()
    if (pathname === '/' && scrollToSection(to)) return
    navigate('/', { state: { section: to } })
  }
  return (
    <Link to="/" state={{ section: to }} onClick={onClick} className={className}>
      {children}
    </Link>
  )
}
