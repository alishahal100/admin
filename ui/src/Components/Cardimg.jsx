import React from 'react';

const Cardimg = () => {
  return (
    <div className="container mx-auto px-4 mt-16 mb-16"> {/* Container added here */}
      <div className="flex flex-col md:flex-row items-center bg-white p-4 md:p-8 gap-4 md:gap-8"> {/* Adjust padding and gap for mobile */}
      
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">FULLY RESPONSIVE.</h1> {/* Adjusted heading size for mobile */}
          <p className="text-gray-700 text-base md:text-lg"> {/* Adjusted text size for better readability */}
            Endurer is designed to make your website look & feel absolutely amazing regardless of the device type or the screen resolution it is being viewed on.
          </p>
        </div>

        <div className="flex-1 mb-4 md:mb-0"> {/* Added margin for spacing on mobile */}
          <img 
            src="/ban6.jpg" // Directly referencing the image from the public folder
            alt="Responsive design on various devices" 
            className="w-full object-cover" // Removed rounded-lg for square corners
          />
        </div>

        

        
      </div>

      <div className="flex flex-col md:flex-row items-center bg-white p-4 md:p-8 gap-4 md:gap-8"> {/* Adjust padding and gap for mobile */}
      

      <div className="flex-1 mb-4 md:mb-0"> {/* Added margin for spacing on mobile */}
        <img 
          src="/ban9.jpg" // Directly referencing the image from the public folder
          alt="Responsive design on various devices" 
          className="w-full object-cover" // Removed rounded-lg for square corners
        />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">FULLY RESPONSIVE.</h1> {/* Adjusted heading size for mobile */}
        <p className="text-gray-700 text-base md:text-lg"> {/* Adjusted text size for better readability */}
          Endurer is designed to make your website look & feel absolutely amazing regardless of the device type or the screen resolution it is being viewed on.
        </p>
      </div>

    

      

      
    </div>

  
    </div>
  );
};

export default Cardimg;
