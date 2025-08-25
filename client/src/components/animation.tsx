import * as React from 'react';

const Animation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black animate-pulse scale-120">
      <div> 
        <img 
          src="https://www.pngall.com/wp-content/uploads/15/Lexus-Logo-PNG-File.png" 
          alt="Lexus Logo" 
          className="w-[300px] h-[300px] object-contain"
        />
      </div>
    </div>
  );
};


export default Animation;
















