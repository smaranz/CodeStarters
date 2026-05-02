"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { QrCode, X, CheckCircle2, Pizza, CupSoda, PackageOpen } from "lucide-react";

type Participant = {
    id: string;
    full_name: string;
    pass_token: string;
};

export default function AdminScanner() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scannedParticipant, setScannedParticipant] = useState<Participant | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    
    // Redemption state
    const [pizzaCount, setPizzaCount] = useState(0);
    const [drinkCount, setDrinkCount] = useState(0);
    const [chipsCount, setChipsCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        let codeReader: BrowserMultiFormatReader | null = null;
        let controls: any = null;

        if (isScanning && videoRef.current) {
            codeReader = new BrowserMultiFormatReader();
            
            codeReader.decodeFromVideoDevice(undefined, videoRef.current, async (result, err) => {
                if (result) {
                    const token = result.getText();
                    setIsScanning(false); // Stop scanning on success
                    
                    try {
                        const { data, error: dbError } = await supabase
                            .from("firehacks_participants")
                            .select("id, full_name, pass_token")
                            .eq("pass_token", token)
                            .single();
                            
                        if (dbError || !data) {
                            throw new Error("Participant not found for this QR code");
                        }
                        
                        setScannedParticipant(data);
                        setError(null);
                        setSuccessMessage(null);
                        // Reset counters
                        setPizzaCount(0);
                        setDrinkCount(0);
                        setChipsCount(0);
                    } catch (e: any) {
                        setError(e.message || "Failed to lookup participant");
                        // Automatically resume scanning after an error if they want, but let's just leave it stopped so they can read the error
                    }
                }
                
                if (err && err.name !== 'NotFoundException') {
                    console.error(err);
                }
            }).then((c) => {
                controls = c;
            }).catch(e => {
                setError("Camera error: " + e.message);
                setIsScanning(false);
            });
        }

        return () => {
            if (controls) {
                controls.stop();
            }
        };
    }, [isScanning]);

    const handleStartScan = () => {
        setScannedParticipant(null);
        setError(null);
        setSuccessMessage(null);
        setIsScanning(true);
    };

    const handleRedeem = async () => {
        if (!scannedParticipant) return;
        
        const totalItems = pizzaCount + drinkCount + chipsCount;
        if (totalItems === 0) {
            setError("Please select at least one item to redeem.");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const redemptions = [];
            
            if (pizzaCount > 0) {
                redemptions.push({
                    participant_id: scannedParticipant.id,
                    kind: "pizza",
                    quantity: pizzaCount,
                    redeemed_by: user?.id || null
                });
            }
            if (drinkCount > 0) {
                redemptions.push({
                    participant_id: scannedParticipant.id,
                    kind: "drink",
                    quantity: drinkCount,
                    redeemed_by: user?.id || null
                });
            }
            if (chipsCount > 0) {
                redemptions.push({
                    participant_id: scannedParticipant.id,
                    kind: "chips",
                    quantity: chipsCount,
                    redeemed_by: user?.id || null
                });
            }

            const { error: insertError } = await supabase
                .from("firehacks_meal_redemptions")
                .insert(redemptions);

            if (insertError) throw insertError;
            
            setSuccessMessage(`Successfully redeemed ${totalItems} item(s) for ${scannedParticipant.full_name}`);
            setScannedParticipant(null); // Clear to allow next scan
        } catch (err: any) {
            setError(err.message || "Failed to submit redemption");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">QR Scanner</h1>
                <p className="text-slate-500">Scan attendee passes to redeem meals, drinks, or chips.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}
            
            {successMessage && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-start gap-3 border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">Success</p>
                        <p className="text-sm">{successMessage}</p>
                    </div>
                </div>
            )}

            {!isScanning && !scannedParticipant && (
                <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <QrCode className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Scan</h2>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">Position the QR code within the camera frame to automatically identify the attendee.</p>
                    <Button onClick={handleStartScan} className="w-full sm:w-auto">
                        Open Camera
                    </Button>
                </div>
            )}

            {isScanning && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden relative">
                    <div className="aspect-video bg-black relative">
                        <video 
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40">
                            <div className="w-full h-full border-2 border-white/50 rounded-xl relative">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-500 rounded-tl-xl -mt-1 -ml-1" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-500 rounded-tr-xl -mt-1 -mr-1" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-500 rounded-bl-xl -mb-1 -ml-1" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-500 rounded-br-xl -mb-1 -mr-1" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-slate-500 font-medium mb-4">Looking for QR Code...</p>
                        <Button variant="outline" onClick={() => setIsScanning(false)}>
                            Cancel Scanning
                        </Button>
                    </div>
                </div>
            )}

            {scannedParticipant && (
                <div className="bg-white p-8 rounded-[2rem] border border-brand-100 shadow-xl shadow-brand-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start justify-between mb-8 pb-8 border-b border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-1">Attendee Found</p>
                            <h2 className="text-3xl font-black text-slate-900">{scannedParticipant.full_name}</h2>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleStartScan}>
                            Scan Different
                        </Button>
                    </div>

                    <div className="space-y-6 mb-8">
                        {/* Pizza */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                                    <Pizza className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Pizza Slices</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                <button 
                                    onClick={() => setPizzaCount(Math.max(0, pizzaCount - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >-</button>
                                <span className="w-6 text-center font-bold text-slate-900">{pizzaCount}</span>
                                <button 
                                    onClick={() => setPizzaCount(pizzaCount + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >+</button>
                            </div>
                        </div>

                        {/* Drinks */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                                    <CupSoda className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Drinks</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                <button 
                                    onClick={() => setDrinkCount(Math.max(0, drinkCount - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >-</button>
                                <span className="w-6 text-center font-bold text-slate-900">{drinkCount}</span>
                                <button 
                                    onClick={() => setDrinkCount(drinkCount + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >+</button>
                            </div>
                        </div>

                        {/* Chips */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                                    <PackageOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Chips</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                <button 
                                    onClick={() => setChipsCount(Math.max(0, chipsCount - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >-</button>
                                <span className="w-6 text-center font-bold text-slate-900">{chipsCount}</span>
                                <button 
                                    onClick={() => setChipsCount(chipsCount + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 font-bold text-xl"
                                >+</button>
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={handleRedeem} 
                        disabled={isSubmitting || (pizzaCount + drinkCount + chipsCount === 0)}
                        className="w-full text-lg h-14 rounded-xl"
                    >
                        {isSubmitting ? "Redeeming..." : "Confirm Redemption"}
                    </Button>
                </div>
            )}
        </div>
    );
}
