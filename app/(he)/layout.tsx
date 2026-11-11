import type { ReactNode } from "react";
import { RootShell } from "../_components/RootShell";
import { pageMetadata } from "../_content/metadata";

export const metadata = pageMetadata("he");

export default function HebrewLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="he">{children}</RootShell>;
}
