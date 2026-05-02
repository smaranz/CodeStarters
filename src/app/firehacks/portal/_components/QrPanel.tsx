"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode } from "lucide-react";

type Props = {
    passToken: string;
    fullName: string;
};

export function QrPanel({ passToken, fullName }: Props) {
    const [dataUrl, setDataUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        QRCode.toDataURL(passToken, {
            margin: 1,
            width: 720,
            errorCorrectionLevel: "M",
            color: { dark: "#0a0a0a", light: "#ffffff" },
        })
            .then((url) => {
                if (!cancelled) setDataUrl(url);
            })
            .catch(() => {
                if (!cancelled) setDataUrl(null);
            });
        return () => {
            cancelled = true;
        };
    }, [passToken]);

    return (
        <div className="rounded-2xl border border-zinc-800 bg-[#161616] p-6 md:p-7">
            <div className="flex items-center gap-2 mb-5">
                <QrCode className="w-4 h-4 text-red-500" />
                <p className="text-[0.65rem] tracking-[0.25em] text-red-500 uppercase" style={{ fontFamily: 'var(--font-fh-heading), monospace' }}>
                    Your Pass
                </p>
            </div>

            <div className="bg-white rounded-xl p-5 flex items-center justify-center aspect-square w-full max-w-xs mx-auto">
                {dataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- data URL, next/image adds no value
                    <img src={dataUrl} alt="Fire Hacks pass QR" className="w-full h-full" />
                ) : (
                    <div className="w-full h-full bg-zinc-100 animate-pulse rounded" />
                )}
            </div>

            <p className="text-zinc-100 text-center mt-5 text-lg" style={{ fontFamily: 'var(--font-fh-heading), monospace' }}>
                {fullName}
            </p>
            <p className="text-zinc-500 text-center text-xs mt-2 mb-6">
                Show this at check-in and at the food line.
            </p>
            
            <a 
                href={`/api/pass/${passToken}`}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 border border-zinc-800 text-white rounded-xl py-3 px-4 transition-colors group"
            >
                <svg className="w-5 h-5 text-white" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 181.5 6.4 233.1-29.2 336.5 19.3 477.1 63.8 512c22.5 17.5 45.4 17.9 66.8 6.4 24.3-12.8 35.8-12.8 58.7 0 21.4 12.1 43.7 11.4 67.5-6.4 46.1-34.5 61.1-71.8 61.1-71.8-41.5-17.5-63.5-54.8-63.1-99.3zM236.4 87.7c18.5-22.9 31.8-54.8 28.5-87.7-27.1 1.4-60.8 19-80 41.5-16.8 19.3-31.4 52.1-27.5 83.5 30.1 2.1 60.1-15 79-37.3z"/>
                </svg>
                <span className="font-semibold tracking-tight">Add to Apple Wallet</span>
            </a>
        </div>
    );
}
