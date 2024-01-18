import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner color="blue" className="h-16 w-16" />
    </div>
  );
};

export default Loading;
