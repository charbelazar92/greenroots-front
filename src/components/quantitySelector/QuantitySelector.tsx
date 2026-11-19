import './QuantitySelector.css';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  label?: string;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  label = 'Quantité',
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={`Diminuer : ${label}`}
        disabled={quantity <= min}
        onClick={() => onQuantityChange(quantity - 1)}
      >
        −
      </button>

      <span aria-live="polite">{quantity}</span>

      <button
        type="button"
        aria-label={`Augmenter : ${label}`}
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}