import { FC } from "react";

const CardSkeleton: FC = () => {
  return (
    <div className="flex border border-custom-border w-full first:rounded-t-md last:rounded-b-md bg-[#030711] p-5 justify-between animate-pulse">
      <div className="flex">
        <div className="flex w-[400px] overflow-hidden">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="ml-4">
            <div className="w-24 h-4 bg-gray-700 mb-2 rounded"></div>
            <div className="w-16 h-3 bg-gray-700 rounded"></div>
          </div>
          <div className="bg-[#166534] w-8 h-4 px-2 rounded-3xl ml-6"></div>
        </div>
        <div className="ml-4">
          <div className="w-12 h-3 bg-gray-700 mb-2 rounded"></div>
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-24 h-8 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
