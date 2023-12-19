import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ExperienceLevelFilterProps {
  onLevelChange: (value: string) => void;
}

const ExperienceLevelFilter: React.FC<ExperienceLevelFilterProps> = ({ onLevelChange }) => {
	const [level, setLevel] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
    onLevelChange(event.target.value);
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <FormControl
				variant="standard"
				sx={{ 
					width: '100%'
				}}
			>
        <Select
          id="experience-level-select"
          value={level}
          onChange={handleChange}
					disableUnderline
					displayEmpty
					renderValue={(selected) => {
						if (selected === '') {
							return <span style={{ color: 'gray', fontStyle: 'normal' }}>Experience Level</span>;
						}
						switch (selected) {
							case 'entry':
								return 'Entry';
							case 'junior':
								return 'Junior';
							case 'mid':
								return 'Mid';
							case 'senior':
								return 'Senior';
							case 'lead':
								return 'Lead';
							case 'principal':
								return 'Principal';
							case 'staff':
								return 'Staff';
							case 'manager':
								return 'Manager';
							case 'director':
								return 'Director';
							case 'vp':
								return 'VP';
							default:
								return selected;
						}
					}}
					sx={{ 
						color: 'white',
						'& .MuiSelect-select': {
							padding: '4px 8px',
						}
					}}
        >
          <MenuItem value="">Any</MenuItem>
					<MenuItem value="entry">Entry</MenuItem>
					<MenuItem value="junior">Junior</MenuItem>
					<MenuItem value="mid">Mid</MenuItem>
					<MenuItem value="senior">Senior</MenuItem>
					<MenuItem value="lead">Lead</MenuItem>
					<MenuItem value="principal">Principal</MenuItem>
					<MenuItem value="staff">Staff</MenuItem>
					<MenuItem value="manager">Manager</MenuItem>
					<MenuItem value="director">Director</MenuItem>
					<MenuItem value="vp">VP</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ExperienceLevelFilter;
