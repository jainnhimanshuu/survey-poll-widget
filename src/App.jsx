import React from "react";
import SurveyPollWidget from "./components/surveyPollWidget";
import { questions } from "./constants/questions";
function App() {
  return (
    <>
      <h2 className="font-bold text-center py-4 text-xl md:text-3xl text-zinc-600">
        Survey Poll Widget
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-2">
        {questions &&
          questions.length &&
          questions.map((question, index) => {
            return <SurveyPollWidget key={index} question={question} />;
          })}
      </div>
    </>
  );
}

export default App;
