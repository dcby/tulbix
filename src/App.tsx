import "./App.scss";
import { options } from "./data/x265";
import CliBoard from "./ui/cli/CliBoard";
import CliOptionWrapSet from "./ui/cli/CliOptionWrapSet";

function App() {
  return (
    <div className="App">
      <CliBoard />
      {/* <p>This is it!!!</p>
      <p>
        <input type="text" />
      </p>
      <p>
        <label className="input">
          <input type="radio" name="rad" />
          Option 1
        </label>
        <label className="input" style={{marginLeft: "10px"}}>
          <input type="radio" name="rad" />
          Option 2
        </label>
      </p>
      <p>
        <label className="input">
          <input type="checkbox" />
          Option 1
        </label>
        <label className="input" style={{marginLeft: "10px"}}>
          <input type="checkbox" />
          Option 2
        </label>
      </p>
      <CliOptionWrapSet cliOptions={options} /> */}
    </div>
  );
}

export default App;
