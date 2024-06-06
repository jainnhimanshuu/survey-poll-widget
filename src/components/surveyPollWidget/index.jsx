import React, { useState, useEffect } from "react";

const SurveyPollWidget = ({ question }) => {
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState(
    question.options.map((option) => ({ id: option.id, votes: option.votes }))
  );

  useEffect(() => {
    const storedVotes = localStorage.getItem("votes");
    if (storedVotes) {
      const parsedVotes = JSON.parse(storedVotes);
      const questionVotes = parsedVotes[question.id];
      if (questionVotes) {
        setVotes(questionVotes);
        const storedOption = questionVotes.find((vote) => vote.selected);
        if (storedOption) {
          setSelectedOption(storedOption.id);
          setIsVoteSubmitted(true);
        }
      }
    }
  }, [question.id]);

  const handleOptionClick = (optionId) => {
    if (isVoteSubmitted) return;

    const updatedVotes = votes.map((option) =>
      option.id === optionId ? { ...option, votes: option.votes + 1 } : option
    );

    const newVotes = {
      ...JSON.parse(localStorage.getItem("votes") || "{}"),
      [question.id]: updatedVotes,
    };

    localStorage.setItem("votes", JSON.stringify(newVotes));
    setVotes(updatedVotes);
    setSelectedOption(optionId);
    setIsVoteSubmitted(true);
  };

  const votesCount = (optionId) => {
    const count = votes.find((v) => v.id === optionId)?.votes;

    return `${count} Votes`;
  };

  /**
   * @name renderOptions
   * @description To render the list of options
   * @returns JSX element with options
   */
  const renderOptions = (options) => (
    <ul>
      {options.map((option) => (
        <li
          className={`font-normal border-slate-100 border-2 rounded-full mb-4 py-2 px-4 text-center transition-all ease-in ${
            selectedOption === option.id
              ? "bg-slate-100 text-slate-800"
              : "text-zinc-100"
          } ${
            isVoteSubmitted
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-slate-100 hover:text-slate-800"
          }`}
          key={option.id}
          onClick={() => handleOptionClick(option.id)}
        >
          {isVoteSubmitted
            ? `${option.text} (${votesCount(option.id)})`
            : option.text}
        </li>
      ))}
    </ul>
  );

  /**
   * @name renderQuestions
   * @description To render the question Card with options
   * @returns JSX element with questions and options
   */
  const renderQuestions = () => (
    <div className="bg-zinc-700 p-4 md:p-8 drop-shadow-md">
      <p className="font-bold md:font-semibold text-md md:text-xl text-center mb-4 md:mb-8 text-zinc-100">
        {question.title}
      </p>
      {renderOptions(question.options)}
    </div>
  );

  return renderQuestions();
};

const MemoizedSurveyPollWidget = React.memo(SurveyPollWidget);
MemoizedSurveyPollWidget.displayName = "SurveyPollWidget";

export default MemoizedSurveyPollWidget;
