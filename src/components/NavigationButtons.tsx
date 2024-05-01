type NavigationButtonsProps = {
    handleBackClick: () => void;
    handleNextClick: () => void;
  };

export default function NavigationButtons({ handleBackClick, handleNextClick }: NavigationButtonsProps) {
    return (
      <div className="flex items-center">
        <button
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleBackClick}
        >
          &#8592; {/* Left arrow symbol */}
        </button>
        <button
          className="mx-2 py-2 px-4 bg-blue-500 text-white rounded"
          onClick={handleNextClick}
        >
          &#8594; {/* Right arrow symbol */}
        </button>
      </div>
    );
  }