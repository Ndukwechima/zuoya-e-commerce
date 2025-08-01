import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();
const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
});

const [priceRange, setPriceRange] = useState([0, 100]);

const categories = ["Top Wear", "Bottom Wear"];

const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy" ];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece"];

const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];

const genders = ["Men", "Women"];

useEffect(() => {
  const params = Object.fromEntries([...searchParams]);
  const min = Number(params.minPrice) || 0;
  const max = Number(params.maxPrice) || 100;

  setFilters({
    category: params.category || "",
    gender: params.gender || "",
    color: params.color || "",
    size: params.size ? params.size.split(",") : [],
    material: params.material ? params.material.split(",") : [],
    brand: params.brand ? params.brand.split(",") : [],
    minPrice: min,
    maxPrice: max,
  });

  setPriceRange([min, max]);
}, [searchParams]);


const handleFilterChange = (e) => {
  const { name, value, checked, type } = e.target;
  const updatedFilters = { ...filters };

  if (type === "checkbox") {
    if (checked) {
      updatedFilters[name] = [...(updatedFilters[name] || []), value];
    } else {
      updatedFilters[name] = updatedFilters[name].filter(
        (item) => item !== value
      );
    }
  } else {
    updatedFilters[name] = value;
  }

  setFilters(updatedFilters);
  updateURLParams(updatedFilters);
};


const updateURLParams = (newFilters) => {
  const params = new URLSearchParams();
  Object.keys(newFilters).forEach((key) => {
    if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
      params.append(key, newFilters[key].join(","));
    } else if (newFilters[key]) {
      params.append(key, newFilters[key]);
    }
  });

  setSearchParams(params);
  navigate(`?${params.toString()}`); // ?category=Bottom+Wear&size=XS%2CS
}

// Price Range
const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const updatedFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(updatedFilters);
    updateURLParams(updatedFilters);
}

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className=" flex items-center mb-1">
            <input
              onChange={handleFilterChange}
              type="radio"
              checked={filters.category === category}
              name="category"
              value={category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />

            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className=" flex items-center mb-1">
            <input
              type="radio"
              checked={filters.gender === gender}
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => {
                const updatedFilters = { ...filters, color };
                setFilters(updatedFilters);
                updateURLParams(updatedFilters);
              }}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              name="size"
              value={size}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border
             border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              name="material"
              value={material}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border
             border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-900 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              name="brand"
              value={brand}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border
             border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none 
         cursor-point"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar