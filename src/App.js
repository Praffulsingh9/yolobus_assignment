import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Select from "react-select";
import { useTable, usePagination, useSortBy } from "react-table";
import SearchInput from "./components/searchInput";
import { Row, Col, Button } from "react-bootstrap";
import SideModal from "./components/Modal";

const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
  }),
  input: (provided) => ({
    ...provided,
    color: "black",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: "black",
  }),
  container: (provided, state) => ({
    ...provided,
    color: "black",
    width: 200,
    margin: 10,
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "black",
  }),
};

function App() {
  const [data, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pnr, setpnr] = useState("");
  const [contact, setcontact] = useState("");
  const [masterData, setmasterData] = useState([]);
  const [name, setName] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [error, setError] = useState("");
  const [isOpen, toggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    let fetchRecords = async () => {
      const result = await axios.get(
        "https://6033d1cc843b150017931a99.mockapi.io/records"
      );
      setRecords(result.data);
      setmasterData(result.data);
      setIsLoading(false);
    };
    fetchRecords();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
        sortType: "basic",
      },
      {
        Header: "Contact_Number",
        accessor: "Contact_Number",
        sortable: false,
      },
      {
        Header: "PNR_No",
        accessor: "PNR_No",
      },
      {
        Header: "From",
        accessor: "From",
      },
      {
        Header: "To",
        accessor: "To",
      },
      {
        Header: "Date_of_journey",
        accessor: "Date_of_journey",
        sortType: "basic",
        Cell: (props) => {
          
          return <p>{props.value.split("T")[0]}</p>;
        },
      },
      {
        Header: "Total_Amount",
        accessor: "Total_Amount",
      },
    ],
    []
  );

  const onChangePNR = (e) => {
    setcontact("");
    setpnr(e.target.value);
    let newRecords = masterData.filter((f) =>
      f.PNR_No.toString().includes(e.target.value)
    );

    setRecords(newRecords);
  };

  const onChangeContact = (e) => {
    setpnr("");
    setcontact(e.target.value);
    let newRecords = masterData.filter((f) =>
      f.Contact_Number.toString().includes(e.target.value)
    );

    setRecords(newRecords);
  };

  const onChangeName = (e) => {
   
    let newRecords = masterData.filter((f) =>
      f.Name.toString().includes(e.label)
    );
    setName(e);
    setRecords(newRecords);
  };

  const onChangeDate = (e, key) => {
    if (key == "start") {
      setStart(e);
    } else {
      setEnd(e);
    }
  };

  const apply = () => {
    if (start && end) {
      let newRecords = masterData.filter(
        (f) =>
          f.Date_of_journey.toString().split("T")[0] >= start.label &&
          f.Date_of_journey.toString().split("T")[0] <= end.label
      );
      setRecords(newRecords);
    } else if (!start && !end) {
      setError("Select Start and End Date");
    } else if (!end) {
      setError("Select End Date");
    } else if (!start) {
      setError("Select Start Date");
    }
  };

  const reset = () => {
    setEnd();
    setStart();
    setName();
    setRecords(masterData);
  };

  const onPnrClick = (row) => {
    setSelectedRow(row.values);
    toggle(true);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <Row>
      <Col lg={12} md={10} sm={10}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            minHeight: "100vh",
          }}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <div style={{ width: "80%" }}>
              <SearchInput
                placeholder="Search by PNR"
                value={pnr}
                onChange={(e) => onChangePNR(e)}
              />
              <SearchInput
                placeholder="Search by Contact"
                value={contact}
                onChange={(e) => onChangeContact(e)}
              />
              <div
                style={{ margin: 10, display: "flex", flexDirection: "row" }}
              >
                <Select
                  name="singleSelect"
                  value={name ? name : null}
                  onChange={(value) => onChangeName(value)}
                  options={masterData.map((m, i) => ({
                    label: m.Name,
                    value: i + 1,
                  }))}
                  placeholder="Select Name"
                  styles={customStyles}
                />
              </div>
              <div
                style={{ margin: 10, display: "flex", flexDirection: "row" }}
              >
                <Select
                  value={start ? start : null}
                  onChange={(value) => onChangeDate(value, "start")}
                  options={masterData.map((m, i) => ({
                    label: m["Date_of_journey"].split("T")[0],
                    value: i + 1,
                  }))}
                  placeholder="Select Start Date"
                  styles={customStyles}
                />
                <Select
                  value={end ? end : null}
                  onChange={(value) => onChangeDate(value, "end")}
                  options={masterData.map((m, i) => ({
                    label: m["Date_of_journey"].split("T")[0],
                    value: i + 1,
                  }))}
                  placeholder="Select End State"
                  styles={customStyles}
                />
                <Button variant="success" size="lg" onClick={() => apply()}>
                  Apply
                </Button>
                <Button variant="danger" size="lg" onClick={() => reset()}>
                  Reset
                </Button>
              </div>
              {error.length > 0 && error}
              <table {...getTableProps()}>
                <thead>
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          // Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                              style={{
                                borderBottom: "solid 3px red",
                                background: "aliceblue",
                                color: "black",
                                fontWeight: "bold",
                              }}
                            >
                              {
                                // Render the header
                                column.render("Header")
                              }
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                  {
                    // Loop over the table rows
                    page.map((row) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                          {
                            // Loop over the rows cells
                            row.cells.map((cell) => {
                              // Apply the cell props
                              return (
                                <td {...cell.getCellProps()}>
                                  {
                                    // Render the cell contents
                                    cell.column.Header === "PNR_No" ? (
                                      <a
                                        style={{
                                          textDecoration: "underline",
                                          color: "blue",
                                        }}
                                        onClick={() => onPnrClick(row)}
                                      >
                                        {cell.render("Cell")}
                                      </a>
                                    ) : cell.column.Header ===
                                      "Date_of_journey" ? (
                                      <p>{cell.render("Cell")}</p>
                                    ) : (
                                      cell.render("Cell")
                                    )
                                  }
                                </td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"Previous"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {"Next"}
                </button>{" "}
              </div>
            </div>
          )}
        </div>
      </Col>
      <SideModal
        isOpen={isOpen}
        selectedRow={selectedRow}
        toggle={() => {
          toggle(!isOpen);
        }}
      />
    </Row>
  );
}

export default App;
