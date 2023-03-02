import React, { useEffect, useState } from "react";
import { Loader, ForemField, Card } from "../components";

const Rendercard = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-xl uppercase text-[#6449ff]">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allpost, setAllPost] = useState([]);
  const [searchText, setSearchText] = useState("");


  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8090/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPost(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchPosts()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allpost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
  

  return (
    <section
      className="max-w-7xl mx-au
    "
    >
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] max-w-500 text-[16px]">
          Browse Through a Collection of visually Stunning images generated bt
          Images Ai
        </p>
      </div>
      <div className="mt-16">
        <ForemField 
           labelName="Search posts"
           type="text"
           name="text"
           placeholder="Search something..."
           value={searchText}
           handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] mb-3 text-xl">
                Showing Results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <Rendercard data={searchedResults} title="no search results found" />
              ) : (
                <Rendercard data={allpost} title="no post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
