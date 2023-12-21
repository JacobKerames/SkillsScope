import { Box, Tabs } from "@mantine/core";

interface ResultsTypeButtonsProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
}

const ResultsTypeButtons: React.FC<ResultsTypeButtonsProps> = ({ activeTab, setActiveTab }) => {

  const tabStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontSize: '1em',
    fontWeight: 'bold',
    fontColor: '#191D32',
  };

  return (
    <Box
      style={{ 
        marginTop: '4em',
        marginBottom: '2em'
      }}
    >
      <Tabs color="#191D32" value={activeTab} onChange={setActiveTab}>
        <Tabs.List grow>
          <Tabs.Tab value="skills" style={tabStyle}>Skills</Tabs.Tab>
          <Tabs.Tab value="education" style={tabStyle}>Education</Tabs.Tab>
          <Tabs.Tab value="experience" style={tabStyle}>Experience</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
};

export default ResultsTypeButtons;
