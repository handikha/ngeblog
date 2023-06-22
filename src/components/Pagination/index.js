const Pagination = ({ currentPage, totalPage, handlePagination }) => {
  const visiblePages = 5; // Jumlah halaman yang ditampilkan

  const getStartPage = () => {
    let startPage = currentPage - Math.floor(visiblePages / 2);
    if (startPage < 1) {
      startPage = 1;
    } else if (startPage + visiblePages - 1 > totalPage) {
      startPage = totalPage - visiblePages + 1;
    }
    return startPage;
  };

  return (
    <ul className="pagination">
      {Array.from({ length: visiblePages }, (_, index) => {
        const pageNumber = getStartPage() + index;
        return (
          <li
            key={index}
            onClick={() =>
              currentPage === pageNumber ? null : handlePagination(pageNumber)
            }
          >
            <span
              className={`border px-3 py-2 leading-tight ${
                currentPage === pageNumber
                  ? "cursor-default border-primary bg-primary text-white"
                  : "cursor-pointer bg-lightest text-primary hover:bg-light"
              }`}
            >
              {pageNumber}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
