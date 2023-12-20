import { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const menuProps: Partial<MenuProps> = {
  PaperProps: {
    sx: {
			color: '#E6E6E6',
      bgcolor: '#101010',
			border: '1px solid gray',
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: '#212121',
        },
      },
    },
  },
};

interface TimeFrameFilterProps {
	timeFrame: string;
  onTimeFrameChange: (value: string) => void;
}

const TimeFrameFilter: React.FC<TimeFrameFilterProps> = ({ timeFrame, onTimeFrameChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onTimeFrameChange(event.target.value);
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
          id="time-frame-select"
          value={timeFrame}
          onChange={handleChange}
					disableUnderline
					displayEmpty
					renderValue={(selected) => {
						if (selected === '') {
							return <span style={{ color: '#9CA3AF', fontStyle: 'normal' }}>Time Frame</span>;
						}
						switch (selected) {
							case 'pastMonth':
								return 'Past Month';
							case 'pastYear':
								return 'Past Year';
							case 'pastTwoYears':
								return 'Past Two Years';
							case 'pastFiveYears':
								return 'Past Five Years';
							default:
								return selected;
						}
					}}
					MenuProps={menuProps}
					sx={{
						color: '#E6E6E6',
						'& .MuiSelect-select': {
							padding: '4px 8px',
						}
					}}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value='pastMonth'>Past Month</MenuItem>
          <MenuItem value='pastYear'>Past Year</MenuItem>
          <MenuItem value='pastTwoYears'>Past Two Years</MenuItem>
					<MenuItem value='pastFiveYears'>Past Five Years</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TimeFrameFilter;
