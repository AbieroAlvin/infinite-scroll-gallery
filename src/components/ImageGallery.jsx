import axios from "axios";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SearchBar from "./SearchBar";
import debounce from "lodash.debounce";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  //   const observerRef = useRef(null);

  // Fetch images from Unsplash API
  const fetchImages = async (query) => {
    setIsLoading(true);
    // const apiKey = "REJmf-bcSLNwFt-Yn3OiVJPiIFb9IB1TPtt_JsbJyFY";
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const endpoint = query
      ? `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${query}&client_id=${apiKey}`
      : `https://api.unsplash.com/photos/random?count=40&client_id=${apiKey}`;
    // const apiURL = `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${searchQuery}&client_id=${apiKey}`;

    const response = await axios.get(endpoint);
    const data = response.data;
    const newImages = query ? data.results : data;
    setImages((prevImages) => [...prevImages, ...newImages]);
    setIsLoading(false);
  };

  // // Intersection Observer setup
  //    useEffect(() => {
  //      const observer = new IntersectionObserver(
  //        (entries) => {
  //          entries.forEach((entry) => {
  //            if (entry.isIntersecting) {
  //              setPage((prevPage) => prevPage + 1);
  //            }
  //          });
  //        },
  //        { rootMargin: "0px 0px 200px 0px" }
  //      );

  //      if (observerRef.current) {
  //        observer.observe(observerRef.current);
  //      }

  //      return () => {
  //        if (observerRef.current) {
  //          observer.unobserve(observerRef.current);
  //        }
  //      };
  //    }, []);

  const { ref, inView } = useInView({
    rootMargin: "0px 0px 200px 0px",
  });

  // Fetch initial random images
  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch more images on scroll or search query change
  useEffect(() => {
    if (inView || searchQuery) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, searchQuery]);

  //   // Fetch initial images
  //   useEffect(() => {
  //     if (searchQuery) {
  //       setImages([]);
  //       fetchImages();
  //     }
  //   }, [page, searchQuery]);

  //   // Fetch more images on scroll
  //   useEffect(() => {
  //     if (inView) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   }, [inView]);

  // Debounce search input
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    fetchImages(query);
  }, 300);

  return (
    <div className="container mx-auto px-4 w-full h-full flex flex-col items-center justify-center py-8">
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.urls?.regular || image.urls.regular}
              alt={image.alt_description}
              className="w-full h-auto object-cover lazy"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {isLoading && <div className="text-center mt-4">Loading...</div>}
      <div ref={ref} />
    </div>
  );
};

export default ImageGallery;
