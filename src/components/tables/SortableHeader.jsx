const SortableHeader = ({
  column,
  title,
  sortColumn,
  sortDirection,
  handleSort,
  additionalStyle = "",
}) => {
  const handleClick = () => {
    handleSort(column);
  };

  return (
    <th
      className={`px-4 py-2 cursor-pointer text-nowrap ${additionalStyle}`}
      onClick={handleClick}
    >
      <p>
        {title}
        {
          sortColumn === column &&
            // <span
            //   style={{
            //     position: "absolute",
            //     // marginLeft: "10px",
            //     //   top: "50%",
            //     //   transform: "translateY(-50%)",
            //   }}
            // >
            (sortDirection === "asc" ? "▲" : "▼")
          // </span>
        }
      </p>
    </th>
  );
};

export default SortableHeader;
