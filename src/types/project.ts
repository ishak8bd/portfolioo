export interface ProjectCaseStudy {
  problem: string;
  whyThisApproach: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  whatBroke: string;
  keyTakeaway: string;
}

export interface Project {
  id: string;
  index: string; // e.g. "01 / 05"
  title: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  image: string;
  accentColor: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudy: ProjectCaseStudy;
}
