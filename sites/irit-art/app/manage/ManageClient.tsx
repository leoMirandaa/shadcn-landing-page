"use client";
import { useRef, useState } from "react";
import { asset, BASE } from "@/lib/base";
import type { Artwork, Profile, SiteContent } from "@/lib/content";

const MAX_SIDE = 2000;

/** Downscale in the browser so uploads stay well under the 4.5MB request limit. */
async function prepare(file: File): Promise<{ blob: Blob; w: number; h: number }> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * k);
  const h = Math.round(bmp.height * k);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  const blob = await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/jpeg", 0.88));
  return { blob, w, h };
}

async function upload(file: File): Promise<Pick<Artwork, "id" | "src" | "w" | "h">> {
  const { blob, w, h } = await prepare(file);
  const form = new FormData();
  form.set("file", new File([blob], "art.jpg", { type: "image/jpeg" }));
  const res = await fetch(`${BASE}/api/manage/upload/`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`upload ${res.status}`);
  const { id, src } = await res.json();
  return { id, src, w, h };
}

const FIELDS: { key: keyof Profile; label: string; hint?: string; ltr?: boolean }[] = [
  { key: "name", label: "שם" },
  { key: "tagline", label: "כותרת משנה (מתחת ללוגו)" },
  { key: "heroLine", label: "משפט פתיחה" },
  { key: "whatsapp", label: "וואטסאפ (עם קידומת מדינה)", hint: "972501234567", ltr: true },
  { key: "phone", label: "טלפון", ltr: true },
  { key: "instagram", label: "אינסטגרם (שם משתמש)", ltr: true },
  { key: "facebook", label: "פייסבוק (קישור לפרופיל)", hint: "https://www.facebook.com/…", ltr: true },
  { key: "email", label: "אימייל", ltr: true },
];

export function ManageClient({ initial }: { initial: SiteContent }) {
  const [profile, setProfile] = useState(initial.profile);
  const [gallery, setGallery] = useState(initial.gallery);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ kind: "" | "ok" | "err"; text: string }>({ kind: "", text: "" });
  const replaceId = useRef<string | null>(null);
  const addInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);

  const touch = () => {
    setDirty(true);
    setStatus({ kind: "", text: "יש שינויים שלא נשמרו" });
  };
  const patch = (id: string, p: Partial<Artwork>) => {
    setGallery((g) => g.map((a) => (a.id === id ? { ...a, ...p } : a)));
    touch();
  };
  const move = (i: number, d: number) => {
    setGallery((g) => {
      const j = i + d;
      if (j < 0 || j >= g.length) return g;
      const next = [...g];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    touch();
  };

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const added: Artwork[] = [];
      for (const [n, f] of [...files].entries()) {
        setStatus({ kind: "", text: `מעלה תמונה ${n + 1} מתוך ${files.length}…` });
        added.push({ ...(await upload(f)), title: f.name.replace(/\.[^.]+$/, "") });
      }
      setGallery((g) => [...g, ...added]);
      touch();
    } catch {
      setStatus({ kind: "err", text: "ההעלאה נכשלה, נסי שוב" });
    } finally {
      setBusy(false);
      if (addInput.current) addInput.current.value = "";
    }
  }

  async function replaceFile(files: FileList | null) {
    const id = replaceId.current;
    if (!files?.[0] || !id) return;
    setBusy(true);
    setStatus({ kind: "", text: "מחליף תמונה…" });
    try {
      const { src, w, h } = await upload(files[0]);
      patch(id, { src, w, h });
    } catch {
      setStatus({ kind: "err", text: "ההעלאה נכשלה, נסי שוב" });
    } finally {
      setBusy(false);
      if (replaceInput.current) replaceInput.current.value = "";
    }
  }

  async function replacePhoto(files: FileList | null) {
    if (!files?.[0]) return;
    setBusy(true);
    setStatus({ kind: "", text: "מעלה תמונת פרופיל…" });
    try {
      const { src } = await upload(files[0]);
      setProfile((p) => ({ ...p, photo: src }));
      touch();
    } catch {
      setStatus({ kind: "err", text: "ההעלאה נכשלה, נסי שוב" });
    } finally {
      setBusy(false);
      if (photoInput.current) photoInput.current.value = "";
    }
  }

  async function save() {
    setBusy(true);
    setStatus({ kind: "", text: "שומר…" });
    try {
      const res = await fetch(`${BASE}/api/manage/content/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, gallery }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDirty(false);
      setStatus({ kind: "ok", text: "נשמר ✓ האתר עודכן" });
    } catch {
      setStatus({ kind: "err", text: "השמירה נכשלה, נסי שוב" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mg">
      <div className="mg-top">
        <div>
          <h1>ניהול האתר</h1>
          <span className="muted">עריכת הפרופיל והגלריה</span>
        </div>
        <a className="btn" href={asset("/")} target="_blank" rel="noopener noreferrer">צפייה באתר ↗</a>
      </div>

      <section className="mg-card glass">
        <h2>פרופיל</h2>
        <div className="mg-grid">
          {FIELDS.map((f) => (
            <label key={f.key}>
              {f.label}
              <input
                value={profile[f.key]}
                placeholder={f.hint}
                dir={f.ltr ? "ltr" : undefined}
                onChange={(e) => (setProfile({ ...profile, [f.key]: e.target.value }), touch())}
              />
            </label>
          ))}
          <div className="wide mg-photo">
            {profile.photo ? <img src={asset(profile.photo)} alt="תמונת פרופיל" /> : <div className="mg-photo-empty">אין תמונה</div>}
            <div className="mg-row">
              <button className="btn sm" disabled={busy} onClick={() => photoInput.current?.click()}>החלפת תמונת פרופיל</button>
              {profile.photo && <button className="btn sm danger" onClick={() => (setProfile({ ...profile, photo: "" }), touch())}>הסרה</button>}
            </div>
            <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => replacePhoto(e.target.files)} />
          </div>
          <label className="wide">
            אודות (פסקה חדשה = שורה ריקה)
            <textarea value={profile.about} onChange={(e) => (setProfile({ ...profile, about: e.target.value }), touch())} />
          </label>
        </div>
      </section>

      <section className="mg-card glass">
        <div className="mg-top" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>גלריה ({gallery.length})</h2>
          <button className="btn primary" disabled={busy} onClick={() => addInput.current?.click()}>＋ הוספת ציורים</button>
        </div>
        <input ref={addInput} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => addFiles(e.target.files)} />
        <input ref={replaceInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => replaceFile(e.target.files)} />

        {gallery.length === 0 && <p className="muted">אין עדיין ציורים. לחצי על ״הוספת ציורים״.</p>}
        <div className="mg-pieces">
          {gallery.map((a, i) => (
            <div className="mg-piece" key={a.id}>
              <div className="mg-thumb"><img src={asset(a.src)} alt={a.title} /></div>
              <input value={a.title} placeholder="שם הציור" onChange={(e) => patch(a.id, { title: e.target.value })} />
              <div className="mg-row">
                <button className="btn sm" disabled={i === 0} onClick={() => move(i, -1)} title="הזז קדימה">→</button>
                <button className="btn sm" disabled={i === gallery.length - 1} onClick={() => move(i, 1)} title="הזז אחורה">←</button>
                <button className="btn sm" disabled={busy} onClick={() => ((replaceId.current = a.id), replaceInput.current?.click())}>החלפה</button>
                <button
                  className="btn sm danger"
                  onClick={() => {
                    if (confirm("למחוק את הציור מהגלריה?")) (setGallery((g) => g.filter((x) => x.id !== a.id)), touch());
                  }}
                >
                  מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mg-bar">
        <span className={`mg-status ${status.kind}`} role="status">{status.text}</span>
        <button className="btn primary" disabled={busy || !dirty} onClick={save}>שמירה</button>
      </div>
    </div>
  );
}
