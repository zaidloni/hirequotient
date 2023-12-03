import { useState, useEffect } from "react";
import SearchIcon from "../assets/SearchIcon.svg";
const SearchBox = ({ setFilteredUserData, userData }) => {
  // to store the user searched text
  const [searchedText, setSearchedText] = useState("");

  // function to handle the search click and filter the data
  const handleSearch = () => {
    const filterData = userData.filter((user) => {
      return Object.values(user)
        .join("")
        .toLowerCase()
        .includes(searchedText?.toLowerCase());
    });
    setFilteredUserData(() => filterData);
  };

  // function to handle the enter key
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) handleSearch();
  };

  // adding the event listener for enter key
  useEffect(() => {
    document.addEventListener("keydown", (e) => handleKeyDown(e));
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex border rounded justify-between items-center w-96 pr-2 gap-4 mb-4">
      <input
        onChange={(e) => {
          setSearchedText(e.target.value);
        }}
        value={searchedText}
        type="text"
        className="outline-none  rounded h-9  w-full pl-3 "
        placeholder="Search Here..."
      />
      <img
        onClick={handleSearch}
        src={SearchIcon}
        alt="search icon"
        className="cursor-pointer"
      />
    </div>
  );
};

export default SearchBox;
