import { Main } from "./style";
import CanvasBox from "../CanvasBox";
import SelectorColorList from "../SelectorColorList";
import ToolList from "../ToolList";
import Menus from "../Menus";
import StatusBar from "../StatusBar";

function App() {
  return (
    <div className="jspaint">
      <div className="vertical">
        <Menus></Menus>
        <Main>
          <ToolList></ToolList>
          <CanvasBox></CanvasBox>
        </Main>
        <SelectorColorList></SelectorColorList>
        <StatusBar></StatusBar>
      </div>
    </div>
  );
}

export default App;
