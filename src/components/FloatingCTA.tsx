import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 800], [0, 1]);
  const y = useTransform(scrollY, [600, 800], [40, 0]);
  return (
    <motion.a href="https://luma.com/event/evt-teYwe8vJ6Eqne8d" target="_blank" rel="noreferrer" style={{ opacity, y }}
      className="md:hidden fixed bottom-5 inset-x-5 z-40 text-center px-6 py-4 rounded-full bg-red-600 text-white font-medium">
      Register on Luma →
    </motion.a>
  );
}
