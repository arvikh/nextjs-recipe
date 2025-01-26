import { Recipie } from "@/types/request-body";
import Image from "next/image";
function RecipieCard({ recipe }: { recipe: Recipie }) {
  const { title, imageUrl, ingredients, instructions } = recipe;
  return (
    <div>
      <p>{title}</p>
      <Image src={imageUrl} alt="" width={250} height={250} />
      <p>{ingredients}</p>
      <p>{instructions}</p>
    </div>
  );
}

export default RecipieCard;
