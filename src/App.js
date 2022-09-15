import Integers from "./components/Integers";
import Strings from "./components/Strings";
import UUIDs from "./components/UUIDs";

function App() {
  const apiKey = '6bbe6f10-6d96-4f98-9649-b51cc59f56d6';

  return (
    <div className="container">
      <Integers apiKey={apiKey} />
      <hr/>
      <Strings apiKey={apiKey}  />
      <hr/>
      <UUIDs apiKey={apiKey} />
    </div>
  );
}

export default App;
