# Interactive Sound & i18n Design

## 1. Pixel Bug Characters

6 types of CSS pixel-art bugs float around the page. Click to capture.

| Bug | Pixel Art | SE | Movement | Rarity |
|---|---|---|---|---|
| Zoumushi (weevil) | Small black body + long snout | `coin` | Slow linear | Common |
| Butterfly | Symmetric wings, fluttering | `jump` | Vertical float | Common |
| Ladybug | Red circle + black dots | `powerup` | Small circles | Common |
| Kamikiri (longhorn beetle) | Black body + long antennae | `laser` | Medium-fast linear | Uncommon |
| Kuwagata (stag beetle) | Black, large mandibles | `select` | Random | Uncommon |
| Yakuneki | Gold-tinted body | `1up` | Fast + erratic | Ultra-rare |

- 3-4 bugs visible at a time
- Click to capture: SE plays, bug shrinks and disappears
- Counter in bottom-right: shows per-species count
- Respawn after a delay at random position
- Yakuneki has ~5% spawn chance (50-year uncaught tribute)

## 2. Section Transition Sounds

IntersectionObserver triggers SE and BGM variation changes on scroll.

| Section | Entry SE | BGM Variation | Notes |
|---|---|---|---|
| Hero | — | FULL | Opening fanfare already handled |
| About | `select` | FULL | |
| Exhibition | `coin` | Reduced layers | Solemn feel |
| Theme Song | `cancel` | **Stop (fade)** | Avoid clash with YouTube |
| Footer | `select` | **Resume (fade)** | |

- Debounce: same section won't re-trigger within 2s
- Theme Song section fades BGM out, leaving fades it back in

## 3. i18n (Japanese / English / Chinese)

| Language | Code | Flag |
|---|---|---|
| Japanese | `ja` | JP |
| English | `en` | US |
| Simplified Chinese | `zh` | CN |

- Flag buttons fixed top-right (click plays `select` SE)
- Auto-detect via `navigator.language` on first load
- Client-side only (no route-based i18n) — single-page LP
- React Context + dictionary object for translations
- All text including splash screen is translated
