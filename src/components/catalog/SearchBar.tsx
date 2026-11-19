import "./SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ searchTerm, onSearchChange, placeholder = "Rechercher un arbre par son nom ou son espèce ...", }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
       type="search"
                placeholder={placeholder}
                aria-label={placeholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
      />
      
    </div>
  );
}