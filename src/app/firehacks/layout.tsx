import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Fire Hacks — Bay Area's Premier High School Hackathon",
  description:
    'Fire Hacks is a 24-hour hackathon for 200–300 high school builders in Cupertino, CA. June 6–7, 2026. $30K+ in prizes. 100% free. Hosted by CodeStarters.',
  openGraph: {
    title: 'Fire Hacks — June 6–7, 2026',
    description: '24-hour high school hackathon in Cupertino, CA. $30K+ in prizes. 100% free.',
    type: 'website',
  },
}

export default function FireHacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
