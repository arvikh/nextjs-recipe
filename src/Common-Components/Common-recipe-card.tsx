import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Recipie } from "@/types/request-body";
import axios from "axios";

import Image from "next/image";
import { useCallback, useContext } from "react";

const RecipieCard = ({ recipe }: { recipe: Recipie }) => {
  const { title, imageUrl, ingredients, instructions, userId, _id } = recipe;
  const { id } = useContext(UserContext);

  const handleDelete = useCallback(async () => {
    try {
      const response = await axios.delete(`/api/recipes/${_id}`);
      if (response.data.success) {
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
  }, []);

  return (
    <div
      className="flex flex-col place-items-center "
      style={{
        width: "300px",
        backgroundColor: "#FFBF9B",
        borderRadius: "12px",
        margin: "4px",
        padding: "8px",
      }}
    >
      <p>{title}</p>
      <Image src={imageUrl} alt="" width={150} height={200} />
      <p className="text-sm">
        <strong>Ingredients:</strong> {ingredients}
      </p>
      <p className="text-sm font-mono">
        <strong>Instructions:</strong> {instructions}
      </p>
      <Button
        onClick={handleDelete}
        style={{ display: userId === id ? "block" : "none" }}
      >
        Delete
      </Button>
    </div>
  );
};

export default RecipieCard;
