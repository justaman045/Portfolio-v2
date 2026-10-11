import { portfolio } from "./content";

export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] =
  portfolio.contributions;

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);
