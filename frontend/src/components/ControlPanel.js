// ControlPanel.js
import { LogoutButton, ChannelInput, FetchButton, ControlContainer, InputGroup } from '../styles';

const ControlPanel = ({ handleInputChange, handleFetchData, handleLogout }) => {
  return (
    <ControlContainer>
      <InputGroup>
        <ChannelInput onChange={handleInputChange} placeholder="Enter Channel ID" />
        <FetchButton onClick={handleFetchData}>Fetch Data</FetchButton>
      </InputGroup>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </ControlContainer>
  );
};

export default ControlPanel;
