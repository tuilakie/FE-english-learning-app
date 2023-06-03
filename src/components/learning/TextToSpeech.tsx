import { RxSpeakerLoud } from "react-icons/rx";
import { handleSpeak } from "./handleSpeak";

type Props = {
  text: string;
};

function TextToSpeech({ text }: Props) {
  return (
    <RxSpeakerLoud
      style={{ cursor: "pointer", fontSize: "2rem" }}
      onClick={() => {
        handleSpeak(text);
      }}
    >
      Speak
    </RxSpeakerLoud>
  );
}

export default TextToSpeech;
