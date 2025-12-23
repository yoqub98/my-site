// Projects Registry
// This file only contains the list of available project slugs and their image counts
// All translatable content is stored in src/translations/en.json and ru.json

export const projectsRegistry = {
  'stekshield-crm': {
    designSolutionsImageCount: 4,  // Number of design solution images (img-solutions-1.png through img-solutions-4.png)
  }
};

// Helper function to get all project slugs
export const getProjectSlugs = () => Object.keys(projectsRegistry);

// Helper function to check if project exists
export const projectExists = (slug) => slug in projectsRegistry;

// Helper function to get project config
export const getProjectConfig = (slug) => projectsRegistry[slug];
