import "./App.css";
import Comments from "./components/comments";
import Header from "./components/Header";
import Input from "./components/Input";

function App(props) {
  return (
    <div>
      <Header />
      <Input />
      <Comments />
    </div>
  );
}

export default App;
