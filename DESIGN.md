---
name: 4Cast
description: Decision Intelligence, set as night and day sheets under a lighthouse, where a thin goal gives way to a heavy decision.
colors:
  sea-0: "#050b13"
  night: "#08111c"
  night-2: "#0d1b2c"
  sea-3: "#10202f"
  ink: "#e8eef4"
  ink-2: "#b3c1ce"
  ink-3: "#8295a8"
  ink-4: "#4a5d70"
  rule: "rgba(200, 218, 234, .13)"
  rule-2: "rgba(200, 218, 234, .26)"
  day: "#f2f5f8"
  d-ink: "#0b1a2b"
  d-ink-2: "#44566a"
  white: "#ffffff"
  violet: "#693296"
  blue: "#226BC4"
  sky: "#47AEE3"
typography:
  display-goal:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 4.9vw, 5.5rem)"
    fontWeight: 200
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  display-lead:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 4.9vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline-thin:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.7vw, 4.75rem)"
    fontWeight: 200
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline-heavy:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.7vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline-xl:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 4rem)"
    fontWeight: 200
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  figure:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 6.2vw, 6.25rem)"
    fontWeight: 200
    lineHeight: 0.92
    letterSpacing: "-0.055em"
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.9vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  lede:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
  nav:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
  tag:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  focus: "4px"
  nav-item: "8px"
  menu-item: "10px"
  menu: "14px"
  well: "18px"
  card: "28px"
  console: "clamp(24px, 2.6vw, 36px)"
  sheet: "clamp(24px, 3vw, 44px)"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 6vw, 112px)"
  max: "1320px"
  lap: "clamp(24px, 3vw, 44px)"
  sheet-top: "clamp(5.5rem, 10vw, 9rem)"
  sheet-bottom: "clamp(6rem, 11vw, 10rem)"
  block: "clamp(4rem, 8vw, 6.5rem)"
  card-pad: "clamp(1.75rem, 3vw, 2.5rem)"
  card-gap: "clamp(1rem, 2vw, 1.5rem)"
components:
  button-light:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.night}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "1.05em 1.7em"
  button-light-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.night}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.3em"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.nav}"
    rounded: "{rounded.nav-item}"
    padding: "0.7rem 0.85rem"
  nav-submenu:
    backgroundColor: "rgba(8, 17, 28, .97)"
    rounded: "{rounded.menu}"
    padding: "0.6rem"
    width: "22rem"
  console:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink}"
    rounded: "{rounded.console}"
    padding: "clamp(2rem, 4.5vw, 4.5rem)"
  decision-index-item:
    textColor: "rgba(232, 238, 244, .38)"
    typography: "{typography.statement}"
    padding: "0.14em 0"
  decision-index-item-selected:
    textColor: "{colors.white}"
  decision-index-marker:
    backgroundColor: "{colors.sky}"
    rounded: "4px"
    width: "4px"
  product-screen:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.well}"
  product-screen-caption:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    padding: "1rem 1.1rem"
  figure-card:
    backgroundColor: "rgba(255, 255, 255, .1)"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  pillar:
    backgroundColor: "{colors.white}"
    textColor: "{colors.d-ink-2}"
    rounded: "{rounded.card}"
    padding: "clamp(1.75rem, 2.6vw, 2.5rem)"
  pillar-accent:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink-2}"
  sector-panel:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.5rem 1.5rem 1.75rem"
  sector-panel-hover:
    backgroundColor: "#10223a"
  arrow-button:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.night}"
    rounded: "{rounded.round}"
    size: "40px"
  arrow-button-hover:
    backgroundColor: "{colors.white}"
  tag-on-field:
    textColor: "{colors.white}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.75em"
  tag-pending:
    textColor: "{colors.violet}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.75em"
---

# Design System: 4Cast

## Overview

**Creative North Star: "Night and Day Under the Lighthouse"**

The page opens on a looping lighthouse film and closes on the same film. Between the two, the site is a stack of rounded-top sheets that slide over one another, alternating deep night and cool daylight, with a single brand-gradient field in the middle that carries the figures. Each sheet is its own surface; the overlap and the soft shadow on its top edge are what separate sections, not lines.

The voice is set by one typographic move, repeated everywhere: a thin Poppins 200 setup followed by a heavy Poppins 800 payoff. The goal is quiet; the decision carries the weight. That rhythm runs from the hero ("You know where you want to go." then "Know where every decision leads.") through every section heading and into the motto, where weight climbs from 200 to 400 to 800 across three phrases.

Density is generous and confident: large type, wide gutters, few elements per sheet, and big rounded tiles (28px) for anything that groups content. Light appears as the brand's sky blue on night and the brand's blue on day, and in the sector fan's drawn beam and the sweep that lights the chosen decision. Motion is a soft arrival from blur and a short rise, never a bounce.

**Key Characteristics:**
- Rounded-top sheets that overlap by one lap and alternate night, day and one gradient field.
- Every heading pairs a 200 setup with an 800 payoff.
- Sky (#47AEE3) is the accent on night; blue (#226BC4) is the accent on day.
- Large rounded tiles (28px) and pill controls; round arrow buttons.
- A night console set into the day page holds the product interaction.
- The lighthouse film bookends the page; content arrives from blur.

## Colors

A deep navy night, a cool near-white day, and the brand's purple, blue and sky used as light rather than decoration.

### Primary
- **Beacon Sky** (sky): the accent on night surfaces. The decision index marker, the lit sector's mode label, emphasis in the lede, bullet dots, the round arrow buttons, the logo rail's centre marks, focus rings and text selection.
- **Signal Blue** (blue): the accent on day surfaces. The product screen's caption bar and the middle of the brand gradient.

### Secondary
- **Brand Purple** (violet): the start of the brand gradient, the first (hindsight) wedge of the sector fan at low opacity, and the "Pending approval" tag on day.

### Neutral
- **Abyss** (sea-0): the deepest night. Hero and close backdrop, logo register, footer, scrims, scrollbar track.
- **Night** (night): the night sheet, the console's base, the accent pillar, text on sky.
- **Raised Night** (night-2): sector panels on the night sheet.
- **Menu Night** (sea-3): hover fill for submenu items.
- **Moonlit Ink** (ink): primary text on night, the light button.
- **Mist** (ink-2): secondary text on night, nav links, ledes.
- **Fog** (ink-3): tertiary text on night, dimmed sectors, footer legal.
- **Deep Fog** (ink-4): scrollbar thumb only.
- **Ring** (rule) and **Strong Ring** (rule-2): 1px inset rings on night controls (ghost button, mobile menu toggle) and the scrolled nav's bottom edge.
- **Daylight** (day): the day sheet.
- **Day Ink** (d-ink) and **Day Slate** (d-ink-2): primary and secondary text on day; Day Slate also carries the thin half of day headings.
- **White** (white): pillars and product screens on day, the payoff on night and field, hover state for arrow buttons and the light button.

### The Brand Gradient
The field sheet uses `linear-gradient(118deg, #693296 0%, #3d4fb3 34%, #226BC4 64%, #3593d0 100%)`: purple to blue to sky on a diagonal, as in the logo. The logo is the supplied file `site/assets/brand/4cast.svg`, used as-is in the nav and footer, with its own gradient running sky, #2495d3, #285da8, purple.

### Named Rules
**The Accent Follows the Surface Rule.** Sky is the accent on night, blue is the accent on day. Never set sky as an accent on the day sheet.

**The One Field Rule.** The brand gradient fills exactly one sheet, the one that carries the ROI figures. Elsewhere the gradient lives only in the logo.

## Typography

**Display Font:** Poppins (with system-ui, sans-serif)
**Body Font:** Poppins (with system-ui, sans-serif)

**Character:** One family carries everything, made expressive by weight contrast rather than by a second face. Weights 200 and 800 do the talking; 400 to 700 do the reading.

### Hierarchy
- **Display** (200 then 800, clamp(2.35rem, 4.9vw, 5.5rem), 1.04): the hero only. The goal line is 200 at 78% ink; the lead line is 800 with -0.04em tracking and a little extra word spacing (.1em).
- **Headline** (200 + 800, clamp(2.2rem, 4.7vw, 4.75rem), 1.04, max 19ch, balanced): every section heading. The close uses the XL step (clamp(2.4rem, 5.4vw, 5.5rem), max 17ch).
- **Statement** (200 with an 800 payoff, clamp(2rem, 4.2vw, 4rem), 1.08): a single closing line inside a sheet.
- **Figure** (200, clamp(3.25rem, 6.2vw, 6.25rem), 0.92, -0.055em, tabular lining numerals): ROI figures on the field.
- **Title** (700, clamp(1.5rem, 2.5vw, 2.25rem), 1.18): the decision question in the console. The console heading uses the thin/heavy pair at clamp(1.6rem, 2.6vw, 2.5rem).
- **Card Title** (800, clamp(1.375rem, 1.9vw, 1.75rem), -0.03em): pillar titles; sector panel titles are the same voice at 1.25rem.
- **Lede** (400, clamp(1.125rem, 1.5vw, 1.375rem), 1.55, max 48ch): the paragraph under a night heading.
- **Body** (400, 1.0625rem, 1.65; 1rem under 600px): running text, max 52 to 56ch.
- **Label** (700, 0.6875rem, 0.12em, uppercase): status tags only ("Target", "Pending approval").

### Named Rules
**The Thin-Heavy Rule.** Every heading is two halves: a 200 setup and an 800 payoff. The thin half takes the muted colour of its surface (Day Slate on day, 72% ink on night, 82% white on the field); the heavy half takes full strength.

**The Light Figure Rule.** Big numbers are set at 200, not bold. Their size carries them.

## Layout

A single centred column (max 1320px) inside fluid gutters (clamp(16px, 6vw, 112px); 16px under 600px). Below the hero, each section is a sheet: it pulls up over the previous one by one lap (clamp(24px, 3vw, 44px)) and pads its top by its standard top space plus 40% of the lap. Sheet order is night register, day, night, gradient field, day, night, then the close film and the abyss footer.

Inside a sheet, major blocks are separated by clamp(4rem, 8vw, 6.5rem). Tile grids are three columns (figures, pillars) or four (sector panels) with gaps around clamp(1rem, 2vw, 1.5rem). The console splits 1fr decision index / 1.1fr decision panel. The sector fan indents its list by clamp(14rem, 34%, 30rem) so the beam can open from the left.

Breakpoints: at 1100px sector panels go to two columns, pillars to two with the wide pillar spanning; at 900px the nav collapses to a full-screen menu and the console, prose and figures stack; at 600px tiles go to one column and the hero and close copy move to the top over the film.

## Elevation & Depth

Depth is tonal first: sheets of different surfaces stacked by overlap. Shadows are soft, wide and low-contrast, always negative-spread, so they read as atmosphere, never as an outline.

### Shadow Vocabulary
- **Sheet edge** (`box-shadow: 0 -30px 60px -40px rgba(2, 6, 12, .6)`): the upward shadow on every sheet's rounded top, which sells the overlap.
- **Console lift** (`box-shadow: 0 50px 90px -50px rgba(11, 26, 43, .55), 0 20px 40px -30px rgba(11, 26, 43, .35)`): the night console sitting in the day page.
- **Screen lift** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, .7)`): the product screen inside the console.
- **Menu** (`box-shadow: 0 0 0 1px var(--rule), 0 24px 60px -20px rgba(0,0,0,.8)`): the nav submenu.
- **Scrolled nav**: 82% abyss with a 14px backdrop blur and a 1px Ring edge.

### Named Rules
**The Overlap Not Line Rule.** Sections are separated by a sheet sliding over the previous one, never by a divider rule.

## Shapes

Everything is rounded, and the radius grows with the surface: 8 to 14px for nav items and menus, 18px for product screens and art wells, 28px for every content tile, clamp(24px, 2.6vw, 36px) for the console, and clamp(24px, 3vw, 44px) for sheet tops (top corners only; sheets run square into the next sheet below). Interactive controls are pills (999px) or circles. Borders are inset 1px rings on controls only; tiles have no border.

## Components

### Buttons
Soft pills that press in.
- **Shape:** pill (999px).
- **Light:** Moonlit Ink fill, Night text, 600 1rem, padding 1.05em 1.7em. The main call to action on the hero and the close.
- **Ghost:** transparent with a 1px Strong Ring inset, 0.9375rem, padding 0.8em 1.3em. The nav's "Request a Demo".
- **Hover / Focus:** light goes to White; ghost's ring goes to sky and its text to white. Hover only applies on fine pointers. Focus is a 2px sky outline offset 4px.
- **Press:** scale to .97 over 160ms on the ease-out curve.
- **Text link:** sky, 600, with a small arrow that moves 4px right on hover.

### Navigation
Fixed, transparent over the film, turning to blurred abyss after 24px of scroll. Links are Mist 500 0.9375rem in 8px-rounded hit areas; hover and open go to ink. Dropdowns are 22rem night panels (14px radius) with two-line items (title in ink, line in Fog) that fill with Menu Night on hover; they open with a short scale-and-fade from the top-left. Under 900px, a round toggle opens a full-screen abyss menu.

### Night Console
A night panel set into the day sheet, with a radial glow (#13253b at the top-left fading to Night) and the console lift shadow. Left: the decision index, five decision names stacked large (Poppins clamp(2.2rem, 3.5vw, 3.6rem), line-height 1.08). At rest each is weight 200 in ink at 38% (72% on hover). The chosen one is wiped in at weight 800 white from left to right by a clip-path sweep (500ms, ease-out) laid over the thin word, which fades out beneath it, and a 4px sky marker bar slides to it (500ms, ease-in-out). Hover selects on fine pointers after a 110ms intent delay; tap selects on touch; arrow keys, Home and End move between them as an ARIA tab list. Right: the decision panel (Title question, Mist body) and the product screen: a white 18px card with a light grey bar (screen name and "Illustrative demo data"), the screen image, and a Signal Blue caption bar with a white dot and the verdict in white 700. Switching tabs blurs the panel out and back in over 300ms, staggered.

### Sector Fan
On the night sheet, three rows (hindsight, foresight, action) with a drawn fan opening from a lamp on the left. The two dim rows are Fog 300 on faint wedges (the first tinted purple); the lit row is white 800 at larger size on a sky-to-blue wedge, with its mode label in sky.

### Figure Cards
On the gradient field: three 28px tiles at 10% white, a 200-weight figure with a white outlined "Target" tag above it, an 800 white title and an 82% white line.

### Trust Pillars
On the day sheet: white 28px tiles with an 800 Day Ink title and Day Slate text. The first pillar is wide (two columns) with larger body; the last is the accent tile, Night with a sky title.

### Sector Panels
On the night sheet: four Raised Night 28px panels. Each opens with an art well (18px, 7% sky tint) holding a small line drawing in faint ink with sky highlights, then an 800 title, a 300 question, and sky-dot bullets. Panels with a destination end in a round 40px sky arrow button (Night arrow) that turns white on hover and presses to .94. On hover the panel lifts 4px and lightens to #10223a.

### Logo Rail
On the abyss register beside a light 300 heading: client logos drift left on a 70s loop (55s on small screens) at 42% opacity, faded at both ends, and pass under a lit centre where a second copy shows them at full opacity between two short sky ticks. Hover pauses the rail.

### Hero and Close
The hero is a full-viewport looping lighthouse film behind a left-weighted scrim. Its headline plays in two acts: the 200 goal line breathes in from 18px blur with its letter spacing settling, then the 800 lead line arrives word by word from blur and slight scale, 150ms apart, followed by the subline and the button (about five seconds in total). The close is a sheet-topped section that replays the same film behind the XL heading, a lede, the light button and the brand line in 200.

### Section Reveals
Headings and then their content rise 16px and fade in over 700ms on the ease-out curve, staggered by 70ms (up to six steps), once per element.

## Do's and Don'ts

### Do:
- **Do** separate sections by overlapping rounded-top sheets with the sheet edge shadow, alternating night and day.
- **Do** write every heading as a 200 setup plus an 800 payoff, with the thin half in its surface's muted colour.
- **Do** use sky (#47AEE3) as the accent on night and blue (#226BC4) as the accent on day.
- **Do** group content in 28px rounded tiles and make controls pills or circles that scale down slightly on press (.94 to .97).
- **Do** bring content in with a short rise and fade (16px, 700ms, ease-out, 70ms stagger) or from blur, and in reduced motion keep only gentle opacity fades with the films paused on their poster.
- **Do** reserve the brand gradient for the one field sheet and the logo.

### Don't:
- **Don't** draw divider lines between sections or inside tiles; the sheet overlap does that work.
- **Don't** put sky on the day sheet as an accent or blue on night as an accent.
- **Don't** set big figures bold; they are 200.
- **Don't** add a second gradient field, or use the gradient as a button or text fill outside the logo.
- **Don't** use bouncy or elastic easing; use the ease-out and ease-in-out curves.
