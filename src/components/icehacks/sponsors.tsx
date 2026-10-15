import {
  SPONSOR_TIER_LABELS,
  SPONSOR_TIER_ORDER,
  sponsorLogoSrc,
  sponsorsByTier,
  type Sponsor,
  type SponsorTier,
} from "@/lib/sponsors";

const GRID: Record<SponsorTier, string> = {
  platinum: "xl",
  gold: "lg",
  silver: "md",
  bronze: "sm",
  community: "sm",
};

function Slot({ sponsor }: { sponsor: Sponsor }) {
  const src = sponsorLogoSrc(sponsor, true);
  const inner = src ? (
    <img src={src} alt={sponsor.name} />
  ) : (
    <span className="sponsor-name">{sponsor.name}</span>
  );

  if (!sponsor.url) {
    return <div className="sponsor-slot">{inner}</div>;
  }

  return (
    <a href={sponsor.url} target="_blank" rel="noreferrer" className="sponsor-slot">
      {inner}
    </a>
  );
}

export function Sponsors() {
  return (
    <section id="sponsors" className="py-20">
      <div className="wrap">
        <p className="kick">Sponsors</p>
        <h2 className="sec-h">
          The people who keep
          <br />
          the ice <em>frozen</em>.
        </h2>
        {SPONSOR_TIER_ORDER.map((tier) => {
          const list = sponsorsByTier(tier);
          if (!list.length) return null;
          return (
            <div key={tier} className="sponsor-row">
              <p className="kick">{SPONSOR_TIER_LABELS[tier]}</p>
              <div className={`sponsor-grid ${GRID[tier]} stagger`}>
                {list.map((sponsor) => (
                  <Slot key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
