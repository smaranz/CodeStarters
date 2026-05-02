"use client";

import Link from "next/link";
import { DM_Sans, Space_Mono } from "next/font/google";
import {
    SPONSORSHIP_PROSPECTUS_DOWNLOAD_FILENAME,
    SPONSORSHIP_PROSPECTUS_PDF_PATH,
} from "@/lib/sponsor-prospectus";
import s from "../firehacks.module.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-fh-body",
    display: "swap",
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-fh-heading",
    display: "swap",
});

export default function FireHacksProspectusPage() {
    return (
        <div className={`${s.page} ${dmSans.variable} ${spaceMono.variable}`}>
            <nav className={s.nav} aria-label="Fire Hacks">
                <div className={s.navAlign}>
                    <div className={s.navGlass}>
                        <Link href="/firehacks" className={s.navLogo}>
                            <span className={s.navLogoIcon}>
                                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2L28 16L16 30L4 16L16 2Z" fill="#EF4444" opacity="0.9" />
                                    <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#0A0A0A" />
                                </svg>
                            </span>
                            Fire Hacks
                        </Link>
                        <Link href="/firehacks" className={`${s.btn} ${s.btnOutline} ${s.btnSm}`}>
                            ← Event site
                        </Link>
                    </div>
                </div>
            </nav>

            <section className={s.section} style={{ paddingTop: "120px" }}>
                <div className={s.container} style={{ textAlign: "center" }}>
                    <p className={s.sectionLabel}>For organizations</p>
                    <h1 className={s.sectionTitle}>Sponsorship prospectus</h1>
                    <p className={s.prospectusIntro}>
                        Full tiers, benefits, and impact — preview below or download to share with your team.
                    </p>
                    <div className={s.prospectusToolbar}>
                        <a
                            href={SPONSORSHIP_PROSPECTUS_PDF_PATH}
                            download={SPONSORSHIP_PROSPECTUS_DOWNLOAD_FILENAME}
                            className={`${s.btn} ${s.btnPrimary}`}
                        >
                            Download PDF
                        </a>
                    </div>
                    <div className={s.prospectusEmbedWrap}>
                        <iframe
                            title="Fire Hacks sponsorship prospectus"
                            src={`${SPONSORSHIP_PROSPECTUS_PDF_PATH}#toolbar=1`}
                            className={s.prospectusEmbed}
                        />
                    </div>
                    <p
                        className={s.prospectusIntro}
                        style={{ marginTop: "28px", marginBottom: 0 }}
                    >
                        Questions?{" "}
                        <a href="mailto:codestarters26@gmail.com" style={{ color: "var(--accent)" }}>
                            codestarters26@gmail.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}
