import type { ReactNode } from "react";
import { RootShell } from "../../_components/RootShell";
import { pageMetadata } from "../../_content/metadata";

export const metadata = pageMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
