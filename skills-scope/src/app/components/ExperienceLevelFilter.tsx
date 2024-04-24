import { Select } from '@mantine/core';

interface ExperienceLevelFilterProps {
	level: string;
  onLevelChange: (value: string | null) => void;
}

const ExperienceLevelFilter: React.FC<ExperienceLevelFilterProps> = ({ level, onLevelChange }) => {
  const experienceLevels = [
    { value: '', label: 'Any Level' },
    { value: 'entry', label: 'Entry' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'principal', label: 'Principal' },
    { value: 'staff', label: 'Staff' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
    { value: 'vp', label: 'VP' }
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
        data={experienceLevels}
      />
    </div>
  );
};

export default ExperienceLevelFilter;
