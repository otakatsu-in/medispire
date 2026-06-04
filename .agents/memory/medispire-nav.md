---
name: MediSpire NavigationMenu + wouter Link pattern
description: How to correctly combine Radix NavigationMenuLink with wouter Link to avoid nested anchor errors
---

## Rule
When using `@radix-ui/react-navigation-menu` with `wouter`'s `Link`, always use `asChild` on `NavigationMenuLink` so it merges into the single `<a>` that `Link` renders. Never wrap `NavigationMenuLink` inside `Link` — that creates `<a>` inside `<a>` which causes React hook crashes.

**Correct:**
```tsx
<NavigationMenuLink asChild className="...">
  <Link href="/path">Label</Link>
</NavigationMenuLink>
```

**Wrong (causes nested <a> crash):**
```tsx
<Link href="/path">
  <NavigationMenuLink className="...">Label</NavigationMenuLink>
</Link>
```

**Why:** Wouter's `Link` renders as `<a>`. Radix `NavigationMenuLink` also renders as `<a>` by default. Nesting them produces invalid HTML that breaks React's hook system (useState/useContext reads return null).

**How to apply:** Any time NavigationMenu is combined with a client-side router's Link component.
