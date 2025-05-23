import React, { useState, useEffect } from "react";

const decodeAndStripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const ProductCard = ({ product }) => {
  const rawTitle = product.title?.rendered || "No Title Available";
  const rawDescription =
    product.content?.rendered || "No description available.";
  const decodedTitle = decodeAndStripHtml(rawTitle);
  const decodedDescription = decodeAndStripHtml(rawDescription);

  const shortDescription =
    decodedDescription.length > 100
      ? decodedDescription.substring(0, 100) + "..."
      : decodedDescription;

  const size = product.acf?.product_size || "Size not specified";
  const image = product.featured_media || "default_image_url.jpg";
  const categories = product.product_category || [];
  const subcategories = product.subcategory || [];

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative flex flex-col">
      <img
        alt={decodedTitle}
        className="rounded-lg mb-4"
        height="300"
        src={image}
        width="400"
      />
      <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {categories.join(", ")}
      </span>
      <span className="absolute top-10 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
        {subcategories.join(", ")}
      </span>
      <h3 className="text-green-900 font-semibold text-lg mb-1">
        {decodedTitle}
      </h3>
      <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
        <i className="fas fa-ruler-combined text-gray-400"></i> {size}
      </p>
      <p className="text-gray-700 text-sm mb-4 flex-grow">{shortDescription}</p>
      <div className="flex justify-between items-center">
        <a
          href={product.link}
          className="bg-green-900 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-green-800 transition"
        >
          View Details
        </a>
        <button
          aria-label={`Add ${decodedTitle} to cart`}
          className="text-green-900 border border-green-900 rounded-full p-2 hover:bg-green-900 hover:text-white transition"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </article>
  );
};

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedCompartments, setSelectedCompartments] = useState("");
  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://cms.vegnar.com/wp-json/wp/v2/products"
      );
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProductType([...selectedProductType, value]);
    } else {
      setSelectedProductType(
        selectedProductType.filter((type) => type !== value)
      );
    }
  };

  const handleCapacityChange = (e) => {
    setSelectedCapacity(e.target.value);
  };

  const handleCompartmentsChange = (e) => {
    setSelectedCompartments(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedProductType([]);
    setSelectedCapacity("");
    setSelectedCompartments("");
  };

  const filteredProducts = products.filter((product) => {
    if (
      selectedProductType.length > 0 &&
      !selectedProductType.some((type) =>
        product.product_category.includes(type)
      )
    ) {
      return false;
    }
    if (selectedCapacity && product.acf?.product_size !== selectedCapacity) {
      return false;
    }
    if (selectedCompartments && product.compartments !== selectedCompartments) {
      return false;
    }
    return true;
  });

  const sortedProducts = filteredProducts; // You can implement sorting logic here

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white text-gray-900 font-sans bg-[#F0F9F4]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 ">
          <aside className="w-full lg:w-72 bg-white border border-gray-200 rounded-lg p-6 shadow-sm ">
            <h2 className="text-green-900 font-semibold text-lg mb-6">
              Filter Products
            </h2>
            <form>
              <fieldset className="mb-6">
                <legend className="text-green-900 font-semibold mb-3 block">
                  Product Type
                </legend>
                <div className="flex flex-col space-y-2 text-gray-700 font-normal text-sm">
                  {[
                    "Round Plates",
                    "Compartment Plates",
                    "Meal Trays",
                    "Bowls",
                    "Antileak Containers",
                    "Lids",
                    "Clamshells",
                    "Sipper Lids",
                  ].map((type) => (
                    <label
                      className="inline-flex items-center cursor-pointer"
                      key={type}
                    >
                      <input
                        className="form-checkbox text-green-900"
                        type="checkbox"
                        value={type}
                        checked={selectedProductType.includes(type)}
                        onChange={handleProductTypeChange}
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-400 transition"
              >
                Clear Filters
              </button>
            </form>
          </aside>
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-green-900 font-semibold text-lg">Products</h2>
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="border border-gray-300 rounded p-2"
              >
                {[
                  "Popularity",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Newest",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-green-900 text-white font-semibold py-2 px-4 rounded hover:bg-green-800 transition"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array(Math.ceil(sortedProducts.length / productsPerPage))
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    className={`mx-2 ${
                      currentPage === index + 1
                        ? "bg-green-900 text-white"
                        : "text-green-900"
                    } font-semibold py-2 px-4 rounded hover:bg-green-800 transition`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              <button
                className="bg-green-900 text-white font-semibold py-2 px-4 rounded hover:bg-green-800 transition"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(sortedProducts.length / productsPerPage)
                }
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
