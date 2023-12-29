import * as React from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
// import Checkbox from '@mui/material/Checkbox';
// import Tooltip from "@mui/material/Tooltip";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import axios from "axios";
import { NEXT_PUBLIC_REST_API_ENDPOINT } from "redux/store";
import Cookies from "js-cookie";

//const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function InvoiceList(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

InvoiceList.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(
//   orderID,
//   productName,
//   clientName,
//   clientImg,
//   email,
//   issuedDate,
//   total,
//   balance,
//   badgeClass,
// ) {
//   return {
//     orderID,
//     productName,
//     clientName,
//     clientImg,
//     email,
//     issuedDate,
//     total,
//     balance,
//     badgeClass,
//   };
// }

// const rows = [
//   createData(
//     "#14250",
//     "Laptop Macos Pro",
//     "Colin Firth",
//     "/images/user1.png",
//     "colinfirth@gmail.com",
//     "10 Jan 2023",
//     "$845",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14251",
//     "Smart Camera XD6",
//     "Wade Dave",
//     "/images/user2.png",
//     "wadedave@gmail.com",
//     "11 Jan 2023",
//     "$189.50",
//     "Not Paid",
//     "dangerBadge",
//   ),
//   createData(
//     "#14252",
//     "Pixi 8 Wireless Airphone",
//     "Seth Riley",
//     "/images/user3.png",
//     "sethriley@gmail.com",
//     "12 Jan 2023",
//     "$250.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14253",
//     "Jebble Smart Watch",
//     "Gilbert Dan",
//     "/images/user4.png",
//     "gilbertdan@gmail.com",
//     "13 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14254",
//     "Admas Airpod x-Zon",
//     "Joshua Glen",
//     "/images/user5.png",
//     "joshuaGlen@gmail.com",
//     "14 Jan 2023",
//     "$289.50",
//     "Not Paid",
//     "dangerBadge",
//   ),
//   createData(
//     "#14255",
//     "Smart Satch F8 Pro",
//     "Lewis Milton",
//     "/images/user6.png",
//     "lewisMilton@gmail.com",
//     "15 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14256",
//     "Nord Fold ZL",
//     "Liam Ethan",
//     "/images/user7.png",
//     "liamEthan@gmail.com",
//     "16 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14257",
//     "Wall Clock Cimbina",
//     "Ramon Miles",
//     "/images/user8.png",
//     "ramonMiles@gmail.com",
//     "17 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14258",
//     "Galaxo T6 Munsun",
//     "Brian Roberto",
//     "/images/user9.png",
//     "ramonMiles@gmail.com",
//     "18 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14259",
//     "Laptop Macos Pro",
//     "Colin Firth",
//     "/images/user10.png",
//     "colinFirth@gmail.com",
//     "19 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14260",
//     "Smart Camera XD6",
//     "Wade Dave",
//     "/images/user11.png",
//     "wadeDave@gmail.com",
//     "20 Jan 2023",
//     "$189.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14261",
//     "Pixi 8 Wireless Airphone",
//     "Seth Riley",
//     "/images/user12.png",
//     "wadeDave@gmail.com",
//     "21 Jan 2023",
//     "$250.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14262",
//     "Jebble Smart Watch",
//     "Gilbert Dan",
//     "/images/user13.png",
//     "wadeDave@gmail.com",
//     "22 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14263",
//     "Admas Airpod x-Zon",
//     "Joshua Glen",
//     "/images/user14.png",
//     "joshuaGlen@gmail.com",
//     "23 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14264",
//     "Smart Satch F8 Pro",
//     "Lewis Milton",
//     "/images/user15.png",
//     "lewisMilton@gmail.com",
//     "24 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
//   createData(
//     "#14265",
//     "Nord Fold ZL",
//     "Liam Ethan",
//     "/images/product7.png",
//     "liamEthan@gmail.com",
//     "25 Jan 2023",
//     "$289.50",
//     "Paid",
//     "successBadge",
//   ),
// ].sort((a, b) => (a.orderID < b.orderID ? -1 : 1));

export default function InvoiceLists() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orders, setOrders] = React.useState([])
  const [pagination, setPagination] = React.useState(0)

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage ? newPage : 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const token = Cookies.get("auth_token");
  React.useEffect(() => {
    if (token)
      axios.get(`${NEXT_PUBLIC_REST_API_ENDPOINT}/order/all?take=${rowsPerPage}&page=${page}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }).then((body) => {
        setOrders(body?.data?.data?.data);
        setPagination(body?.data?.data?.pagination)
      })
    // .catch(() => {
    //   setOrders(null);
    // });
  }, [rowsPerPage, page])

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Invoice Lists
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 900 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                {orders[0] && Object.keys(orders[0]).map((val) =>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      fontSize: "14px",
                      padding: "16px 10px",
                    }}
                  >
                    {val}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders[0] && orders.map((row) => (
                <TableRow key={row.orderID}>
                  {orders[0] && Object.values(row).map((val) =>
                    <TableCell
                      sx={{
                        fontWeight: "500",
                        fontSize: "13px",
                        borderBottom: "1px solid #F7FAFF",
                        padding: "8px 10px",
                      }}
                    >

                      {JSON.stringify(val)}
                    </TableCell>
                  )}

                </TableRow>
              ))}

            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={pagination.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={InvoiceList}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
