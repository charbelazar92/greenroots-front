import "./SpeciesSelect.css";

interface SpeciesSelectProps {
  species: string[];
  selectedSpecies: string;
  onSpeciesChange: (value: string) => void;
}

export function SpeciesSelect({
  species,
  selectedSpecies,
  onSpeciesChange,
}: SpeciesSelectProps) {
  return (
    <select
      className="species-select"
      value={selectedSpecies}
      onChange={(e) => onSpeciesChange(e.target.value)}
    >
      <option value="">Toutes les espèces</option>
      {species.map((specie) => (
        <option key={specie} value={specie}>
          {specie}
        </option>
      ))}
    </select>
  );
}

