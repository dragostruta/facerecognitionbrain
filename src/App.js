import "./App.css";
import Navigation from "./componentts/Navigation/Navigation";
import Logo from "./componentts/Logo/Logo";
import ImageLinkForm from "./componentts/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./componentts/FaceRecognition/FaceRecognition";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
