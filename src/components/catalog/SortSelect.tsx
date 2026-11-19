import "./SortSelect.css";

interface SortSelectProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

export function SortSelect({ sortOption, onSortChange }: SortSelectProps) {
  return (
    <select
      className="sort-select"
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="relevance">Pertinence</option>
      <option value="price-asc">Prix croissant</option>
      <option value="price-desc">Prix décroissant</option>
      <option value="name-asc">A à Z</option>
      <option value="name-desc">Z à A</option>
    </select>
  );
}