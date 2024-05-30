import { TypeAnimation } from 'react-type-animation'



export default function TypingAnima() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your Own AI",
        2000,
        "Bulit With OpenAI",
        1000,
        "Your Own Customized ChatGPT",
        1500,
      ]}
      speed={50}
      style={{ fontSize: "60px", color:"white", display: "inline-block", textShadow:"1px 1px 20px #000" }}
      repeat={Infinity}
    />
  );
}
