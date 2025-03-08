const Card = ({ className, value, label }) => {
  return (
    <div className={`rounded-md p-5 py-8 ${className}`}>
      <h2 className="text-5xl font-bold">{value}</h2>
      <p className="mt-2 font-semibold">{label}</p>
    </div>
  );
};

export default Card;
