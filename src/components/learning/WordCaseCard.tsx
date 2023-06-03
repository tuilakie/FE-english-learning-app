import { Card, Divider, Typography } from "antd";
import TextToSpeech from "./TextToSpeech";
import { useAppSelector } from "../../redux/hook";

const WordCaseCard = () => {
  const { words } = useAppSelector((state) => state.caseStudySlice);
  const { word, meaning, ipa } = words[0];
  return (
    <Card
      bordered={false}
      style={{
        boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label style={{ fontSize: 16 }}>Word</label>
        <Typography.Title level={2}>{word}</Typography.Title>
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label style={{ fontSize: 16 }}>Meaning</label>
        <Typography.Title level={2}>{meaning}</Typography.Title>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <label style={{ fontSize: 16 }}>IPA</label>
        <Typography.Text keyboard strong style={{ fontSize: 27 }}>
          {ipa}
        </Typography.Text>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <label style={{ fontSize: 16 }}>Audio</label>

        <TextToSpeech text={word} />
      </div>
    </Card>
  );
};

export default WordCaseCard;
