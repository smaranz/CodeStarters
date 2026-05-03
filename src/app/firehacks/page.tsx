'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { SPONSORSHIP_PROSPECTUS_PAGE_PATH } from '@/lib/sponsor-prospectus'
import { DM_Sans, Space_Mono } from 'next/font/google'
import s from './firehacks.module.css'

const LUMA_EVENT_HREF = 'https://luma.com/event/evt-teYwe8vJ6Eqne8d'
const LUMA_EVENT_ID = 'evt-teYwe8vJ6Eqne8d'

function RegisterLink({
  className,
  children = 'Register for Event',
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <a
      href={LUMA_EVENT_HREF}
      className={`luma-checkout--button ${className ?? ''}`}
      data-luma-action="checkout"
      data-luma-event-id={LUMA_EVENT_ID}
    >
      {children}
    </a>
  )
}

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

export default function FireHacksPage() {
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  // Scroll reveal
  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(s.visible)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px 15% 0px' }
    )
    page.querySelectorAll(`.${s.reveal}`).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Nav scroll state
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => nav.classList.toggle(s.scrolled, window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Mobile menu
  useEffect(() => {
    const toggle = toggleRef.current
    const links = linksRef.current
    if (!toggle || !links) return

    const handleToggle = () => {
      toggle.classList.toggle(s.active)
      links.classList.toggle(s.open)
    }
    toggle.addEventListener('click', handleToggle)

    const anchors = links.querySelectorAll('a')
    const handleAnchorClick = () => {
      toggle.classList.remove(s.active)
      links.classList.remove(s.open)
    }
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick))

    return () => {
      toggle.removeEventListener('click', handleToggle)
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick))
    }
  }, [])

  return (
    <div ref={pageRef} className={`${s.page} ${dmSans.variable} ${spaceMono.variable}`}>
      {/* NAV — liquid glass oval capsule */}
      <nav ref={navRef} className={s.nav}>
        <div className={s.navAlign}>
          <div className={s.navGlass}>
            <a href="#" className={s.navLogo}>
              <span className={s.navLogoIcon}>
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2L28 16L16 30L4 16L16 2Z" fill="#EF4444" opacity="0.9" />
                  <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#0A0A0A" />
                </svg>
              </span>
              Fire Hacks
            </a>
            <div ref={linksRef} className={s.navLinks}>
              <a href="#about">About</a>
              <a href="#tracks">Tracks</a>
              <a href="#sponsors">Sponsors</a>
              <Link href={SPONSORSHIP_PROSPECTUS_PAGE_PATH}>Prospectus</Link>
              <a href="#faq">FAQ</a>
              <div className={s.navDrawerCta}>
                <RegisterLink className={`${s.btn} ${s.btnPrimary} ${s.btnSm} ${s.navDrawerRegister}`} />
              </div>
            </div>
            <div className={s.navCta}>
              <RegisterLink className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} />
            </div>
            <button ref={toggleRef} type="button" className={s.navToggle} aria-label="Toggle menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroContent}>
          <p className={`${s.heroEyebrow} ${s.reveal}`}>
            Bay Area&apos;s Premier High School Hackathon
            <span className={s.eyebrowDot} />
            Bay Area
          </p>
          <h1 className={`${s.heroTitle} ${s.reveal} ${s.d1}`}>
            <span className={s.firePart}>FIRE</span>
            <br />
            <span className={s.hacksPart}>HACKS</span>
          </h1>
          <div className={`${s.reveal} ${s.d2}`}>
            <span className={s.heroDateBadge}>
              <span className={s.pulseDot} />
              June 6, 2026
            </span>
          </div>
          <p className={`${s.heroSub} ${s.reveal} ${s.d2}`}>
            A full day of building, learning, and shipping. Join 200+ high school hackers for the Bay
            Area&apos;s most electric hackathon.
          </p>
          <div id="apply" className={`${s.heroCtas} ${s.applyAnchor} ${s.reveal} ${s.d3}`}>
            <RegisterLink className={`${s.btn} ${s.btnPrimary}`} />
            <a href="#sponsors" className={`${s.btn} ${s.btnOutline}`}>
              Become a Sponsor
            </a>
            <Link href={SPONSORSHIP_PROSPECTUS_PAGE_PATH} className={`${s.btn} ${s.btnOutline}`}>
              View prospectus
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={s.stats}>
        <div className={s.container}>
          <div className={s.statsGrid}>
            <div className={`${s.statCard} ${s.reveal}`}>
              <div className={s.statNumber}>200–300</div>
              <div className={s.statLabel}>Hackers</div>
            </div>
            <div className={`${s.statCard} ${s.reveal} ${s.d1}`}>
              <div className={s.statNumber}>1 day</div>
              <div className={s.statLabel}>Of Building</div>
            </div>
            <div className={`${s.statCard} ${s.reveal} ${s.d2}`}>
              <div className={s.statNumber}>$30K+</div>
              <div className={s.statLabel}>In Prizes</div>
            </div>
            <div className={`${s.statCard} ${s.reveal} ${s.d3}`}>
              <div className={s.statNumber}>100%</div>
              <div className={s.statLabel}>Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={s.section} id="about">
        <div className={s.container}>
          <div className={s.aboutGrid}>
            <div className={s.reveal}>
              <p className={s.sectionLabel}>About the Event</p>
              <h2 className={s.sectionTitle}>
                What is <span className={s.accentText}>Fire Hacks</span>?
              </h2>
              <div className={s.aboutProse}>
                <p>
                  Fire Hacks is a one-day hackathon designed for high school builders who want to
                  ship real projects, learn from mentors, and connect with the Bay Area&apos;s next
                  generation of engineers.
                </p>
                <p>
                  Whether you&apos;re building your first app or training your tenth model, Fire
                  Hacks gives you the space, resources, and community to create something you&apos;re
                  proud of — in one packed day.
                </p>
                <p>
                  Hosted by{' '}
                  <a
                    href="https://codestarters.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-dim)' }}
                  >
                    CodeStarters
                  </a>
                  , a student-led 501(c)(3) fiscally sponsored nonprofit teaching CS and AI to
                  younger students. All sponsorships are tax-deductible.
                </p>
              </div>
            </div>
            <div className={`${s.aboutCard} ${s.reveal} ${s.d1}`}>
              <h3>{'// '}Why we&apos;re different</h3>
              <ul>
                <li>Software-only: web, mobile, AI/ML — no hardware constraints</li>
                <li>A full day of focused building time</li>
                <li>Workshops on AI/ML, full-stack dev, and product design</li>
                <li>Mentors from industry and university on site all day</li>
                <li>Full meals, snacks, and caffeine provided</li>
                <li>100% free — no registration fee, ever</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className={s.section} id="tracks" style={{ paddingTop: '20px' }}>
        <div className={s.container} style={{ textAlign: 'center' }}>
          <p className={`${s.sectionLabel} ${s.reveal}`}>Build What You Want</p>
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>Tracks</h2>
          <div className={s.tracksGrid}>
            <div className={`${s.trackCard} ${s.reveal}`}>
              <div className={s.trackIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Web Dev</h3>
            </div>
            <div className={`${s.trackCard} ${s.reveal} ${s.d1}`}>
              <div className={s.trackIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92L12 10v2" />
                  <circle cx="12" cy="17" r="5" />
                  <path d="M10 17h4" />
                  <path d="M12 15v4" />
                </svg>
              </div>
              <h3>AI / ML</h3>
            </div>
            <div className={`${s.trackCard} ${s.reveal} ${s.d2}`}>
              <div className={s.trackIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
              </div>
              <h3>Mobile Dev</h3>
            </div>
            <div className={`${s.trackCard} ${s.reveal} ${s.d3}`}>
              <div className={s.trackIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Cybersecurity</h3>
            </div>
            <div className={`${s.trackCard} ${s.reveal} ${s.d4}`}>
              <div className={s.trackIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                  <polyline points="2 15.5 12 8.5 22 15.5" />
                  <line x1="12" y1="2" x2="12" y2="8.5" />
                </svg>
              </div>
              <h3>Game Dev</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className={`${s.section} ${s.sponsorSection}`} id="sponsors">
        <div className={`${s.container} ${s.sponsorContainer}`} style={{ textAlign: 'center' }}>
          <p className={`${s.sectionLabel} ${s.sponsorEyebrow} ${s.reveal}`}>Our Sponsors</p>
          <h2 className={`${s.sectionTitle} ${s.sponsorHeadline} ${s.reveal}`}>Backed by Builders</h2>
          <div className={`${s.sponsorsGrid} ${s.reveal} ${s.d1}`}>
            <a
              href="https://codecrafters.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/codecrafters.svg" alt="CodeCrafters" />
            </a>
            <a
              href="https://gen.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/genxyz.png" alt="Gen.xyz" />
            </a>
            <a
              href="https://relay.app"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sponsors/relay.webp" alt="Relay" />
            </a>
            <a
              href="https://medo.com"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.sponsorLogoMedo} src="/sponsors/medo.png" alt="Medo" />
            </a>
            <a
              href="https://featherless.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.sponsorLogoFeatherless} src="/sponsors/featherless.png" alt="Featherless AI" />
            </a>
            <a
              href="https://n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.sponsorLogoN8n} src="/sponsors/n8n.png" alt="n8n" />
            </a>
            <a
              href="https://publick.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.sponsorLogoPublick} src="/sponsors/publick.png" alt="Publick" />
            </a>
            <a
              href="https://zo.computer/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sponsorPill}
              style={{ background: 'var(--accent)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.sponsorLogoZo} src="/sponsors/zo-computer.png" alt="Zo Computer" />
            </a>
          </div>
        </div>
        <div className={`${s.sponsorCtaBleed} ${s.reveal} ${s.d2}`}>
          <div className={`${s.container} ${s.sponsorContainer}`}>
            <div className={s.sponsorCta}>
              <h3>
                Become a <span className={s.accentText}>Sponsor</span>
              </h3>
              <p>
                Help us put on the Bay Area&apos;s best high school hackathon. Your sponsorship is
                tax-deductible through our 501(c)(3) fiscal sponsor and directly funds prizes, meals,
                and resources for 200+ student builders.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <a
                  href="mailto:codestarters26@gmail.com?subject=Fire%20Hacks%20Sponsorship"
                  className={`${s.btn} ${s.btnPrimary}`}
                >
                  Get in Touch
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <Link href={SPONSORSHIP_PROSPECTUS_PAGE_PATH} className={`${s.btn} ${s.btnOutline}`}>
                  View prospectus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={s.section} id="faq">
        <div className={s.container} style={{ textAlign: 'center' }}>
          <p className={`${s.sectionLabel} ${s.reveal}`}>Got Questions?</p>
          <h2 className={`${s.sectionTitle} ${s.reveal}`}>FAQ</h2>
          <div className={s.faqList}>
            <details className={`${s.faqItem} ${s.reveal}`}>
              <summary>
                What is Fire Hacks?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                Fire Hacks is a one-day in-person hackathon for high school students in the Bay Area. It&apos;s organized by CodeStarters and focused entirely on software — web,
                mobile, and AI/ML. You&apos;ll build a project from scratch, attend workshops, eat
                great food, and compete for $30K+ in prizes.
              </div>
            </details>
            <details className={`${s.faqItem} ${s.reveal} ${s.d1}`}>
              <summary>
                Who can attend?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                Any current high school student (grades 9–12) can apply. No prior hackathon or
                coding experience is required — we&apos;ll have beginner-friendly workshops and
                mentors to help you get started.
              </div>
            </details>
            <details className={`${s.faqItem} ${s.reveal} ${s.d1}`}>
              <summary>
                How much does it cost?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                Nothing. Fire Hacks is 100% free to attend. Meals, snacks, swag, and everything
                else are fully covered by our sponsors.
              </div>
            </details>
            <details className={`${s.faqItem} ${s.reveal} ${s.d2}`}>
              <summary>
                What should I build?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                Anything software-based. You can choose from tracks like Web Development, AI/ML,
                Mobile App Dev, Cybersecurity, or Game Dev. Build something that solves a real
                problem, explores a new technology, or is just plain fun.
              </div>
            </details>
            <details className={`${s.faqItem} ${s.reveal} ${s.d2}`}>
              <summary>
                How do I become a sponsor?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                We&apos;d love to hear from you! Email us at{' '}
                <a
                  href="mailto:codestarters26@gmail.com"
                  style={{ color: 'var(--accent)' }}
                >
                  codestarters26@gmail.com
                </a>
                , or view our{' '}
                <Link href={SPONSORSHIP_PROSPECTUS_PAGE_PATH} style={{ color: 'var(--accent)' }}>
                  sponsorship prospectus
                </Link>
                . All sponsorships are
                tax-deductible through our 501(c)(3) fiscal sponsor.
              </div>
            </details>
            <details className={`${s.faqItem} ${s.reveal} ${s.d3}`}>
              <summary>
                Where will sponsor money go?
                <span className={s.faqIcon}>+</span>
              </summary>
              <div className={s.faqAnswer}>
                Every dollar goes directly toward making Fire Hacks happen: venue rental, meals and
                snacks for all attendees, prizes, swag, workshop materials, and event logistics.
                We&apos;re a nonprofit — there&apos;s no profit motive here.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerInner}>
            <div className={s.footerLeft}>
              <a
                href="https://codestarters.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className={s.footerLogo}
              >
                CodeStarters
              </a>
              <div className={s.footerSep} />
              <span className={s.footerText}>Fire Hacks is a CodeStarters event.</span>
            </div>
            <div className={s.footerLinks}>
              <a href="https://codestarters.xyz" target="_blank" rel="noopener noreferrer">
                codestarters.xyz
              </a>
              <a href="mailto:codestarters26@gmail.com">codestarters26@gmail.com</a>
              <span className={s.footerText}>&copy; 2026</span>
            </div>
          </div>
        </div>
      </footer>

      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" strategy="afterInteractive" />
    </div>
  )
}
