import { profile } from '../content'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-(--container) flex-col gap-4 px-5 py-10 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]">Designed and built by me</p>
      </div>
    </footer>
  )
}
