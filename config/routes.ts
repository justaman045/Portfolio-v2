import { portfolio } from "./content";

export const routesConfig = {
  ...portfolio.navigation,
  mainNav: portfolio.navigation.mainNav.filter((item) => item.enabled !== false),
};