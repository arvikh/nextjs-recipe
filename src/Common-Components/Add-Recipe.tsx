import { Dispatch, SetStateAction, useCallback, useState, useRef } from "react";
import { Recipe } from "@/types/request-body";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
const AddRecipe = ({
  setGetter,
}: {
  setGetter: Dispatch<SetStateAction<boolean>>;
}) => {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const inputRef = useRef(null);

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

        setRecipe({ ...recipe, title: "" });
        setRecipe({ ...recipe, ingredients: "" });
        setRecipe({ ...recipe, instructions: "" });
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
    <div style={{ color: "white" }}>
      <Input
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        placeholder="Recipe Title"
        style={{
          backgroundColor: "#CAE0BC",
          marginBottom: "4px",
          border: "none",
        }}
        ref={inputRef}
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
        placeholder="Recipe ingredients"
        style={{
          backgroundColor: "#CAE0BC",
          marginBottom: "4px",
          border: "none",
        }}
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
        placeholder="Recipe instructions"
        style={{
          backgroundColor: "#CAE0BC",
          marginBottom: "4px",
          border: "none",
        }}
      />
      <Input
        onChange={(e) => setRecipe({ ...recipe, imageUrl: e.target.value })}
        placeholder="Recipe Image"
        style={{
          backgroundColor: "#CAE0BC",
          marginBottom: "4px",
          border: "none",
        }}
      />
      <Button onClick={handleAdd} style={{ backgroundColor: "#635985" }}>
        Add
      </Button>
    </div>
  );
};

export default AddRecipe;
