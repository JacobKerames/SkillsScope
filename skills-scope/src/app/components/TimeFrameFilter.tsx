import { Select } from '@mantine/core';

interface TimeFrameFilterProps {
	timeFrame: string;
  onTimeFrameChange: (value: string | null) => void;
}

const TimeFrameFilter: React.FC<TimeFrameFilterProps> = ({ timeFrame, onTimeFrameChange }) => {
	const timeFrameOptions = [
    { value: '', label: 'Any Time' },
    { value: 'pastMonth', label: 'Past Month' },
    { value: 'pastYear', label: 'Past Year' },
    { value: 'pastTwoYears', label: 'Past Two Years' },
    { value: 'pastFiveYears', label: 'Past Five Years' },
  ];

  const handleChange = (value: string | null) => {
    onTimeFrameChange(value); // Now handles null as well
  };

  return (
    <div className="flex items-center border-b border-teal-500 py-2">
      <Select
        id="time-frame-select"
        value={timeFrame}
        onChange={handleChange}
        placeholder="Time Frame"
        data={timeFrameOptions}
      />
    </div>
  );
};

export default TimeFrameFilter;
