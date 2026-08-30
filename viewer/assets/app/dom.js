"use strict";

/** Small DOM/format helpers shared by every view. */

export const escapeHTML = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

class RawHTML {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}

/** Mark an already-safe HTML string so `html` does not escape it again. */
export const raw = (value) => new RawHTML(String(value ?? ""));

const interpolate = (value) => {
  if (value === null || value === undefined || value === false) return "";
  if (value instanceof RawHTML) return value.value;
  if (Array.isArray(value)) return value.map(interpolate).join("");
  return escapeHTML(value);
};

/** Tagged template that escapes every interpolation unless wrapped in `raw`. */
export const html = (strings, ...values) => raw(
  strings.reduce((out, chunk, index) => out + interpolate(values[index - 1]) + chunk),
);

export const el = (selector, scope = document) => scope.querySelector(selector);
export const els = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const setHTML = (node, value) => {
  if (node) node.innerHTML = value instanceof RawHTML ? value.value : String(value ?? "");
  return node;
};

export const attr = (name, value) => (value === null || value === undefined || value === false
  ? raw("")
  : raw(`${name}="${escapeHTML(value)}"`));

export const classes = (...parts) => parts.flat().filter(Boolean).join(" ");

export const normalize = (value) => String(value ?? "")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

export const slugify = (value) => normalize(value)
  .replace(/[^a-z0-9]+/g, "_")
  .replace(/^_+|_+$/g, "")
  .slice(0, 64);

export const truncate = (value, length = 180) => {
  const text = String(value ?? "").trim();
  return text.length <= length ? text : `${text.slice(0, length - 1).trimEnd()}…`;
};

export const plural = (count, singular, suffix = "s") => `${count} ${singular}${count === 1 ? "" : suffix}`;

export const formatMinutes = (minutes) => (minutes < 90
  ? `${Math.round(minutes)} min`
  : `${(minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1)} h`);

export const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

export const relativeTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  const table = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"], [4.35, "week"], [12, "month"]];
  let amount = seconds;
  let unit = "second";
  for (const [step, name] of table) {
    if (Math.abs(amount) < step) break;
    amount = Math.round(amount / step);
    unit = name;
  }
  if (unit === "second" && Math.abs(amount) < 45) return "just now";
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const nextUnit = { second: "second", minute: "minute", hour: "hour", day: "day", week: "week", month: "month" }[unit];
  return formatter.format(-amount, nextUnit);
};

/** Download a generated file without contacting any third party. */
export const download = (filename, value, type = "application/json") => {
  const blob = new Blob([value], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};

export const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    area.remove();
    return ok;
  }
};

export const debounce = (fn, wait = 200) => {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

export const firstURL = (value) => {
  const match = String(value ?? "").match(/https?:\/\/[^\s,;)"']+/);
  if (!match) return null;
  try {
    const url = new URL(match[0]);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};
