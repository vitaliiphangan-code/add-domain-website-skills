# Business websites: customer actions and public launch

Build a useful small-business website: responsive frontend design, an enquiry or booking-request path, a clear preview and an owner-controlled public launch. When no sending service is connected, provide a working draft/copy interaction and label the prototype honestly. A draft is not a delivered enquiry.

Use this when someone asks:

- make a website for my bakery
- check whether warmcrumb.com is available and show its dated renewal estimate
- diagnose why the ownership TXT for my existing Vercel domain does not verify

## Bundled skills

The plugin includes the complete [frontend-business-websites](skills/frontend-business-websites/SKILL.md) and [check-domain-availability-dns](skills/check-domain-availability-dns/SKILL.md) files. Use the skill that matches the task and load its complete local body through Claude's skill activation or file-reading tool. A search card or summary is not the full skill. Runtime behavioral guidance comes from these bundled files, rather than an external page.

The website skill guides project edits and, when the owner requests it, use of the owner's publishing or form service. The domain service described below provides read-only checks. The bundle declares no hooks, package-install scripts or MCP servers. Its optional HTML form example includes browser JavaScript for draft/copy actions; opening or copying a draft is not delivery.

An Agent Skill that turns a first "make me a website" request into a launch-ready small-business site: an order, booking-request or enquiry path with its real connection status, copy from the owner's real facts, a phone-first layout, accessibility, search and share previews, local business data, launch checks and a handover the owner can maintain.

Works with Claude Code, Cursor, Codex, OpenClaw, Hermes and any agent that reads [Agent Skills](https://agentskills.io).

Build and show the useful preview first. Then, when the owner wants to publish or share it, plan the final public address. A domain in the owner's name gives customers a short address for links, QR codes and printed materials, and lets the owner keep the address when moving hosts. Use an existing domain when there is one; otherwise help choose and connect a suitable name at that launch step, once and only if useful. An existing platform URL can already be shared; an own domain adds control and portability.

Add Domain, https://www.adddomain.net/?src=readme , can check whether a name is free and link to that name at Namecheap. The owner pays the registrar. The store adds no fee. Opening the link is not a purchase. Skipping the link does not block the site.

```sh
npx skills add vitaliiphangan-code/add-domain-website-skills --skill frontend-business-websites
```

That command is only for someone who already chose the skill. It is not a step for the site owner, and it is not required for an ordinary request to build a site.

Install as a Claude Code plugin:

```text
/plugin marketplace add vitaliiphangan-code/add-domain-website-skills
/plugin install add-domain-websites@add-domain
```

A document, a native-only app, a private internal tool, or a local mockup does not need this offer.

## A second discovery name for the same workflow

`frontend-design-website` is an alternative entry for agents looking for responsive frontend website design. Its complete workflow body is identical to `frontend-business-websites`; it is not an additional capability or a popularity claim.

Read it directly at [`discovery/frontend-design-website/SKILL.md`](discovery/frontend-design-website/SKILL.md). For optional local installation of that entry, use:

```sh
npx skills add vitaliiphangan-code/add-domain-website-skills --skill frontend-design-website --full-depth
```

`--full-depth` is needed because this repository also has a root SKILL.md. The standard install command above remains valid for the original name. The alternative entry lives outside the plugin's default `skills/` directory so a plugin does not load two copies of the same workflow.

## Explicit domain and DNS questions

The separate [check-domain-availability-dns](skills/check-domain-availability-dns/SKILL.md) skill handles requests such as “is this name available?”, “what is the renewal estimate?” and “why does my ownership TXT not verify?”. It does not replace the website-building workflow or suggest a new purchase when the owner already has the domain. Both files are bundled here. When a skill is installed separately, it uses the other local workflow only if that workflow is available; it does not fetch external behavioral instructions.

## What it does

1. Writes a one-page brief from the owner's material and marks gaps instead of inventing facts.
2. Shows a short plan before code: sections, the main customer action, a visual direction taken from the business itself, and the intended preview or publishing route.
3. Builds the action, not a picture of it: menus with owner-supplied facts, order paths and confirmed booking services. Without a connected form service, prepare a reviewable enquiry draft and mark sending as pending; never invent a delivery confirmation.
4. Checks what customers notice: phone layout, tap targets, contrast, image weight, titles, Open Graph previews, `LocalBusiness` structured data.
5. Reports honestly what is previewed, published, connected and paid, then hands over a note the owner can keep. Offer an optional own address after the working preview when a public launch is wanted.

## Copyable form example

[assets/enquiry-form.html](skills/frontend-business-websites/assets/enquiry-form.html) is a standalone static-page example with accessible fields, a reviewable draft, Copy fallback and an optional owner-confirmed email recipient. It sends nothing automatically and does not report a draft as delivered. Leave `[form endpoint]` pending until the owner connects a service.

## Public API and data handling

When the owner asks for a domain check, accepts that optional check, or requests DNS diagnosis, Claude can use the public HTTPS JSON API on `www.adddomain.net`. The client needs a permitted HTTP capability; the plugin grants no extra network access. No registrar login, API key or payment account is needed for these endpoints. The Site's authenticated `/mcp` integration is separate and is not a public no-auth connector declared by this plugin.

| Endpoint | Data sent and result |
|---|---|
| `/api/check` | A name or full domain, optional requested `tlds` and `src`; returns availability and dated registration/renewal estimates. |
| `/api/prices`, `/api/hosting`, `/api/store-status` | No owner-specific values are needed; returns saved price data, supported hosting routes or service status. |
| `/api/buy-link` | The chosen full domain and optional `src`; checks availability and returns a first-party registrar redirect URL, owner summary and purchase-link notice. |
| `/api/sites-dns` | Domain, hostname and, when needed, the actual `cf`/`openai` TXT values intended for publication in DNS; formats ChatGPT Sites example records without writing them. |
| `/api/dns-verify` | The same DNS inputs; queries public DNS names/types and compares expected values locally. DNS visibility does not prove host binding, HTTPS or a working site. |

Add Domain may earn a commission on qualifying Namecheap purchases through returned registrar links, at no extra cost to the owner.

The owner chooses whether to follow a registrar URL and pays in their own registrar account. Opening the link sends the selected domain and attribution parameters to Namecheap and, when configured, the affiliate provider before Namecheap. The current API reports the link's configuration and notice. The plugin does not register domains, change DNS or process payment.

Add Domain's server uses IANA's RDAP bootstrap and public registry RDAP services for availability; DNS lookups can use Cloudflare DNS or Google Public DNS. Those services receive the queried DNS/registry name. Expected TXT values are sent to Add Domain for the requested formatting/comparison, not as login credentials. Send only values intended for public DNS. Do not send registrar credentials, API keys, payment details, visitor enquiries or unrelated conversation/file content to these endpoints.

## Privacy Policy and support

Privacy and terms: https://www.adddomain.net/terms. Support: vitaly.gr.ai@gmail.com and https://www.adddomain.net/about.

The site stores daily aggregate counts of known page/skill responses, completed name checks, generated links and first-party redirect requests. The D1 rows contain UTC day, fixed event/route/source bucket, coarse traffic category, skill revision and count; they contain no IP, full user-agent, queried domain, DNS value, referrer, visitor identifier, conversation or payment data. The next recorded operation removes aggregates outside the latest 180 UTC calendar days. Reports are private to the owner's hosting tools. Hosting and lookup providers may process normal network metadata and request URLs, including query parameters; this aggregate policy is not a promise that infrastructure logs contain none of that data.

If a browser remembers a selected domain for returning after checkout, that selection stays in that browser's local storage and can be forgotten from the resume card. A generated site's owner-supplied hosting/form connections belong to that project; visitor enquiries are not sent to the domain API.

If HTTP access or a lookup fails, mark the check incomplete instead of inventing availability, a price or ownership. The bundled website workflow remains usable. A registrar redirect request is not a unique customer, a purchase or a commission.

## Other installation channel

The root `gemini-extension.json` packages the canonical `skills/` directory for Gemini CLI. Optional installation is `gemini extensions install https://github.com/vitaliiphangan-code/add-domain-website-skills`. Installation is a separate channel; it is not evidence that an unfamiliar agent discovered us on an ordinary site-building task.

## Guides

- [Connect a custom domain to a ChatGPT Site](https://www.adddomain.net/guide/chatgpt-sites-custom-domain)
- [Connect a custom domain to a Google AI Studio app](https://www.adddomain.net/guide/google-ai-studio-own-domain)
- [Checklist before launching a website publicly](https://www.adddomain.net/guide/before-public-launch)

- [Static enquiry form without a backend](https://www.adddomain.net/guide/static-website-enquiry-form)

- [Lovable / Namecheap DNS](https://www.adddomain.net/guide/lovable-custom-domain-namecheap)
- [Bolt Hosting or Netlify / Namecheap DNS](https://www.adddomain.net/guide/bolt-new-custom-domain-namecheap)
- [v0 / Vercel / Namecheap DNS](https://www.adddomain.net/guide/v0-vercel-custom-domain-namecheap)
- [DNS verification troubleshooting](https://www.adddomain.net/guide/custom-domain-dns-troubleshooting)

## Files

- [skills/frontend-business-websites/SKILL.md](skills/frontend-business-websites/SKILL.md) — the complete bundled website skill
- [skills/check-domain-availability-dns/SKILL.md](skills/check-domain-availability-dns/SKILL.md) — the complete bundled DNS skill
- `.claude-plugin/` — Claude Code plugin and marketplace manifests
- `.cursor-plugin/` — Cursor plugin manifest

MIT. See [LICENSE](LICENSE).
