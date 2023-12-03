import { useEffect, useState } from "react";
import Loader from "./components/Common/Loader";
import SearchBox from "./components/SearchBox";
import TableContainer from "./components/TableContainer";
import Pagination from "./components/Pagination";

const App = () => {
  // to store the user data
  const [userData, setUserData] = useState([]);

  // loading state for loader
  const [loading, setLoading] = useState(false);

  // to store the filtered user data
  const [filteredUserData, setFilteredUserData] = useState([]);

  // current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // to get the data from the api
  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response?.json();
      setLoading(false);

      setUserData(() => {
        return data.map((user, index) => ({
          isChecked: false,
          ...user,
        }));
      });

      setFilteredUserData(() => {
        return data.map((user, index) => ({
          isChecked: false,
          ...user,
        }));
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  // calling getUserData function on load
  useEffect(() => {
    getUserData();
  }, []);

  // rendering the loader until data is fetched from the api
  if (loading) return <Loader />;

  return (
    <div className="p-5 font-poppins">
      <SearchBox
        setFilteredUserData={setFilteredUserData}
        userData={userData}
      />
      <TableContainer
        userData={userData}
        setUserData={setUserData}
        filteredUserData={filteredUserData}
        setFilteredUserData={setFilteredUserData}
        currentPage={currentPage}
      />
      <Pagination
        filteredUserData={filteredUserData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
