import { ValidPages } from "./constants";
import { portfolio } from "./content";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
  };
};

export const pagesConfig = portfolio.pages as unknown as PagesConfig;
