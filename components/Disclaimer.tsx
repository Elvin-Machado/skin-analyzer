
import React from 'react';
import { WarningIcon } from './IconComponents';

export const Disclaimer: React.FC = () => {
  return (
    <div className="mt-12 p-5 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <WarningIcon />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold">Important Disclaimer</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              This tool provides AI-generated information for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
