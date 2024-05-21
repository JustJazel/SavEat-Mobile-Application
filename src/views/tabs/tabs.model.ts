import { fastFoodOutline, searchOutline, bulbOutline, newspaperOutline } from 'ionicons/icons';

export const TAB_ROUTES = {
  FOOD_ENTRIES: {
    path: '/tabs/food-entries',
    name: 'Food Entries',
    icon: fastFoodOutline,
  },
  BROWSE: {
    path: '/tabs/browse',
    name: 'Browse',
    icon: searchOutline,
  },
  REPORTS: {
    path: '/tabs/reports',
    name: 'Reports',
    icon: newspaperOutline,
  },
  SUGGESTIONS_V2: {
    path: '/tabs/suggestions/v1',
    name: 'Suggestions',
    icon: bulbOutline,
  },
};
