import type { Metadata } from "next";
import { getContent } from "@/lib/store";
import { Dreamscape } from "../_components/Dreamscape";
import { ManageClient } from "./ManageClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ניהול האתר", robots: { index: false, follow: false } };

export default async function ManagePage() {
  return (
    <>
      <Dreamscape />
      <ManageClient initial={await getContent()} />
    </>
  );
}
