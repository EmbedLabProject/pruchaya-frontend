import React from 'react';
import { BeakerIcon } from "@heroicons/react/16/solid";

interface WaterMeterProps {
  humidity: number;
}

const WaterMeter: React.FC<WaterMeterProps> = ({ humidity }) => {
  return (
    <div className="flex items-center space-x-4">
      <BeakerIcon className="text-blue-800 text-2xl" />
      <div className="relative w-64 h-6 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-800"
          style={{ width: `${humidity}%` }}
        ></div>
      </div>
      <span className="text-blue-800 text-xl">{humidity}%</span>
    </div>
  );
};

export default WaterMeter;
