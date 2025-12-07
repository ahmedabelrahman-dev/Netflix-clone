import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import YouTube from 'react-youtube';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import { formatReleaseDate } from '../utils/dateFunction';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  const sliderRef = useRef(null);

  // Fetch trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        const ytVideos = res.data.trailers.filter((v) => v.site === 'YouTube');
        setTrailers(ytVideos);
      } catch (error) {
        if (error.message.includes('404')) setTrailers([]);
      }
    };
    getTrailers();
  }, [contentType, id]);

  // Fetch similar content
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes('404')) setSimilarContent([]);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  // Fetch main content
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes('404')) setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  // Trailer navigation
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx((prev) => prev - 1);
  };

  const currentTrailer = trailers[currentTrailerIdx];
  const trailerVideoId = currentTrailer ? currentTrailer.key : null;

  // Slider scroll
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // YouTube player options
  const ytOpts = {
    width: '100%',
    height: '600',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {/* trailer navigation */}
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrev}
              disabled={currentTrailerIdx === 0}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                ${
                  currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              disabled={currentTrailerIdx === trailers.length - 1}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
                ${
                  currentTrailerIdx === trailers.length - 1
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* video player */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailerVideoId && (
            <YouTube
              videoId={trailerVideoId}
              opts={ytOpts}
              className="mx-auto overflow-hidden rounded-lg"
            />
          )}

          {!trailerVideoId && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{' '}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{' '}
              😥
            </h2>
          )}
        </div>

        {/* details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div>
            <h2 className="text-5xl font-bold">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{' '}
              |{' '}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>

            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>

          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* similar */}
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>

            <div
              ref={sliderRef}
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
            >
              {similarContent
                .filter((c) => c.poster_path) // remove items with no poster
                .map((c) => (
                  <Link
                    key={c.id}
                    to={`/watch/${c.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + c.poster_path}
                      className="w-full h-auto rounded-md"
                      alt=""
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {c.title || c.name}
                    </h4>
                  </Link>
                ))}

              <ChevronRight
                onClick={scrollRight}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                bg-red-600 text-white rounded-full"
              />
              <ChevronLeft
                onClick={scrollLeft}
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8
                opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
                bg-red-600 text-white rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
