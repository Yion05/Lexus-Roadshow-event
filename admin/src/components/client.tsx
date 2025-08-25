import * as React from "react";
import type { CombinedFormData } from "../types/types";
import { convertDate, convertStringDate, downloadCSV, getPaginatedData } from "../data/data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Clients: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 10;
  const [currentData, setCurrentData] = React.useState<CombinedFormData[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [totalItems, setTotalItems] = React.useState<number>(0);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");

  const [viewDetail, SetViewDetail] = React.useState<boolean>(false);
  const [clientDetail, setClientDetail] = React.useState<CombinedFormData>();

  const handleViewDetails = (clients: CombinedFormData | undefined) => {
    SetViewDetail(!viewDetail);
    setClientDetail(clients);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentData([]);
      try {
        const response = await getPaginatedData(currentPage, pageSize);
        if (response?.totalCount === 0) {
          setError("No clients found.");
        } else {
          setCurrentData(response?.data as CombinedFormData[]);
          setTotalPages(response?.page as number);
          setTotalItems(response?.totalCount as number);
        }
      } catch (err) {
        setError("Failed to load client data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handleViewLicense = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const modalContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        handleViewDetails(clientDetail);
      }
    };

    if (viewDetail) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewDetail]);

  return (
    <div
      id="clients-view"
      className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-main"
    >
      <div className="mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Client Details
          </h2>

          <div className="flex justify-end space-x-2 mb-4">
            <button
              onClick={downloadCSV}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Download as CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test Drive
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    License Expiry
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Driving License
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submitted At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={13} className="text-center p-4 text-gray-500">
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.062 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={13}
                      className="text-center p-4 text-red-600 font-medium"
                    >
                      {error}
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center p-4 text-gray-500">
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  currentData.map((client, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.submission_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {client.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {client.contact_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {client.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {client.test_drive_preference ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {convertStringDate(client.license_expiry_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <button
                          onClick={() =>
                            handleViewLicense(client.driving_license)
                          }
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {convertDate(client.submitted_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(client)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {startItem} - {endItem}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">{totalItems}</span>{" "}
              clients
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isLoading}
                className={`flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                  currentPage === 1 || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaArrowLeft className="h-4 w-4 mr-2" /> Previous
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoading}
                className={`flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                  currentPage === totalPages || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next <FaArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Driving License
              </h3>
              <div className="mt-2">
                <img
                  src={modalImage}
                  alt="Driving License"
                  className="max-w-full h-auto cursor-zoom-in"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewDetail && clientDetail ? (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-60 overflow-y-auto h-full max-w-full flex justify-center items-center z-40 p-4">
          <div
            ref={modalContentRef}
            className="p-6 border rounded-xl shadow-2xl bg-white w-full max-w-7xl transform transition-all duration-300 animate-scaleIn"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Client Submission Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-md mb-6">
              <div className="flex flex-col gap-2">
                <p>
                  <strong className="font-semibold text-gray-900">
                    Submission ID:
                  </strong>{" "}
                  {clientDetail.submission_id}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Full Name:
                  </strong>{" "}
                  {clientDetail.full_name}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Contact Number:
                  </strong>{" "}
                  {clientDetail.contact_number}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Email Address:
                  </strong>{" "}
                  {clientDetail.email_address}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Gender:
                  </strong>{" "}
                  {clientDetail.gender}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Age Range:
                  </strong>{" "}
                  {clientDetail.age_range}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Monthly Income:
                  </strong>{" "}
                  RM {clientDetail.monthly_income}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <strong className="font-semibold text-gray-900">
                    Assigned Consultant:
                  </strong>{" "}
                  {clientDetail.assigned_sales_consultant}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Interested Car Model(s):
                  </strong>{" "}
                  {clientDetail.interested_car_model.join(", ")}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Test Drive Preference:
                  </strong>{" "}
                  {clientDetail.test_drive_preference ? "Yes" : "No"}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    License Expiry Date:
                  </strong>{" "}
                  {convertStringDate(clientDetail.license_expiry_date)}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Form Title:
                  </strong>{" "}
                  {clientDetail.form_title}
                </p>
                <p>
                  <strong className="font-semibold text-gray-900">
                    Submitted At:
                  </strong>{" "}
                  {convertDate(clientDetail.submitted_at)}
                </p>
              </div>
            </div>
            <div className="w-full h-auto max-w-sm">
              <img
                src={clientDetail.driving_license}
                alt="Driving License"
                className="w-full h-auto object-contain transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Clients;
