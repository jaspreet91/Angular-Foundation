import { Ingredient } from './../shared/ingredients.model';
export interface Recipe {
  id?: string;
  name: string;
  description: string;
  imagePath: string;
  ingredient?: Ingredient[];
}
