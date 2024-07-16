type NavigationButtonsProps = {
    handleBackClick: () => void;
    handleNextClick: () => void;
    progress: number;
  };

export default function NavigationButtons({ handleBackClick, handleNextClick, progress }: NavigationButtonsProps) {
    return (
      <div className="flex items-center">
        <button
          className={`mx-2 py-2 px-4 bg-blue-500 text-white rounded ${progress > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={handleBackClick}
          disabled={progress <= 0}
        >
          &#8592; {/* Left arrow symbol */}
        </button>
        <button
          className={`mx-2 py-2 px-4 bg-blue-500 text-white rounded ${progress < 100 ? 'bg-blue-500' : 'bg-gray-500'}`}
          onClick={handleNextClick}
          disabled={progress >= 100}
        >
          &#8594; {/* Right arrow symbol */}
        </button>
        <p>{progress}% completed</p>
      </div>
    );
  }