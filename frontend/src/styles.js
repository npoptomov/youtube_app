// styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

export const Title = styled.h2`
  color: #3f51b5;
`;

export const Stat = styled.p`
  font-size: 1.2em;
  margin: 0.2em 0;
`;

export const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  width: 100%;
  margin-bottom: 20px; 
  padding-top: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;  
  gap: 10px;
`;

export const LogoutButton = styled.button`
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ChannelInput = styled.input`
  width: 200px;
  height: 30px;
  // Removed the margin-bottom as it's now on the ControlContainer
`;

export const FetchButton = styled.button`
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: flex-start;
`;
export const CommentBlock = styled.div`
  background: #f5f5f5;
  padding: 1em;
  margin-bottom: 1em;
`;

export const Author = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

export const Text = styled.p`
  margin: 0;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    width: 200px;
`;

export const LoginButton = styled.button`
    margin: 20px 0;
    padding: 10px 20px;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export const ErrorMsg = styled.p`
    color: red;
`;



