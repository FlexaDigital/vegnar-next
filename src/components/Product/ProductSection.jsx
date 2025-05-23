import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined } from "@fortawesome/free-solid-svg-icons";

const decodeAndStripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const ProductCard = ({ product, allCategories, disableViewProduct }) => {
  const [categoryName, setCategoryName] = useState(null);
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

  const image =
    product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "default_image_url.jpg";

  const generateProductUrl = (product) => {
    if (
      !product ||
      !product.product_category ||
      !allCategories ||
      allCategories.length === 0
    ) {
      return `/products/uncategorized/${product.slug}`;
    }

    const categoryIds = product.product_category;
    const subCategory = allCategories.find((cat) =>
      categoryIds.includes(cat.id)
    );

    if (!subCategory) return `/products/uncategorized/${product.slug}`;

    // Find the parent category
    const parentCategory = allCategories.find(
      (cat) => cat.id === subCategory.parent
    );

    if (parentCategory) {
      return `/products/${parentCategory.slug}/${product.slug}`;
    } else {
      // Use the category slug itself as the 'parent' if no parent
      return `/products/${subCategory.slug}/${product.slug}`;
    }
  };

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (product.product_category && product.product_category.length > 0) {
        try {
          const categoryId = product.product_category[0]; // Fetch the name of the first category
          const response = await fetch(
            `https://cms.vegnar.com/wp-json/wp/v2/product_category/${categoryId}`
          );
          if (response.ok) {
            const categoryData = await response.json();
            setCategoryName(categoryData.name);
          } else {
            console.error(
              "Error fetching category name:",
              response.status,
              response.statusText
            );
            setCategoryName("Category Unavailable");
          }
        } catch (error) {
          console.error("Error fetching category name:", error);
          setCategoryName("Category Unavailable");
        }
      } else {
        setCategoryName("No Category");
      }
    };

    fetchCategoryName();
  }, [product.product_category]);

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative flex flex-col">
      <img
        alt={decodedTitle}
        className="rounded-lg mb-4 object-cover"
        height="300"
        src={image}
        width="400"
      />
      {categoryName && (
        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {categoryName}
        </span>
      )}
      <h3 className="text-green-900 font-semibold text-lg mb-1">
        {decodedTitle}
      </h3>
      <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
        <FontAwesomeIcon icon={faRulerCombined} className="text-gray-400" />{" "}
        {size}
      </p>
      <p className="text-gray-700 text-sm mb-4 flex-grow">{shortDescription}</p>
      <div className="flex justify-between items-center"></div>
      <div className="flex justify-between items-center">
        {!disableViewProduct && (
          <button className="bg-green-900 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-green-800 transition">
            <Link to={generateProductUrl(product)} className="bg-green-900 ...">
              View Product
            </Link>
          </button>
        )}
      </div>
    </article>
  );
};

const ProductSection = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const disableFiltersAndSorting = category === "bio-bags";

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const categoryResponse = await fetch(
          "https://cms.vegnar.com/wp-json/wp/v2/product_category"
        );
        const categoriesData = await categoryResponse.json();

        const productResponse = await fetch(
          "https://cms.vegnar.com/wp-json/wp/v2/products?per_page=100&_embed"
        );
        const productsData = await productResponse.json();

        setCategories(categoriesData);

        // Find the parent category by slug
        const parentCategory = categoriesData.find(
          (cat) => cat.slug === category
        );

        if (!parentCategory) {
          console.error("Parent category not found");
          return;
        }

        // Find subcategories of the parent category
        const subcategoryOptions = categoriesData.filter(
          (cat) => cat.parent === parentCategory.id
        );
        setSubcategories(subcategoryOptions);

        const subcategoryIds = subcategoryOptions.map((cat) => cat.id);
        const categoryIds = [parentCategory.id, ...subcategoryIds];

        const productsWithCategory = productsData.map((product) => {
          const categoryNames = product.product_category.map((catId) => {
            const cat = categoriesData.find((c) => c.id === catId);
            return cat ? cat.name : "Unknown";
          });
          return {
            ...product,
            product_category_names: categoryNames,
          };
        });

        const productsInCategory = productsWithCategory.filter((product) => {
          return product.product_category.some((catId) =>
            categoryIds.includes(catId)
          );
        });
        setProducts(productsInCategory);
      } catch (error) {
        console.error("Error fetching categories and products:", error);
      }
    };

    fetchCategoryAndProducts();
  }, [category]);

  useEffect(() => {
    // console.log("All Categories:", allCategories); // Debugging
  }, [allCategories]);

  const handleProductTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedProductType((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSelectedProductType([]);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedProductType.length > 0) {
      return selectedProductType.some((typeName) =>
        product.product_category?.includes(
          subcategories.find((sub) => sub.name === typeName)?.id
        )
      );
    }
    return true;
  });

  const sortedProducts = filteredProducts; // You can add sorting logic if needed

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conditionally render the sidebar */}
          {!disableFiltersAndSorting && (
            <aside className="w-full lg:w-72 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-green-900 font-semibold text-lg mb-6">
                Filter Products
              </h2>
              <form>
                <fieldset className="mb-6">
                  <legend className="text-green-900 font-semibold mb-3 block">
                    Product Type
                  </legend>
                  <div className="flex flex-col space-y-2 text-gray-700 font-normal text-sm">
                    {subcategories.map((sub) => (
                      <label
                        key={sub.id}
                        className="inline-flex items-center cursor-pointer"
                      >
                        <input
                          className="form-checkbox text-green-900"
                          type="checkbox"
                          value={sub.name}
                          checked={selectedProductType.includes(sub.name)}
                          onChange={handleProductTypeChange}
                        />
                        <span className="ml-2">{sub.name}</span>
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
          )}

          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-green-900 font-semibold text-lg capitalize">
                {category?.replace(/-/g, " ") || "Products"}
              </h2>
              {!disableFiltersAndSorting && (
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
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  allCategories={allCategories}
                  disableViewProduct={disableFiltersAndSorting}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6 flex-wrap gap-2">
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
                    className={`py-2 px-4 rounded font-semibold ${
                      currentPage === index + 1
                        ? "bg-green-900 text-white"
                        : "text-green-900 border border-green-900"
                    }`}
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
