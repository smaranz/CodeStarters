import type { ReactNode } from "react";
import { FrostField } from "@/components/icehacks/frost-field";
import { IceBits } from "@/components/icehacks/ice-bits";
import "@/components/icehacks/icehacks.css";

export function IcehacksShell({ children }: { children: ReactNode }) {
  return (
    <div className="icehacks flex min-h-dvh flex-col overflow-x-hidden antialiased">
      <FrostField />
      <IceBits />
      {children}
    </div>
  );
}
