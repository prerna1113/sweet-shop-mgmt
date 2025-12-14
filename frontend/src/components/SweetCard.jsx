function SweetCard({ sweet, onPurchase }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{sweet.name}</h5>
        <p className="card-text">
          Category: {sweet.category}<br />
          Price: ₹{sweet.price}<br />
          Stock: {sweet.quantity}
        </p>

        <button
          className="btn btn-primary"
          disabled={sweet.quantity === 0}
          onClick={() => onPurchase(sweet._id)}
        >
          {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>
      </div>
    </div>
  );
}

export default SweetCard;
