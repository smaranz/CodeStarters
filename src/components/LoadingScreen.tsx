import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FlameLogo } from "@/assets/logo";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1200); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }} transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] bg-[#0a0505] flex items-center justify-center">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.1, 1], opacity: 1 }} transition={{ duration: 1 }}
            className="flex flex-col items-center gap-4">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <FlameLogo size={80} />
            </motion.div>
            <div className="text-red-500 text-2xl font-bold tracking-tight">FireHacks</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
