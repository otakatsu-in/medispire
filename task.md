# Fix Critical & High Issues — Pre-Deploy

## Critical
- [x] 1. Remove hardcoded Telegram token from BlogPost.tsx (route through /api/submit-lead)
- [x] 2. Remove hardcoded Telegram token from Resources.tsx (route through /api/submit-lead)
- [x] 3. Fix double-JSON schema in BlogPost.tsx (and also Resources.tsx, ForDentists.tsx)
- [x] 4. Fix duplicate /contact + /contact-us routes (removed /contact, added 301 in _redirects)

## High
- [x] 5. Fix sitemap.xml (wrong URLs, missing 10+ pages and tools, correct blog slugs)
- [x] 6. Fix Services.tsx canonical (/course → /services)
- [x] 7. Fix inconsistent canonical formats (standardized to relative paths; SEO.tsx now safe-handles both)
- [x] 8. Fix 404 not-found.tsx (production-ready branded page with noIndex)
- [x] 9. Improve SEO.tsx component (og:locale, og:site_name, noIndex prop, image dims, twitter:site)
- [x] 10. Update index.html static title/description + full OG/Twitter fallback meta

## Bonus (caught during fixes)
- [x] 11. Fixed MessageCircle missing import in BookAppointment.tsx (pre-existing TS build error)
