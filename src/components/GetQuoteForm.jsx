import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// Replace with your actual EmailJS credentials
const YOUR_SERVICE_ID = "service_tkls90l";
const YOUR_TEMPLATE_ID = "template_w9d1c2q";
const YOUR_PUBLIC_KEY = "UagVn-lyzNZrSPlUN";

const GetQuoteFormPopup = ({ productTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    number: "",
    email: "",
    country: "",
    quantity: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', null

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setSubmissionStatus(null);
    setFormData({
      name: "",
      company: "",
      number: "",
      email: "",
      country: "",
      quantity: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("loading");

    const emailParams = {
      to_name: "Ashish Chauhan", // Your name or the recipient's name in the email
      to_email: "flexaservices360@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      number: formData.number,
      country: formData.country,
      quantity: formData.quantity,
      product_title: productTitle,
    };

    try {
      const response = await emailjs.send(
        service_tkls90l,
        template_w9d1c2q,
        emailParams,
        UagVn - lyzNZrSPlUN
      );
      console.log("SUCCESS!", response.status, response.text);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("FAILED...", error);
      setSubmissionStatus("error");
    }
  };

  const popupStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    width: "600px",
    maxWidth: "95%",
    maxHeight: "90%",
    overflowY: "auto",
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        className="w-full max-w-xl bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md py-3 flex items-center justify-center gap-2"
        type="button"
      >
        <i className="fas fa-envelope"></i>
        Get Quote
      </button>

      {isOpen && (
        <div>
          <div style={overlayStyles} onClick={togglePopup} />
          <div style={popupStyles}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get Quote for: {productTitle}
            </h2>
            {submissionStatus === "success" && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Your quote request has been submitted. We will get back to you
                  shortly.
                </span>
              </div>
            )}
            {submissionStatus === "error" && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">
                  {" "}
                  There was an error submitting your request. Please try again
                  later.
                </span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={
                submissionStatus === "loading"
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="number"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={submissionStatus === "loading"}
                >
                  {submissionStatus === "loading"
                    ? "Submitting..."
                    : "Get Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetQuoteFormPopup;
