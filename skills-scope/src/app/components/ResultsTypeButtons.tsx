import { Box, Tabs } from "@mantine/core";
import styles from '../globals.module.css';

interface ResultsTypeButtonsProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
}

const ResultsTypeButtons: React.FC<ResultsTypeButtonsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Box
      style={{ 
        marginTop: '4em',
        marginBottom: '2em'
      }}
    >
      <Tabs color="#4b86b4" value={activeTab} onChange={setActiveTab}>
        <Tabs.List grow>
          <Tabs.Tab value="skills" className={styles.tab}>Skills</Tabs.Tab>
          <Tabs.Tab value="education" className={styles.tab}>Education</Tabs.Tab>
          <Tabs.Tab value="experience" className={styles.tab}>Experience</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
};

export default ResultsTypeButtons;
