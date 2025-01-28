import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { toast } from "@/hooks/use-toast";

import axios from "axios";

import Image from "next/image";
import { useCallback } from "react";
import { Recipe } from "@/types/request-body";

function RecipeCard({
  recipe,
  setGetter,
}: {
  recipe: Recipe;
  setGetter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { title, imageUrl, ingredients, instructions, userId, _id } = recipe;
  const [cookie, _] = useCookies(["user_id"]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await axios.delete(`/api/recipes/${_id}`);
      if (response.data.success) {
        setGetter((prev) => !prev);
        toast({
          title: response.data?.message,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  }, [_id, setGetter]);

  return (
    <div
      className="flex flex-col justify-between gap-3"
      style={{
        maxWidth: "300px",
        minWidth: "auto",
        backgroundColor: "#CAE0BC",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "4px",
        padding: "8px",
        color: "#191919",
      }}
    >
      <Image
        src={imageUrl}
        alt=""
        width={150}
        height={200}
        className="rounded-lg"
      />
      <p>
        <strong>{title}</strong>
      </p>
      <p className="text-sm pb-3">
        <strong>Ingredients:</strong> {ingredients}
      </p>
      <p className="text-sm pb-3">
        <strong>Instructions:</strong> {instructions}
      </p>
      <Button
        onClick={handleDelete}
        style={{
          display: userId === cookie.user_id ? "block" : "none",
          backgroundColor: "#635985",
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default RecipeCard;
