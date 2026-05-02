import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { SPONSORSHIP_PROSPECTUS_PDF_PATH } from "@/lib/sponsor-prospectus";

export const metadata: Metadata = {
    title: "Sponsorship prospectus | CodeStarters",
    description:
        "View and download the CodeStarters sponsorship prospectus for partners and organizations supporting our mission.",
    openGraph: {
        title: "Sponsorship prospectus | CodeStarters",
        description:
            "Partnership opportunities, impact, and ways to support CS education and community websites in Cupertino.",
    },
};

export default function SponsorshipProspectusPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/#sponsors"
                    className="inline-flex items-center gap-2 text-sm font-barlow font-medium text-slate-500 hover:text-brand-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
                    Back to sponsors
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
                    <div>
                        <p className="text-brand-600 font-barlow font-medium text-sm tracking-widest uppercase mb-3">
                            For sponsors
                        </p>
                        <h1 className="font-instrument italic text-4xl lg:text-5xl text-slate-900 text-balance">
                            Sponsorship prospectus
                        </h1>
                        <p className="mt-4 text-slate-600 font-barlow text-base leading-relaxed max-w-xl">
                            Review partnership details below or download the PDF to share with your team.
                        </p>
                    </div>
                    <a
                        href={SPONSORSHIP_PROSPECTUS_PDF_PATH}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 text-white px-6 py-3 font-barlow font-semibold text-sm hover:bg-brand-800 transition-colors shrink-0"
                    >
                        <Download className="w-4 h-4 shrink-0" aria-hidden />
                        Download PDF
                    </a>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden aspect-[4/3] min-h-[min(85vh,56rem)] w-full">
                    <iframe
                        title="CodeStarters sponsorship prospectus (PDF)"
                        src={`${SPONSORSHIP_PROSPECTUS_PDF_PATH}#toolbar=1`}
                        className="w-full h-full min-h-[min(85vh,56rem)] border-0"
                    />
                </div>

                <p className="mt-6 text-center text-sm text-slate-500 font-barlow">
                    Questions?{" "}
                    <a href="mailto:codestarters26@gmail.com" className="text-brand-600 hover:underline">
                        codestarters26@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
}
