import { UserList } from "./components/UserList";
import styled from "styled-components";
import "antd/dist/antd.css";
import { BREAKPOINTS } from "./utils";

function App() {
  return (
    <StyledMain>
      <UserList />
    </StyledMain>
  );
}

const StyledMain = styled.div`
  margin: 0 auto;
  width: 50%;

  @media (max-width: ${BREAKPOINTS.TABLET}) {
    width: 70%;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE}) {
    width: 90%;
  }
`;

export default App;
