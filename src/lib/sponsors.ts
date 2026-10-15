export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "community";

export type Sponsor = {
  name: string;
  url?: string;
  /** Logo used on dark CodeStarters cards. */
  img?: string;
  /** Official logo used on light IceHacks cards, if different. */
  imgOnLight?: string;
  tier: SponsorTier;
  /** Invert a dark wordmark on CodeStarters' dark glass cards. */
  invertOnDark?: boolean;
  fitClass?: string;
  cardPadClass?: string;
  cardClass?: string;
};

export const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
  platinum: "Platinum / Title",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
  community: "Community",
};

export const SPONSOR_TIER_ORDER: SponsorTier[] = [
  "platinum",
  "gold",
  "silver",
  "bronze",
  "community",
];

export const SPONSORS: Sponsor[] = [
  {
    name: "Momen",
    url: "https://momen.app",
    img: "/sponsors/momen.png",
    tier: "platinum",
    fitClass: "h-20 max-w-[72%]",
    cardClass: "h-44 sm:h-48",
  },
  {
    name: "DeployXA",
    url: "https://deployxa.com",
    img: "/sponsors/deployxa.png",
    imgOnLight: "/sponsors/deployxa-lockup-dark.png",
    tier: "gold",
    fitClass: "h-12 max-w-[90%]",
    cardClass: "h-40",
  },
  {
    name: "Anakin",
    url: "https://anakin.io",
    img: "/sponsors/anakin.png",
    tier: "silver",
    fitClass: "h-16 max-w-[70%]",
  },
  {
    name: "Interview Cake",
    url: "https://www.interviewcake.com",
    img: "/sponsors/interviewcake.png",
    tier: "silver",
    fitClass: "h-16 max-w-[70%]",
  },
  {
    name: "Young Researchers Institute",
    url: "https://www.yriscience.com/",
    img: "/sponsors/yri.avif",
    tier: "silver",
    fitClass: "h-[4.5rem] max-w-[90%]",
  },
  {
    name: "Scrimba",
    url: "https://scrimba.com",
    img: "/sponsors/scrimba.png",
    tier: "silver",
    fitClass: "h-16 max-w-[72%]",
  },
  {
    name: "CodeCrafters",
    url: "https://codecrafters.io",
    img: "/sponsors/codecrafters.svg",
    tier: "silver",
    invertOnDark: true,
    fitClass: "h-16 max-w-[90%]",
  },
  {
    name: "Mobbin",
    url: "https://mobbin.com",
    img: "/sponsors/mobbin.svg",
    tier: "silver",
    fitClass: "h-14 max-w-[64%]",
  },
  {
    name: "SendCutSend",
    url: "https://www.sendcutsend.com",
    img: "/sponsors/sendcutsend.svg",
    imgOnLight: "/sponsors/sendcutsend-dark.svg",
    tier: "bronze",
    fitClass: "h-8 max-w-[92%]",
  },
  {
    name: "PCBWay",
    url: "https://www.pcbway.com",
    img: "/sponsors/pcbway.svg",
    tier: "bronze",
    fitClass: "h-12 max-w-[90%]",
  },
  {
    name: "Gen.xyz",
    url: "https://gen.xyz",
    img: "/sponsors/genxyz.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-14 max-w-[88%]",
  },
  {
    name: "Medo",
    url: "https://medo.com",
    img: "/sponsors/medo.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-14 max-w-[86%]",
  },
  {
    name: "Featherless AI",
    url: "https://featherless.ai",
    img: "/sponsors/featherless.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-[4.5rem] max-w-[94%]",
  },
  {
    name: "n8n",
    url: "https://n8n.io",
    img: "/sponsors/n8n.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-16 max-w-[88%]",
  },
  {
    name: "InsForge",
    url: "https://insforge.dev/",
    img: "/sponsors/insoforge.svg",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-20 max-w-[72%]",
  },
  {
    name: "Exea Labs",
    img: "/sponsors/exea-labs.png",
    tier: "community",
    fitClass: "h-[8rem] max-w-full",
    cardPadClass: "p-1",
  },
  {
    name: "Publick",
    url: "https://publick.xyz",
    img: "/sponsors/publick.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-[4.75rem] max-w-[96%]",
  },
  {
    name: "Guild.ai",
    url: "https://www.guild.ai/",
    img: "/sponsors/guild-ai.png",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-[6rem] max-w-full",
  },
  {
    name: "Rork",
    url: "https://rork.com",
    img: "/sponsors/rork.avif",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-14 max-w-[88%]",
  },
  {
    name: "Render",
    url: "https://render.com",
    img: "/sponsors/adrender.avif",
    tier: "community",
    invertOnDark: true,
    fitClass: "h-14 max-w-[88%]",
  },
];

export function sponsorsByTier(tier: SponsorTier) {
  return SPONSORS.filter((sponsor) => sponsor.tier === tier);
}

export function sponsorLogoSrc(sponsor: Sponsor, onLight: boolean) {
  if (onLight && sponsor.imgOnLight) return sponsor.imgOnLight;
  return sponsor.img;
}
