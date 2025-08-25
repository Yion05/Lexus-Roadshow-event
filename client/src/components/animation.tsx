import * as React from 'react';

const Animation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/90 animate-pulse">
      <div> 
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpsVPst5XTXecPPBr3t0gd2a8-DiKDVChY0g&s" 
          alt="Lexus Logo" 
          className="w-[300px] h-[300px] object-contain"
        />
      </div>
    </div>
  );
};

export default Animation;