import { Recipe } from "@/types/request-body";
import React from "react";
import Image from "next/image";

function Favorites({ recipe }: { recipe: Recipe }) {
  const { imageUrl } = recipe;
  
  return (
    <div>
      <Image
        src={imageUrl}
        width={50}
        height={50}
        alt=""
        style={{ marginRight: "4px" }}
        className="rounded-lg "
      />
    </div>
  );
}

export default Favorites;
