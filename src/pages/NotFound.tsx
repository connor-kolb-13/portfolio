import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-[80dvh] max-w-(--container) place-content-center px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-5xl sm:text-7xl">This page went fishing.</h1>
      <Link to="/" className="mx-auto mt-10 inline-flex h-12 items-center rounded-pill bg-brass px-6 text-brass-ink">
        Back home
      </Link>
    </main>
  )
}
