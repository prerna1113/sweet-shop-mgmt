function CardComponent({ image, name }) {
  return (
    <div style={{ border: "1px solid black", padding: 10 }}>
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <h3>{name}</h3>
    </div>
  );
}

export default CardComponent;
