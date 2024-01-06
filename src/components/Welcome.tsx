import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const redirectToSetting = () => {
    navigate("/setting");
  };

  // Use useEffect to trigger the redirection after 6s
  useEffect(() => {
    const timeoutId = setTimeout(redirectToSetting, 6000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center text-white text-5xl font-bold">
        <h1 className="anim">Welcome</h1>
        <h1 className="my-8 anim">To</h1>
        <h1 className="anim">
          Quiz <span className="text-purple-500">Room</span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
