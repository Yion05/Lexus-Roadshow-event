import * as React from 'react';

const Animation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black animate-pulse scale-120">
      <div> 
        <img 
          src="https://github.com/Yion05/Lexus-Roadshow-event/blob/359a24981fd7e77de2cde71f43e802a8d83ebde0/client/src/components/Lexus_Logo.png" 
          alt="Lexus Logo" 
          className="w-[300px] h-[300px] object-contain"
        />
      </div>
    </div>
  );
};


export default Animation;





