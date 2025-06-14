import { AIMessage, HumanMessage } from '@langchain/core/messages';

export const mealRecommendationExamples = [
  {
    input: new HumanMessage(
      `User Profile:
Weight: 70.0kg
Height: 170cm
Gender: FEMALE
Age: 28
Goal: WEIGHT_LOSS
Additional Info: Allergic to peanuts, prefers vegetarian meals.`,
    ),
    output: new AIMessage(
      `General Recommendation: Focus on nutrient-dense, low-calorie options to support your weight loss goal and adhere strictly to your vegan challenge. Prioritize lean vegetarian proteins and plenty of fiber from fruits and vegetables, while strictly avoiding peanuts.
Meal Recommendations:
1. Breakfast: Oatmeal with berries and seeds (No peanuts).
   * Why: High fiber, good for weight loss, easily adaptable to vegetarian.
2. Lunch: Large mixed green salad with chickpeas and vinaigrette (No peanuts).
   * Why: Low calorie, high protein from chickpeas, vegetarian, no allergens.
3. Dinner: Lentil soup with whole-wheat bread (No peanuts).
   * Why: Hearty, protein-rich, vegetarian, warm, no allergens.`,
    ),
  },
  {
    input: new HumanMessage(
      `User Profile:
Weight: 90.0kg
Height: 185cm
Gender: MALE
Age: 35
Goal: MUSCLE_GAIN
Additional Info: Loves chicken and rice, wants quick recipes.`,
    ),
    output: new AIMessage(
      `General Recommendation: To support muscle gain, ensure a consistent intake of high-quality protein and complex carbohydrates throughout the day. Hydration is also key, especially with a busy schedule, so remember to drink plenty of water. Your current challenge emphasizes structured strength training.
Meal Recommendations:
1. Breakfast: Scrambled eggs with spinach and whole-wheat toast.
   * Why: High protein for muscle gain, quick preparation.
2. Lunch: Grilled chicken breast with brown rice and steamed broccoli.
   * Why: Classic muscle-gain meal, hits user's preference for chicken and rice.
3. Dinner: Baked salmon with quinoa and asparagus.
   * Why: Lean protein and complex carbs for recovery and muscle building.`,
    ),
  },
  {
    input: new HumanMessage(
      `User Profile:
Weight: 65.2kg
Height: 168cm
Gender: FEMALE
Age: 22
Goal: MAINTAIN_WEIGHT
Additional Info: No specific diet, just looking for variety.`,
    ),
    output: new AIMessage(
      `General Recommendation: For maintaining weight, focus on balanced meals from all food groups, ensuring variety and adequate nutrition without excessive calories. Explore new recipes to keep your diet exciting.
Meal Recommendations:
1. Breakfast: Greek yogurt with mixed fruits and a drizzle of honey.
   * Why: Balanced, refreshing, and provides good energy.
2. Lunch: Turkey and avocado wrap with a side of baby carrots.
   * Why: Quick, nutritious, and easy for a varied diet.
3. Dinner: Stir-fried vegetables with tofu and a light soy-ginger sauce.
   * Why: Versatile, healthy, and allows for various vegetable combinations.`,
    ),
  },
];
