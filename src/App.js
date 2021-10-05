import "./App.css";
import Navigation from "./componentts/Navigation/Navigation";
import Logo from "./componentts/Logo/Logo";
import ImageLinkForm from "./componentts/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./componentts/FaceRecognition/FaceRecognition";
import { useState } from "react";
import Clarifai from "clarifai";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const raw = JSON.stringify({
    user_app_id: {
      user_id: "3kkmywyhwp34",
      app_id: "6f6424475f2540e2a44acaa8699d7494",
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key a70abbee0f654726a0a051c6da860d2e",
    },
    body: raw,
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const onSubmit = () => {
    setImageUrl(input);

    fetch(
      "https://api.clarifai.com/v2/models/" +
        Clarifai.FACE_DETECT_MODEL +
        "/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        setBox(calculateFaceLocation(JSON.parse(result, null, 2)))
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
};

export default App;
