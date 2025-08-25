const Modal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="text-2xl font-semibold">Client Details</h3>
          <button className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Full Name:</strong> Henry Singh</div>
            <div><strong>Contact:</strong> 019-6543210</div>
            <div><strong>Email:</strong> henry@example.com</div>
            <div><strong>Gender:</strong> Male</div>
            <div><strong>Age Range:</strong> 55-64</div>
            <div><strong>Monthly Income:</strong> RM5,001 - RM7,500</div>
            <div><strong>Sales Consultant:</strong> David Wong</div>
            <div><strong>Interested Models:</strong> RZ, ES</div>
            <div><strong>Test Drive?:</strong> No</div>
            <div><strong>License Expiry:</strong> 2026-08-05</div>
            <div>
              <strong>License File:</strong>
              <a href="#" className="text-indigo-600 hover:underline">example_license.png</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;