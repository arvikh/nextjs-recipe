import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Recipie } from "@/types/request-body";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
const AddRecipe = ({
  setGetter,
}: {
  setGetter: Dispatch<SetStateAction<boolean>>;
}) => {
  const [recipe, setRecipe] = useState<Recipie>({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const handleAdd = useCallback(async () => {
    try {
      const response = await axios.post("/api/recipes/", {
        ...recipe,
      });
      console.log(response);
      if (response.data.success) {
        toast({
          title: response.data.message,
        });
        setGetter((prev) => !prev);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  }, [recipe, setGetter]);

  return (
    <div>
      <Input
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        placeholder="Recipe Title"
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
        placeholder="Recipe ingredients"
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        placeholder="Recipe instructions"
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
        placeholder="Recipe Image"
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};

export default AddRecipe;
