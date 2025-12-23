# Project Case Study Translation Guide

## How the Translation System Works

All project case study content is stored in the translation files (`src/translations/en.json` and `src/translations/ru.json`) to support both English and Russian languages. When users switch languages, the entire case study automatically updates.

---

## Adding a New Project - Step by Step

### Step 1: Register the Project

Add the project slug and configuration to `src/data/projectsData.js`:

```javascript
export const projectsRegistry = {
  'your-project-slug': {
    designSolutionsImageCount: 3,  // Number of design solution images
  },
  // ... other projects
};
```

### Step 2: Add English Content

Add your project to `src/translations/en.json` under the `projects` key:

```json
{
  "projects": {
    "backButton": "Back to Portfolio",
    "notFound": { ... },
    "sections": { ... },

    "your-project-slug": {
      "title": "Project Title",
      "subtitle": "Project Subtitle",
      "description": "Brief 2-3 line description",
      "period": "2025 Feb",
      "industry": "Industry Name",
      "role": "UI/UX Design",

      "overview": [
        "First paragraph of overview",
        "Second paragraph if needed"
      ],

      "problem": [
        "Paragraph explaining the problem",
        "Additional context if needed"
      ],

      "goals": {
        "paragraphs": [
          "Paragraph explaining goals"
        ],
        "bullets": [
          "First goal",
          "Second goal",
          "Third goal"
        ]
      },

      "userFlow": {
        "text": [
          "Paragraph about user flow"
        ]
      },

      "designSolutions": {
        "subheading": "Optional subheading",
        "text": [
          "Paragraph about design solutions"
        ]
      },

      "hifiDesigns": {
        "text1": [
          "First description paragraph"
        ],
        "text2": [
          "Second description paragraph"
        ]
      },

      "results": {
        "outcomes": [
          "First outcome",
          "Second outcome",
          "Third outcome",
          "Fourth outcome"
        ],
        "impactHeading": "Broader Impact",
        "impact": [
          "Paragraph about impact"
        ]
      }
    }
  }
}
```

### Step 3: Add Russian Translation

Add the exact same structure to `src/translations/ru.json` with Russian translations:

```json
{
  "projects": {
    "backButton": "Вернуться к портфолио",
    "notFound": { ... },
    "sections": { ... },

    "your-project-slug": {
      "title": "Название проекта",
      "subtitle": "Подзаголовок проекта",
      "description": "Краткое описание на 2-3 строки",
      "period": "Фев 2025",
      "industry": "Название индустрии",
      "role": "UI/UX Дизайн",

      "overview": [
        "Первый абзац обзора",
        "Второй абзац при необходимости"
      ],

      // ... same structure as English, with Russian translations
    }
  }
}
```

### Step 4: Upload Images

Upload images to `src/images/projects/your-project-slug/` following the naming convention:

- `img-cover.png` - Hero cover image
- `img-overview-1.png`, `img-overview-2.png` - Overview images
- `img-userflow-1.png` - User flow diagram
- `img-solutions-1.png`, `img-solutions-2.png`, etc. - Solution images
- `img-wireframes-1.png`, `img-wireframes-2.png` - Wireframes
- `img-hifi-1.png` through `img-hifi-11.png` - High fidelity designs

### Step 5: Access Your Project

Your project will be available at: `/projects/your-project-slug`

---

## Important Notes

1. **Slug Consistency**: The project slug in `projectsData.js`, translation files, and image folder must match exactly
2. **Structure Consistency**: Both `en.json` and `ru.json` must have the exact same structure
3. **Arrays**: Use arrays `[]` for paragraphs and lists - even single paragraphs should be in an array
4. **Optional Fields**:
   - `goals.bullets` is optional (can have just paragraphs)
   - `designSolutions.subheading` is optional
   - `results.impactHeading` is optional

---

## Content Structure Template

When providing content for a new project, structure it like this:

**HERO SECTION**
- Title:
- Subtitle:
- Description:
- Period:
- Industry:
- Role:

**PROJECT OVERVIEW**
- Paragraph 1:
- Paragraph 2:

**PROBLEM**
- Paragraph 1:
- Paragraph 2 (optional):

**GOALS & SUCCESS METRICS**
- Paragraph:
- Bullet 1:
- Bullet 2:
- Bullet 3:

**USER FLOW & IA**
- Paragraph:

**DESIGN SOLUTIONS**
- Subheading (optional):
- Paragraph:

**HIGH FIDELITY DESIGNS**
- Text 1 (after thumbnails):
- Text 2 (after scroll gallery):

**RESULTS & IMPACT**
- Outcome 1:
- Outcome 2:
- Outcome 3:
- Outcome 4:
- Impact heading (optional):
- Impact paragraph:

---

## Example

See the example structure in the translation files for reference.
