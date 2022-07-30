import React, { useState } from "react";

import DataTable from "react-data-table-component";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      name="search"
      type="text"
      value={filterText}
      onChange={onFilter}
      aria-label="Search Input"
      className="appearance-none rounded-none relative mx-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
      placeholder="Buscar por Correo"
    />
    <button
      onClick={onClear}
      className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-yellow-400"
    >
      X
    </button>
  </>
);

const Table = (props) => {
  const [data] = useState(props.data);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item[`${props.busqueda}`] &&
      item[`${props.busqueda}`].toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <div className="table-responsive">
        <DataTable
          columns={props.columns}
          data={filteredItems}
          fixedHeader={true}
          fixedHeaderScrollHeight="350px"
          pagination
          noDataComponent={<span>No se encontró ningún elemento</span>}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationResetDefaultPage={resetPaginationToggle}
          persistTableHead
          highlightOnHover
          pointerOnHover
        />
      </div>
    </>
  );
};

export default Table;
