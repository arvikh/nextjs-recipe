function RecipieCard({ recipe }) {
  const { title, imageUrl, ingredients, instructions } = recipe;
  return (
    <div>
      <p>{title}</p>
      <img src={imageUrl} alt="" width={250} height={250} />
      <p>{ingredients}</p>
      <p>{instructions}</p>
    </div>
  );
}

export default RecipieCard;
