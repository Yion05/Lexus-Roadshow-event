import * as React from 'react';

const Animation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black animate-pulse scale-120">
      <div> 
        <img 
          src="https://Lexus-Roadshow-event-site.vercel.app/Lexus_Logo" 
          alt="Lexus Logo" 
          className="w-[300px] h-[300px] object-contain"
        />
      </div>
    </div>
  );
};


export default Animation;


