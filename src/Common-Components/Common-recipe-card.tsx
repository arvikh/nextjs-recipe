import { useCookies } from "react-cookie";
import { toast } from "@/hooks/use-toast";

import axios from "axios";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Recipe } from "@/types/request-body";
import { HeartIcon, Trash2Icon } from "lucide-react";

function RecipeCard({
  recipe,
  setGetter,
}: {
  recipe: Recipe;
  setGetter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { title, imageUrl, ingredients, instructions, userId, _id } = recipe;
  const [cookie, _] = useCookies(["user_id"]);
  const [isFav, setFavorite] = useState(false);

  useEffect(() => {
    const getFavStatus = async () => {
      try {
        const response = await axios.get(`/api/recipes/favorites/${_id}`);
        if (response.data.success) {
          setFavorite(!isFav);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: error.message,
            variant: "destructive",
          });
        }
      }
    };
    getFavStatus();
  }, []);

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

  const handleFavorites = useCallback(async () => {
    try {
      const response = await axios.post(`/api/recipes/favorites`, {
        recipeId: _id,
      });
      if (response.data.success) {
        setFavorite(!isFav);
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
  }, [_id, isFav, setGetter]);

  return (
    <div
      className="flex flex-col justify-between gap-3"
      style={{
        width: "300px",
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
      <div className="flex justify-between" style={{ width: "95%" }}>
        <HeartIcon
          style={{
            color: "red",
            margin: "auto",
            cursor: "pointer",
            fill: isFav ? "red" : "",
          }}
          onClick={handleFavorites}
        ></HeartIcon>

        <Trash2Icon
          onClick={handleDelete}
          style={{
            display: userId === cookie.user_id ? "block" : "none",
            cursor: "pointer",
            margin: "auto",
          }}
        ></Trash2Icon>
      </div>
    </div>
  );
}

export default RecipeCard;
