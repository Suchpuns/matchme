import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from "react-router-dom";


const Header = (props: {eventName: string, index: string}) => {
  const navigate = useNavigate();

  const renderTabs = () => {
    switch (props.index) {
      case '0':
        return (
          <Tabs onChange={() => navigate(`/admin/${props.eventName}/preference`)} value={props.index} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font}/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font}/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font} disabled/>
          </Tabs>
        );
      case '1':
        return (
          <Tabs onChange={() => navigate(`/admin/${props.eventName}/complete`)} value={props.index} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font} disabled/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font}/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font}/>
          </Tabs>
        );
      case '2':
        return (
          <Tabs value={props.index} centered>
            <Tab label="1. Creating Event" value='0' sx={styles.font} disabled/>
            <Tab label="2. Sending Preferences" value='1' sx={styles.font} disabled/>
            <Tab label="3. Matching Complete" value='2' sx={styles.font}/>
          </Tabs>
        );
    }
  }

  return(
    <>
      <h1 className="text-3xl justify-self-center text-center text-amber-100">{props.eventName}</h1>
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