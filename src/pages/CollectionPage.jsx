import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FilterSidebar from '../components/products/FilterSidebar';
import SortOptions from '../components/products/SortOptions';
import ProductGrid from '../components/products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const sidebarRef = useRef(null)

const {products, loading, error} = useSelector((state) => state.products);
const queryParams = Object.fromEntries([...searchParams]);


useEffect(() => {
  dispatch(fetchProductsByFilters({collection, ...queryParams}));
}, [dispatch, collection, searchParams]);

const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
}

const handleClickOutside = (event) => {
    // Close sidebar if click outside
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
}

useEffect(() => {
    // Add Event Listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // clean event listener on unmount
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);    
    }
}, [])



  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter button */}
      <button
      onClick={toggleSidebar}
       className='lg:hidden border border-gray-300 p-2 flex justify-center items-center'>
    <FaFilter className='mr-2' />
      </button>

      {/* Filter Sidebar */}
      <div ref={sidebarRef}
       className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:w-1/4}`}
      >
        <FilterSidebar />
      </div>

      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collection</h2>

        {/* Sort Option */}
        <SortOptions />

        {/* Products Grid*/}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default CollectionPage