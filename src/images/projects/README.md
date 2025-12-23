# Project Images Folder Structure

This folder contains images for project case studies.

## Structure

For each project, create a subfolder with the project slug name:

```
src/images/projects/
├── project-slug-1/
│   ├── img-cover.png
│   ├── img-overview-1.png
│   ├── img-overview-2.png
│   ├── img-userflow-1.png
│   ├── img-solutions-1.png
│   ├── img-solutions-2.png
│   ├── img-solutions-3.png
│   ├── img-wireframes-1.png
│   ├── img-wireframes-2.png
│   ├── img-hifi-1.png
│   ├── img-hifi-2.png
│   ├── ... through img-hifi-11.png
│   └── ... (add more as needed)
└── project-slug-2/
    └── ... (same structure)
```

## Image Naming Convention

| Section | Naming Pattern | Examples |
|---------|---------------|----------|
| Hero Cover | `img-cover` | `img-cover.png` |
| Project Overview | `img-overview-{n}` | `img-overview-1.png`, `img-overview-2.png` |
| User Flow | `img-userflow-{n}` | `img-userflow-1.png` |
| Design Solutions | `img-solutions-{n}` | `img-solutions-1.png`, `img-solutions-2.png`, `img-solutions-3.png` |
| Wireframes | `img-wireframes-{n}` | `img-wireframes-1.png`, `img-wireframes-2.png` |
| High Fidelity UI | `img-hifi-{n}` | `img-hifi-1.png`, `img-hifi-2.png`, ... `img-hifi-11.png` |

## Important Notes

- Use the exact naming pattern shown above
- Images can be in PNG, JPG, or other web formats
- The project slug in the folder name must match the slug in `src/data/projectsData.js`
- If an image is missing, a placeholder will be displayed automatically
