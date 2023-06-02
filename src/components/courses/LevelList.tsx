import { Row } from "antd";
import { useParams } from "react-router-dom";
import { useGetLevelsQuery } from "../../redux/api/levelApi";
import LevelCard from "./LevelCard";

const LevelList = () => {
  const { courseId } = useParams() as { courseId: string };
  const {
    data: levelsData,
    isLoading: levelsLoading,
    isFetching: levelsFetching,
  } = useGetLevelsQuery(courseId);

  if (levelsLoading || levelsFetching) return <div>Loading...</div>;
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {levelsData?.map((level) => (
          <LevelCard
            key={level.id}
            id={level.id}
            name={level.name}
            progress={level._count.learned}
            total={level._count.words}
          />
        ))}
      </Row>
    </>
  );
};

export default LevelList;
