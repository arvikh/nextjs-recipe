"use client";
import AddRecipe from "@/Common-Components/Add-Recipe";
import RecipieCard from "@/Common-Components/Common-recipe-card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Recipie } from "@/types/request-body";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [getter, setGetter] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post("/api/user/logout");
      if (response.data.success) {
        toast({
          title: response.data?.message,
        });
        router.push("/signin");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  }, [router]);
  useEffect(() => {
    const getrecipies = async () => {
      try {
        const response = await axios.get("/api/recipes", {
          headers: {
            request: "web",
          },
        });
        if (response.data.success) {
          setRecipes(response.data.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        toast({
          title: "something went wrong",
        });
      }
    };
    getrecipies();
  }, [getter]);

  return (
    <div className="flex">
      <div>
        <h1>Home Page Logged IN</h1>
        <Button onClick={handleLogout}>Logout</Button>
        {recipes.map((eachItem: Recipie) => {
          return <RecipieCard key={eachItem?._id} recipe={eachItem} />;
        })}
      </div>
      <div>
        <AddRecipe setGetter={setGetter} />
      </div>
    </div>
  );
}

export default HomePage;
