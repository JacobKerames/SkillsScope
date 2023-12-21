import { Select } from '@mantine/core';

interface ExperienceLevelFilterProps {
	level: string;
  onLevelChange: (value: string | null) => void;
}

const ExperienceLevelFilter: React.FC<ExperienceLevelFilterProps> = ({ level, onLevelChange }) => {
  const experienceLevels = [
    { value: 'entry', label: 'Entry' },
    { value: 'junior', label: 'Junior' },
    // ... add other levels
  ];

	const handleChange = (value: string | null) => {
    onLevelChange(value);
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2" style={{ minWidth: '200px' }}>
      <Select
        id="experience-level-select"
        value={level}
        onChange={handleChange}
        placeholder="Experience Level"
        data={[
          { value: '', label: 'Any' },
          ...experienceLevels
        ]}
      />
    </div>
  );
};

export default ExperienceLevelFilter;
