const Pagination = ({ filteredUserData, currentPage, setCurrentPage }) => {
  return (
    <div className="flex gap-2 justify-end -mt-7">
      <div
        onClick={() => setCurrentPage(1)}
        className={`first-page border rounded text-sm py-1 cursor-pointer px-3
        ${
          currentPage == 1
            ? "cursor-not-allowed bg-gray-100"
            : "cursor-pointer bg-white"
        }
        `}
      >
        &lt;&lt;
      </div>
      <div
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`previous-page border rounded text-sm py-1 cursor-pointer px-3
        ${
          currentPage == 1
            ? "cursor-not-allowed bg-gray-100"
            : "cursor-pointer bg-white"
        }
        `}
      >
        &lt;
      </div>
      {Array(Math.ceil(filteredUserData.length / 10))
        .fill("")
        .map((_, index) => (
          <div
            onClick={() => setCurrentPage(index + 1)}
            className={`${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
            } ${
              "page" + "-" + (index + 1)
            } border rounded text-sm py-1 cursor-pointer px-3`}
          >
            {index + 1}
          </div>
        ))}
      <div
        onClick={() => setCurrentPage(() => currentPage + 1)}
        className={`next-page  border rounded text-sm py-1  px-3 ${
          currentPage == Math.ceil(filteredUserData.length / 10)
            ? "cursor-not-allowed bg-gray-100"
            : "cursor-pointer bg-white"
        }`}
      >
        &gt;
      </div>
      <div
        onClick={() => setCurrentPage(Math.ceil(filteredUserData?.length / 10))}
        className={`last-page border rounded text-sm py-1  px-3 ${
          currentPage == Math.ceil(filteredUserData.length / 10)
            ? "cursor-not-allowed bg-gray-100"
            : "cursor-pointer bg-white"
        } `}
      >
        &gt;&gt;
      </div>
    </div>
  );
};

export default Pagination;
