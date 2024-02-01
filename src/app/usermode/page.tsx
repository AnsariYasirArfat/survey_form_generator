import SurveyFormUsers from "@/components/UserSide/SurveyFormUsers";

const page = () => {
  return (
    <div className="h-[90vh] p-2">
      <SurveyFormUsers userMode={true} />
    </div>
  );
};

export default page;
