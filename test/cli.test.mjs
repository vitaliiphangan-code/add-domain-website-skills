import test from "node:test";
import assert from "node:assert/strict";
import { find, renderFind, connect, renderConnect, verify, affiliateLink, splitDomain, parseArgs } from "../bin/adddomain.mjs";

const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

test("splitDomain strips scheme, www and path", () => {
  assert.deepEqual(splitDomain("https://www.LunaBakery.com/menu"), { label: "lunabakery", tld: "com" });
  assert.deepEqual(splitDomain("luna bakery"), { label: "luna-bakery", tld: "" });
});

test("affiliate link wraps the exact Namecheap results page", () => {
  assert.equal(
    affiliateLink("luna.com"),
    "https://namecheap.pxf.io/c/7976400/1632743/5618?u=https%3A%2F%2Fwww.namecheap.com%2Fdomains%2Fregistration%2Fresults%2F%3Fdomain%3Dluna.com",
  );
});

test("find uses the store answer and never gives a buy link for a taken name", async () => {
  const f = async (url) => {
    assert.match(url, /^https:\/\/www\.adddomain\.net\/api\/check\?name=luna&src=cli&tlds=com%2Cco/);
    return json({ results: [
      { domain: "luna.com", status: "registered", price: { currency: "USD", first_year: 11.28, renewal: 18.48, checked_on: "2026-10-14" } },
      { domain: "luna.co", status: "available", price: { currency: "USD", first_year: 9.98, renewal: 33.98, checked_on: "2026-10-14" } },
    ] });
  };
  const out = await find("luna", { tlds: ["com", "co"], f });
  assert.equal(out.results[0].buy, null);
  assert.equal(out.results[1].buy, affiliateLink("luna.co"));
  const text = renderFind(out);
  assert.match(text, /TAKEN  luna\.com/);
  assert.match(text, /luna\.co is free: USD 9\.98 first year, then USD 33\.98\/year \(listed 2026-10-14\)/);
  assert.match(text, /You buy it yourself at Namecheap: https:\/\/namecheap\.pxf\.io\//);
  assert.doesNotMatch(text, /luna\.com is free/);
});

test("find falls back to the registry and invents no price when the store is down", async () => {
  const f = async (url) => {
    if (url.startsWith("https://www.adddomain.net")) throw new Error("fetch failed");
    if (url === "https://data.iana.org/rdap/dns.json") return json({ services: [[["com"], ["https://rdap.verisign.com/com/v1/"]]] });
    if (url === "https://rdap.verisign.com/com/v1/domain/warmcrumb.com") return json({}, 404);
    throw new Error("unexpected " + url);
  };
  const out = await find("warmcrumb.com", { f });
  assert.equal(out.results.length, 1);
  assert.equal(out.results[0].status, "available");
  assert.equal(out.results[0].price, null);
  assert.doesNotMatch(renderFind(out), /USD/);
});

test("connect prints Vercel's documented records with Namecheap host fields", () => {
  const text = renderConnect(connect("lunabakery.com", "vercel"));
  assert.match(text, /A     host @ +value 76\.76\.21\.21/);
  assert.match(text, /CNAME host www +value cname\.vercel-dns\.com/);
  assert.match(text, /vercel domains add lunabakery\.com/);
});

test("connect refuses an unknown host instead of guessing", () => {
  assert.throws(() => connect("luna.com", "wix"), /Unknown --host/);
});

test("verify marks a missing record and unfinished HTTPS", async () => {
  const f = async (url) => {
    if (url.includes("type=A")) return json({ Answer: [{ data: "76.76.21.21" }] });
    if (url.includes("type=CNAME")) return json({ Answer: [{ data: "parkingpage.namecheap.com." }] });
    throw new Error("connect ECONNREFUSED");
  };
  const v = await verify("luna.com", "vercel", undefined, f);
  assert.equal(v.checks[0].found, true);
  assert.equal(v.checks[1].found, false);
  assert.deepEqual(v.checks[1].seen, ["parkingpage.namecheap.com"]);
  assert.equal(v.https, "no answer yet");
});

test("parseArgs reads flags with and without =", () => {
  assert.deepEqual(parseArgs(["connect", "luna.com", "--host", "netlify", "--target=luna.netlify.app", "--json"]),
    { _: ["connect", "luna.com"], flags: { host: "netlify", target: "luna.netlify.app", json: true } });
});
