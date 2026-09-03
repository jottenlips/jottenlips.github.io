import { readdir, stat, copyFile, mkdir, rm } from "node:fs/promises";
import { join, relative, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = join(ROOT, "server", "static");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".bmp"]);
const SKIP_DIRS = new Set(["server", "docs", "node_modules", ".git", "inprogress"]);

async function collectImages(dir, base, out = []) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry);
    const st = await stat(p);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) await collectImages(p, base, out);
    } else if (IMAGE_EXT.has(extname(entry).toLowerCase())) {
      out.push({ src: p, rel: relative(base, p) });
    }
  }
  return out;
}

async function findStaleImages(dir, keep, out = []) {
  for (const entry of await readdir(dir)) {
    const p = join(dir, entry);
    const st = await stat(p);
    if (st.isDirectory()) {
      await findStaleImages(p, keep, out);
    } else if (IMAGE_EXT.has(extname(entry).toLowerCase()) && !keep.has(p)) {
      out.push(p);
    }
  }
  return out;
}

const images = await collectImages(ROOT, ROOT);
const keep = new Set();
let copied = 0;
for (const img of images) {
  const dest = join(STATIC_DIR, img.rel);
  keep.add(dest);
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(img.src, dest);
  copied++;
}

let removed = 0;
for (const f of await findStaleImages(STATIC_DIR, keep)) {
  await rm(f);
  removed++;
}

console.log(`Copied ${copied} images to static/ (${removed} stale removed)`);
