import React from 'react';

export const TailwindTest: React.FC = () => {
  return (
    <div className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
      <h2 className="text-xl font-bold mb-2">Tailwind CSS Test</h2>
      <p className="text-sm">
        If you can see this styled with blue background, white text, rounded corners, and a shadow, then Tailwind CSS is
        working correctly!
      </p>
    </div>
  );
};

export default TailwindTest;
