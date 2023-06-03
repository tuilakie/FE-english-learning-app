export const handleSpeak = (text: string) => {
  if ("speechSynthesis" in window) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[5];
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis is not supported in your browser.");
  }
};
