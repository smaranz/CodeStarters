import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { SPONSORSHIP_PROSPECTUS_PAGE_PATH } from "@/lib/sponsor-prospectus";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 pt-16 pb-10 px-6 lg:px-12 bg-slate-50 text-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                    <div className="max-w-sm">
                        <Link href="/" className="flex items-center gap-2.5 mb-5">
                            <div className="w-10 h-10 relative flex items-center justify-center">
                                <Image src="/logo_new.png" alt="CodeStarters Logo" fill className="object-contain" />
                            </div>
                            <span className="font-barlow font-bold text-lg text-slate-900">
                                CodeStarters
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-barlow">
                            Student-led initiative expanding access to CS education and helping small businesses thrive online.
                        </p>
                        <Link href="https://www.instagram.com/cupertino_codestarters/" target="_blank" className="inline-flex p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex gap-16 sm:gap-24 font-barlow">
                        <div>
                            <h4 className="text-xs font-medium text-slate-900 tracking-widest uppercase mb-5">Explore</h4>
                            <ul className="flex flex-col gap-3 text-sm text-slate-500">
                                <li><Link href="#mission" className="hover:text-brand-600 transition-colors">Mission</Link></li>
                                <li><Link href="#programs" className="hover:text-brand-600 transition-colors">Programs</Link></li>
                                <li><Link href="#events" className="hover:text-brand-600 transition-colors">Events</Link></li>
                                <li><Link href="#team" className="hover:text-brand-600 transition-colors">Team</Link></li>
                                <li><Link href="#sponsors" className="hover:text-brand-600 transition-colors">Sponsors</Link></li>
                                <li><Link href={SPONSORSHIP_PROSPECTUS_PAGE_PATH} className="hover:text-brand-600 transition-colors">Sponsorship prospectus</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-slate-900 tracking-widest uppercase mb-5">Get Involved</h4>
                            <ul className="flex flex-col gap-3 text-sm text-slate-500">
                                <li><Link href="#volunteer" className="hover:text-brand-600 transition-colors">Volunteer</Link></li>
                                <li><Link href="#request-website" className="hover:text-brand-600 transition-colors">Request a Website</Link></li>
                                <li><a href="mailto:hello@codecore.org" className="hover:text-brand-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-barlow">
                    <p>&copy; {currentYear} CodeStarters Initiative</p>
                    <p>Built with purpose by student developers.</p>
                </div>
            </div>
        </footer>
    );
}
