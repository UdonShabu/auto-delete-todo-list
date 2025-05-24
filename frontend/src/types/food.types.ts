export const FOOD_TYPES = ["Fruit", "Vegetable"] as const;
export type FoodType = (typeof FOOD_TYPES)[number];

export type FoodItem = {
  type: FoodType;
  name: string;
  id: string;
};
