import React, { useState } from "react";
import SurveyPollWidget from "./components/surveyPollWidget";
import { questions } from "./constants/questions";
function App({ embedPage }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

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

      {!embedPage && (
        <div className="flex items-center justify-center mt-4">
          <button
            className="py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 transition-all font-bold text-white"
            onClick={() => {
              handleModal();
            }}
          >
            Embed
          </button>
        </div>
      )}

      {!embedPage && modalOpen && (
        <div className="absolute top-0 left-0 backdrop-blur-sm bg-white/50 w-full h-full p-4">
          <div
            className="relative text-2xl font-bold cursor-pointer float-right mb-8"
            onClick={() => {
              closeModal();
            }}
          >
            &times;
          </div>

          <div className="mt-16 container mx-auto">
            <div className="mb-4">
              <p className="mb-4 font-bold">
                Copy and paste below script above ending {"</body>"} tag
              </p>
              <input
                type="text"
                class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={`<script src="https://survey-poll-widget.vercel.app/embed.bundle.js"></script><script>new SurveyPollWidgetEmbed("#widget-container");</script>`}
                disabled
                readonly
              />

              <p className="my-4 font-bold">
                Replace #widget-container with your element.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
