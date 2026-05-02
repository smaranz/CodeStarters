import type { Metadata } from 'next'
import { DM_Sans, Space_Mono } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fh-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fh-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fire Hacks Portal',
  description: 'Participant portal for Fire Hacks 2026.',
  robots: { index: false, follow: false },
}

export default function FireHacksPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${spaceMono.variable} min-h-screen bg-[#0a0a0a] text-zinc-100`}>
      {children}
    </div>
  )
}
