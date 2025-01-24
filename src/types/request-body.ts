import { z } from "zod";

export const userValidationType = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z.string().min(8).max(12),
});
export type userInput = z.infer<typeof userValidationType>;

export const recipeValidationType = z.object({
  title: z.string().nonempty(),
  instructions: z.string().nonempty(),
  ingredients: z.string().nonempty(),
  imageUrl: z.string(),
});
export type recipeInput = z.infer<typeof recipeValidationType>;
