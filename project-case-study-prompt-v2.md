# Project Case Study Page Template - Prompt for Claude Code

## What You're Building

A reusable project case study page template for a portfolio website. Each project will be a single JSX file. The template should be data-driven so I can later just provide content and images, and the page renders automatically.

---

## Image Folder Structure

I will manually upload images to this location:
```
src/images/projects/{project-slug}/
```

Example for a project called "stekshield-crm":
```
src/images/projects/stekshield-crm/
├── img-cover.png
├── img-overview-1.png
├── img-overview-2.png
├── img-wireframes-1.png
├── img-wireframes-2.png
├── img-hifi-1.png
├── img-hifi-2.png
└── ... etc
```

**If an image is not found:** Display a light gray rectangle with small centered text saying "Placeholder image" - this helps me see where images are missing.

---

## Image Naming Convention

| Section | Naming Pattern | Examples |
|---------|---------------|----------|
| Hero Cover | `img-cover` | `img-cover.png` |
| Project Overview | `img-overview-{n}` | `img-overview-1.png`, `img-overview-2.png` |
| User Flow | `img-userflow-{n}` | `img-userflow-1.png` |
| Design Solutions | `img-solutions-{n}` | `img-solutions-1.png`, `img-solutions-2.png`, `img-solutions-3.png` |
| Wireframes | `img-wireframes-{n}` | `img-wireframes-1.png`, `img-wireframes-2.png` |
| High Fidelity UI | `img-hifi-{n}` | `img-hifi-1.png`, `img-hifi-2.png`, ... `img-hifi-11.png` |

---

## Page Layout - Section by Section

### SECTION 1: Hero (Top of Page)

**Desktop Layout:** Two columns side by side
- **Left column (narrower, ~40%):**
  - Bold large title at top (biggest text on page)
  - Subtitle/header below it (smaller but still prominent)
  - Short description paragraph (2-3 lines, muted gray text)
  - Three metadata cards ( containers) items in a horizontal row:
    - PERIOD → value below (e.g., "2025 Feb")
    - INDUSTRY → value below (e.g., "Automotive")  
    - ROLE → value below (e.g., "UI UX Design")
    - Labels are small caps, muted; values are bold
    - Apply glass like blur effect to cards 

- **Right column (wider, ~60%):**
  - Large cover image showcasing the project
  - Image shows device mockups (laptop, tablet, phone arrangement)

**Mobile:** Stacks vertically - text content first, then image below

**Image:** `img-cover`

---

### SECTION 2: Project Overview

**Heading:** "Project Overview"

**Layout from top to bottom:**
1. Section heading
2. One or two paragraphs of text (full width)
3. Two images placed side by side (50% / 50% split)
   - Both images same height, sitting in a row
   - On mobile: stack vertically

**Images:** `img-overview-1`, `img-overview-2`

---

### SECTION 3: Problem

**Heading:** "Problem"

**Layout:**
- Section heading
- Text paragraphs only (no images in this section)
- Full width text block

---

### SECTION 4: Goals & Success Metrics

**Heading:** "Goals & Success Metrics"

**Layout:**
- Section heading
- Text paragraphs (full width)
- May include bullet points if provided in content

---

### SECTION 5: User Flow & Information Architecture

**Heading:** "User Flow & Information Architecture"

**Layout from top to bottom:**
1. Section heading
2. Text paragraph explaining the user flow
3. Large image/diagram spanning full content width (shows flowchart or IA diagram)

**Images:** `img-userflow-1` (can support multiple if needed)

---

### SECTION 6: Design Solutions

**Heading:** "Design Solutions" (appears as main heading, can have a repeated subheading for style)

**Layout from top to bottom:**
1. Section heading (and optional subheading)
2. Text paragraph
3. **Horizontally scrollable image gallery**
   - Images are in a row that extends beyond the viewport
   - User can scroll left/right to see more images
   - Only 2-3 images visible at once, rest are cut off (indicating scroll)
   - Small gap between each image
   - Smooth horizontal scroll behavior

**Images:** `img-solutions-1`, `img-solutions-2`, `img-solutions-3`, ... (as many as provided)

---

### SECTION 7: Wireframes

**Heading:** "Wireframes"

**Layout:**
1. Section heading
2. Two images side by side (50% / 50% split)
   - Shows low-fidelity wireframe screens
   - On mobile: stack vertically

**Images:** `img-wireframes-1`, `img-wireframes-2`

---

### SECTION 8: High Fidelity UI Designs ⭐

**Heading:** "High Fidelity UI Designs"

This section has a **mixed layout** with multiple rows of different types:

**Row 1:** One large image (full content width) - featured screen

**Row 2:** Four small thumbnail images in a grid (4 columns on desktop, 2x2 on tablet, stacked on mobile)

**Row 3:** Text paragraph describing the designs

**Row 4:** One large image (full content width)

**Row 5:** Four thumbnail images in a **horizontally scrollable row**
- Similar to Design Solutions section
- Images partially cut off on the right, indicating scroll
- User scrolls horizontally to see all

**Row 6:** Text paragraph

**Row 7:** One large centered image (full width)

---

**⭐ INTERACTIVE BEHAVIOR: Image Click to Expand**

When user clicks ANY image in this section (small thumbnail or large):
- Image opens in a **fullscreen overlay/lightbox**
- Dark semi-transparent background behind it
- Image displays large and centered on screen
- "X" close button in corner
- Clicking outside the image OR pressing Escape closes it
- Smooth fade/scale animation when opening and closing

This micro-interaction lets users inspect UI designs in detail.

**Images:** `img-hifi-1` through `img-hifi-11` (or more, numbered sequentially)

Suggested mapping:
- `img-hifi-1` → Row 1 large image
- `img-hifi-2`, `img-hifi-3`, `img-hifi-4`, `img-hifi-5` → Row 2 thumbnails
- `img-hifi-6` → Row 4 large image
- `img-hifi-7`, `img-hifi-8`, `img-hifi-9`, `img-hifi-10` → Row 5 scroll thumbnails
- `img-hifi-11` → Row 7 final large image

---

### SECTION 9: Results & Impact

**Heading:** "Results & Impact"

**Layout from top to bottom:**
1. Section heading
2. **"Outcomes" subheading**
3. Bullet point list (4-5 items) showing key results
4. **Another "Outcomes" subheading** (or different subheading)
5. Text paragraph describing broader impact

---

## Visual Hierarchy & Spacing

**Typography hierarchy (largest to smallest):**
1. Hero title (biggest, boldest)
2. Hero subtitle
3. Section headings (e.g., "Project Overview", "Problem")
4. Subheadings (e.g., "Outcomes", "Design Solutions" repeated)
5. Body text paragraphs
6. Meta labels (PERIOD, INDUSTRY, ROLE)

**Spacing:**
- Large vertical gaps between major sections (80-120px)
- Medium gaps between heading and content within sections (24-40px)
- Small gaps between images in a row (16-24px)
- Consistent horizontal padding throughout

**Image styling:**
- Slightly rounded corners on all images
- Optional subtle shadow on some images
- Images should maintain aspect ratio, never stretch

---

## Responsive Behavior Summary

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero | 2 columns side by side | 2 columns or stacked | Stacked |
| Side-by-side images | 50/50 row | 50/50 row | Stacked |
| 4-image grid | 4 columns | 2x2 grid | Stacked |
| Horizontal scroll galleries | Scroll enabled | Scroll enabled | Scroll enabled |
| Padding | Generous | Medium | Compact |

---

## Summary

The page flows vertically through these sections in order:
1. **Hero** - Title, subtitle, description, metadata + cover image
2. **Project Overview** - Text + 2 images side by side
3. **Problem** - Text only
4. **Goals & Success Metrics** - Text only
5. **User Flow & IA** - Text + large diagram image
6. **Design Solutions** - Text + horizontal scroll gallery
7. **Wireframes** - 2 images side by side
8. **High Fidelity UI Designs** - Mixed rows of large images, thumbnail grids, scroll galleries + click-to-expand lightbox
9. **Results & Impact** - Bullet list + text

Each project case study = 1 JSX file. I will provide content and upload images to the correct folder using the naming convention, and the template renders everything.

If you need wireframe of how this looks -> check file wireframes.pdf in root folder of this project 

NOte : wireframe is just low-fidelity designs, not the actual UI sample.

For UI -> stick to styling of the website ( to the same primary colors, fonts, rounded soft corners, deep shadows etc. referencing main page style)

