import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "@mui/material/Card";
import {
    Button,
    //CardContent,
    Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
// import {
//     useDispatch,
//     //  useSelector
// } from "react-redux";
//import SearchIcon from "@mui/icons-material/Search";
import useOuterClick from "@/components/hooks/useOutSideClick";
import { debounce } from "lodash";
import { NEXT_PUBLIC_REST_API_ENDPOINT } from "redux/store";
import axios from "axios";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";

// const Search = styled(TextField)(({ theme }) => ({
//     position: "relative",
//     borderRadius: 100,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: 0,
//     marginLeft: 0,
//     marginBottom: 20,
//     width: "100%",
//     [theme.breakpoints.up("xs")]: {
//         marginRight: theme.spacing(1),
//         width: "auto",
//     },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     // color: "#8f2c4f",
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     right: "5",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: "5",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     width: "100%",
//     "& .MuiInputBase-input": {
//         //   backgroundColor: "#F5F7FA",
//         height: '30px',
//         border: '1px solid gray',
//         borderRadius: "5px",
//         padding: theme.spacing(1.4, 0, 1.4, 2),
//     },
// }));

const packageCountryWiseList = [
    {
        "Id": "1",
        "package_id": "1",
        "country_id": "182",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "2",
        "package_id": "1",
        "country_id": "109",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "1000",
        "commercial_expire_days": "7"
    },
    {
        "Id": "3",
        "package_id": "1",
        "country_id": "157",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "4",
        "package_id": "1",
        "country_id": "216",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "5",
        "package_id": "1",
        "country_id": "59",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "6",
        "package_id": "1",
        "country_id": "94",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "7",
        "package_id": "1",
        "country_id": "15",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "8",
        "package_id": "1",
        "country_id": "103",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "9",
        "package_id": "1",
        "country_id": "156",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "10",
        "package_id": "1",
        "country_id": "168",
        "classified_count": "0",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    },
    {
        "Id": "11",
        "package_id": "1",
        "country_id": "164",
        "classified_count": "10000",
        "classified_expire_days": "30",
        "commercial_count": "0",
        "commercial_expire_days": "30"
    }
]

export default function AssignPackagesToCustomer() {
    // const [customerId, setCustomerId] = useState("");
    const [packageId, setPackageId] = useState("");

    const [packageInfoId, setPackageInfoId] = useState("");

    //  const [customer, setCustomer] = useState([]);
    const [packages, setPackages] = useState([]);
    const [packagesInfo, setPackagesInfo] = useState([]);
    const [packageCountrySelected, setPackageCountrySelected] = useState({});
    //const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${NEXT_PUBLIC_REST_API_ENDPOINT}/address/countries-list`).then((res) => {
            setPackagesInfo(res?.data?.data)
        }).catch((err) => {
            alert(err?.message)
        })
    }, []);

    useEffect(() => {
        setPackages([
            {
                "Id": "1",
                "name": "Registration - Gifted",
                "desc": "Registration - Gifted",
                "validity_days": "365",
                "price": "0.000",
                "is_renewable": "1",
                "renew_in_days": "30"
            }
        ]);
    }, []);


    const handleSubmit = (event) => {
        console.log('a;sdmalsd', packageInfoId)
        event.preventDefault();
        axios.post(`${NEXT_PUBLIC_REST_API_ENDPOINT}/user/assign-customer-allowed-ads`, { customer_id: userId, assigned_classified_ads: packageCountrySelected?.classified_count, assigned_commercial_ads: packageCountrySelected?.commercial_count }, {
            headers: {
                Authorization: `bearer ${token}`
            },
        }).then((res) => {
            alert(`${packageCountrySelected?.classified_count} Classified ads and ${packageCountrySelected?.commercial_count} Commercial ads ${res?.data?.message}`)
        }).catch((err) => {
            alert(err?.message)
        })
    };

    const handleChangePackage = (event) => {
        console.log(event.target.value);
        setPackageId(event.target.value);
    };

    const handleChangePackageInfo = (event) => {
        // console.log('asdassaddddasda', packageInfoRef.current);
        // if (packageInfoRef.current)
        //     packageInfoRef.current.closeMenu()
        console.log(event.target.value);
        const packageSelected = packageCountryWiseList.find((val) => val.country_id == event.target.value)
        setPackageInfoId(event.target.value);
        setPackageCountrySelected(packageSelected ? packageSelected : packageCountryWiseList[1]);
    };
    // const handleChangeCustomer = (event) => {
    //     setCustomerId(event.target.value);
    // };

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const valueRef = useRef(null);
    const handleChange = async (val) => {
        setValue(val.target.value);

        valueRef.current = val.target.value;
        if (val.target.value) {
            setLoading(true);
            fetchUserList(val.target.value);
            setLoading(false);
        } else {
            setUsersList([]);
        }
    };
    const [usersList, setUsersList] = useState([]);
    const innerRef = useOuterClick(() => setUsersList([]));

    //const packageInfoRef = useRef(null)

    const [
        userId,
        setUserId
    ] = useState(null);
    const onCLickList = () => {
        onSearch(value);
        setUsersList([]);
    };
    const [index, setIndex] = useState(null);
    const token = Cookies.get("auth_token");
    const fetchUserList = useMemo(() => {
        const loadOptions = (value) => {
            console.log("fetching user", value);
            axios
                .get(`${NEXT_PUBLIC_REST_API_ENDPOINT}/user/by-name/${value}`, {
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                })
                .then((body) => {
                    setUsersList(body.data);
                })
                .catch(() => {
                    setUsersList(["Not Found"]);
                });
        };

        return debounce(loadOptions, 500);
    }, []);

    const onSearch = () => {
        setUserId(value.id);
    };

    return (
        <>
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px",
                    mb: "15px",
                }}>
                <Typography
                    as='h3'
                    sx={{
                        fontSize: 18,
                        fontWeight: 500,
                        mb: "10px",
                    }}>
                    Assign Package
                </Typography>

                <Box component='form' noValidate={false} onSubmit={handleSubmit}>
                    <Grid
                        container
                        alignItems='center'
                        spacing={2}
                        sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mt: "12px",
                        }}>
                        <Grid item xs={12} md={12} lg={4}>
                            <Typography
                                as='h5'
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    mb: "12px",
                                }}>
                                Customer
                            </Typography>
                            <FormControl fullWidth>
                                {/* <InputLabel id='demo-simple-select-label'>Customer</InputLabel> */}
                                {/* <Select
                                    required
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={customerId}
                                    label='Sales Man'
                                    name='customerId'
                                    onChange={(e) => handleChangeCustomer(e)}>
                                    {customer?.map((v, k) => {
                                        return (
                                            <MenuItem key={k} value={v?.id}>
                                                {v?.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select> */}
                                <TextField
                                    // id='demo-simple-select'
                                    // name='customerId'
                                    placeholder="Search Customer"
                                    loading={loading}
                                    value={value?.name}
                                    onChange={handleChange}
                                />
                                {usersList[0] && (
                                    <div
                                        ref={innerRef}
                                        style={{ marginTop: '53px', width: '400px', height: '150px', minHeight: 'auto', backgroundColor: '#DAE8F3', position: 'fixed', borderRadius: '0.375rem', zIndex: 1111 }}
                                    >
                                        {usersList.map((val, i) => (
                                            <div
                                                onClick={onCLickList}
                                                onMouseEnter={() => {
                                                    setIndex(i);
                                                    setValue(val);
                                                }}
                                                onMouseLeave={() => {
                                                    setIndex(null);
                                                    setValue(valueRef.current);
                                                }}
                                                style={{ cursor: "pointer", paddingLeft: "10px", fontSize: 12, height: "40px", display: 'flex', alignItems: 'center', backgroundColor: index == i ? "#DAE8F3" : "#D8D8D8", }}
                                            >
                                                <a>{val.name}</a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12} lg={4}>
                            <Typography
                                as='h5'
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    mb: "12px",
                                }}>
                                Package
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Packages</InputLabel>
                                <Select
                                    required
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={packageId}
                                    onChange={(e) => handleChangePackage(e)}
                                >
                                    {packages?.map((v, k) => {
                                        return (
                                            // <Card style={{ backgroundColor: index == i ? "#DAE8F3" : "#D8D8D8", }} onMouseEnter={() => {
                                            //     setIndex(i);
                                            // }}
                                            //     onMouseLeave={() => {
                                            //         setIndex(null);
                                            //     }}>
                                            //     <CardContent onClick={() => handleChangePackage(v)}>
                                            //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            //             Name: {v?.name}
                                            //         </Typography>
                                            //         <Typography variant="h7" component="div">
                                            //             Validity days:  {v?.validity_days}
                                            //         </Typography>

                                            //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            //             Price:  {v?.price}
                                            //         </Typography>

                                            //         <Typography variant="body2">
                                            //             Is Renewable:  {v?.is_renewable ? 'Yes' : 'No'}
                                            //         </Typography>
                                            //         <Typography variant="body2">
                                            //             Renew in days:  {v?.renew_in_days}
                                            //         </Typography>
                                            //     </CardContent>
                                            // </Card>
                                            <MenuItem key={k} value={v?.Id}>
                                                {v.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <Typography
                                as='h5'
                                sx={{
                                    fontWeight: "500",
                                    fontSize: "14px",
                                    mb: "12px",
                                }}>
                                Country
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel id='demo-simple-select-label'>Country</InputLabel>
                                <Select
                                    required
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    //name={'packageInfoId'}
                                    value={packageInfoId}
                                    onChange={(e) => handleChangePackageInfo(e)}
                                >
                                    {packagesInfo?.map((v, i) => {
                                        return (
                                            // <Card key={i} style={{ backgroundColor: index == i ? "#DAE8F3" : "#D8D8D8", }} onMouseEnter={() => {
                                            //     setIndex(i);
                                            // }}
                                            //     onMouseLeave={() => {
                                            //         setIndex(null);
                                            //     }}>
                                            //     <CardContent onClick={() => handleChangePackageInfo(v)} >
                                            //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            //             package_id: {v?.package_id}
                                            //         </Typography> v  
                                            //         <Typography variant="h7" component="div">
                                            //             country_id:  {v?.country_id}
                                            //         </Typography>

                                            //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            //             classified_count:  {v?.classified_count}
                                            //         </Typography>
                                            //         <Typography variant="body2">
                                            //             classified_expire_days:  {v?.classified_expire_days}
                                            //         </Typography>
                                            //         <Typography variant="body2">
                                            //             commercial_count:  {v?.commercial_count}
                                            //         </Typography>
                                            //         <Typography variant="body2">
                                            //             commercial_expire_days:  {v?.commercial_expire_days}
                                            //         </Typography>
                                            //     </CardContent>
                                            // </Card>
                                            <MenuItem key={i} value={v?.id}>
                                                {JSON.parse(v?.name).name_en}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} textAlign='end'>
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{
                                mt: 1,
                                textTransform: "capitalize",
                                borderRadius: "8px",
                                fontWeight: "500",
                                fontSize: "13px",
                                padding: "12px 20px",
                                color: "#fff !important",
                            }}>
                            <SendIcon
                                sx={{
                                    position: "relative",
                                    top: "-2px",
                                }}
                                className='mr-5px'
                            />
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Card>
        </>
    );
}
