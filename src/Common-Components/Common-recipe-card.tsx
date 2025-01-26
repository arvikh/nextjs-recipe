function RecipieCard({ recipe }) {
  const { title, imageUrl, ingredients, instructions } = recipe;
  return (
    <div className="w-48">
      <p>{title}</p>
      <img
        className="rounded-md"
        src={imageUrl}
        alt=""
        width={150}
        height={200}
      />
      <p>{ingredients}</p>
      <p>{instructions}</p>
    </div>
  );
}

export default RecipieCard;
