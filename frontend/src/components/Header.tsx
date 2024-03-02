import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const Header = () => {
  const [activeTabIndex, setActiveTabIndex] = useState('0');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabIndex(newValue);
  }

  const renderTabs = () => {
    switch (activeTabIndex) {
      case '0':
        console.log("hiiii from 0");
        return (
          <Tabs onChange={handleChange} value={activeTabIndex} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font}/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font}/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font} disabled/>
          </Tabs>
        );
      case '1':
        return (
          <Tabs onChange={handleChange} value={activeTabIndex} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font} disabled/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font}/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font}/>
          </Tabs>
        );
      case '2':
        return (
          <Tabs onChange={handleChange} value={activeTabIndex} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font} disabled/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font}/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font}/>
          </Tabs>
        );
    }
  }

  return(
    <>
      {renderTabs()}
    </>
  );
}

const styles = {
  font: {
    fontSize: '16px',
    margin: '0em 2em'
  }
}

export default Header;