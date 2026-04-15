import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Fire Hacks — Bay Area's Premier High School Hackathon",
  description:
    'Fire Hacks is a one-day hackathon for 200–300 high school builders in Cupertino, CA. June 6, 2026. $30K+ in prizes. 100% free. Hosted by CodeStarters.',
  openGraph: {
    title: 'Fire Hacks — June 6, 2026',
    description: 'One-day high school hackathon in Cupertino, CA. $30K+ in prizes. 100% free.',
    type: 'website',
  },
}

export default function FireHacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
