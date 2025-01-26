"use client";
import RecipieCard from "@/Common-Components/Common-recipe-card";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [cookie, _] = useCookies(["access_token"]);
  interface Recipie {
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string;
  }
  useEffect(() => {
    const getrecipies = async () => {
      try {
        const response = await axios.get("/api/recipes", {
          headers: {
            Authorization: `Bearer ${cookie.access_token}`,
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
  }, []);
  console.log(recipes);
  return (
    <div>
      <div>Home Page Logged IN</div>

      {recipes.map((eachItem: Recipie, index) => {
        return <RecipieCard key={eachItem._id} recipe={eachItem} />;
      })}
    </div>
  );
}

export default HomePage;
