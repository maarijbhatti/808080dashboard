import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Autocomplete, Button, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import styles from "@/styles/PageTitle.module.css";
import { Flex } from "@mantine/core";
import moment from "moment/moment";

export default function BannerHome() {
  const [salesManId, setSalesManId] = useState("");
  const [bannerTypeId, setBannerTypeId] = useState("");
  const [catogoryId, setCatogoryId] = useState("");

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contact, setContact] = useState("");
  const [external, setExternal] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [file1, setFile1] = useState([]);
  const [file2, setFile2] = useState([]);

  const [salesMan, setSalesMan] = useState([]);
  const [bannerTypes, setBannerTypes] = useState([]);
  const [mainCatogories, setMainCatogories] = useState([]);
  const dispatch = useDispatch();
  const Base_Url = "https://backend.albaseerdevelopers.com/upload/";
  useEffect(() => {
    dispatch({ type: "COUNTRY" });
    dispatch({
      type: "BANNER_HOME",
      payload: { country_id: 109, page: 1 },
    });
    dispatch({ type: "SALESMAN_BANNERTYPE" });

    dispatch({ type: "MAIN_CATEGORY" });
  }, []);
  const SalesMan_BannerType = useSelector((state) => state.salesMan_BannerType);
  const Main_Category = useSelector((state) => state.main_category);
  const Country = useSelector((state) => state.countries);
  useEffect(() => {
    console.log("SalesMan_BannerType", SalesMan_BannerType.bannerTypes);
    setSalesMan(SalesMan_BannerType.salesMan);
    console.log("SalesMan_BannerType", SalesMan_BannerType.salesMan);
    setBannerTypes(SalesMan_BannerType.bannerTypes);
  }, [SalesMan_BannerType]);
  useEffect(() => {
    console.log("Main_Category", Main_Category);
    setMainCatogories(Main_Category);
  }, [Main_Category]);
  const getImageName = (image) => {
    const imageName = image.path.split("/").pop();
    console.log("image Name", imageName);
    return imageName.trim();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('aslkdjmaldkmasd', startDate, moment(new Date(startDate)).format(), moment(new Date(endDate)).format())

    const form = new FormData();
    form.append("salesman_id", salesManId);
    form.append("banner_type", bannerTypeId);
    form.append("category_id", catogoryId);
    form.append("phone_numbers", countryCode.replace('+', '00') + phone);
    form.append("contact", contact);
    form.append("external_link", external);
    form.append("order_date", moment(new Date(orderDate)).format());
    form.append("from_date", moment(new Date(startDate)).format());
    form.append("to_date", moment(new Date(endDate)).format());

    for (let i = 0; i < file1.length; i++) {
      const image = file1[i];
      form.append("main_image", image, image.name || getImageName(image));
    }

    // for (let key in file2) {
    //   form.append("main_image", file2[key]);
    // }

    // for (let key in file1) {
    //   form.append("big_image", file1[key]);
    // }


    for (let i = 0; i < file2.length; i++) {
      const image = file2[i];
      form.append("big_image", image, image.name || getImageName(image));
    }

    //const formDataArray = Array.from(form);

    console.log("formDataArray", form);
    dispatch({ type: "CREATEBANNER", payload: form });
  };

  const handleChangeCatogory = (event) => {
    setCatogoryId(event.target.value);
  };
  const handleChangeBanner = (event) => {
    console.log(event.target);
    setBannerTypeId(event.target.value);
  };
  const handleChangeSaleMan = (event) => {
    setSalesManId(event.target.value);
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
          Banner Home
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
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Salesman
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Salesman</InputLabel>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={salesManId}
                  label='Sales Man'
                  name='salesManId'
                  onChange={(e) => handleChangeSaleMan(e)}>
                  {salesMan?.map((v, k) => {
                    return (
                      <MenuItem key={k} value={v?.id}>
                        {v?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Banner Type
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Banner</InputLabel>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={bannerTypeId}
                  label='Banner'
                  name='bannerId'
                  onChange={(e) => handleChangeBanner(e)}>
                  {bannerTypes?.map((v, k) => {
                    return (
                      <MenuItem key={k} value={v?.name}>
                        {v?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems='center'
            spacing={2}
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              mt: "10px",
            }}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Catogory
              </Typography>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Catogory</InputLabel>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={catogoryId}
                  label='Catogory'
                  name='CatogoryId'
                  onChange={(e) => handleChangeCatogory(e)}>
                  {mainCatogories?.map((v, k) => {
                    return (
                      <MenuItem key={k} value={v?.id}>
                        {JSON.parse(v?.name).name_en}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Phone Number
              </Typography>
              <TextField
                type='number'
                required
                name='phone'
                fullWidth
                id='phone'
                label='Phone Number'
                autoFocus
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid> */}
            <Grid item xs={6} md={6} sm={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Phone Number
              </Typography>
              <Flex>
                <Grid item xs={6} sm={4} alignItems="">
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: "auto" }}
                    options={Country}
                    autoHighlight
                    getOptionLabel={(option) =>
                      option?.phone_prefix?.replace("00", "+")
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={Base_Url + option?.flag}
                          srcSet={Base_Url + option?.flag}
                          alt=""
                        />
                        ({option?.phone_prefix?.replace("00", "+")})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Country Code"
                        name="phone"
                        value={params?.id}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        // onChange={(e) => {
                        //   console.log('aLKSDMJAKLSDJNA',e.target.value)
                        //   setCountryCode(e.target.value)}}
                        onSelect={(e) => {
                          console.log('aLKSDMJAKLSDJNA', e.target.value)
                          setCountryCode(e.target.value)
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={8} style={{ marginLeft: '5px' }}>
                  <TextField
                    type='number'
                    required
                    name='phone'
                    fullWidth
                    id='phone'
                    label='Phone Number'
                    autoFocus
                    onChange={(e) => setPhone(e.target.value)}
                    InputProps={{
                      style: { borderRadius: 8 },
                    }}
                  />
                </Grid>
              </Flex>
            </Grid>


          </Grid>
          <Grid
            container
            alignItems='center'
            spacing={2}
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              mt: "10px",
            }}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Contact
              </Typography>
              <TextField
                required
                name='contact'
                fullWidth
                id='contact'
                label='Contact'
                autoFocus
                onChange={(e) => setContact(e.target.value)}
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                External Link
              </Typography>
              <TextField
                required
                name='externalLink'
                fullWidth
                id='externalLink'
                label='External Link'
                autoFocus
                onChange={(e) => setExternal(e.target.value)}
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: "8px" }}>
            <Grid item xs={12} sm={4}>
              <Typography
                component='label'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}>
                Order Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={orderDate}
                  onChange={(newValue) => {
                    setOrderDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required name='birthdate' {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Repeat the above Grid item two more times */}
            <Grid item xs={12} sm={4}>
              <Typography
                component='label'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}>
                Start Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField name='birthdate' required {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography
                component='label'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}>
                End Date
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField name='birthdate' required {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              fontWeight: "500",
              fontSize: "14px",
              mt: "12px",
            }}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Main Image
              </Typography>
              <ImageSelect file={file1} setFile={(e) => setFile1(e)} />
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Typography
                as='h5'
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}>
                Big Image
              </Typography>
              <ImageSelect file={file2} setFile={(e) => setFile2(e)} />
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              Whatsapp
            </Typography>

            <TextField
              fullWidth
              id="Link"
              label="Whatsapp link"
              name="whatsapp_number"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              Facebook
            </Typography>

            <TextField
              fullWidth
              id="link"
              label=" Facebook link"
              name="facebook"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              Youtube
            </Typography>

            <TextField
              fullWidth
              id="link"
              label="Youtube link"
              name="youtube"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              SnapTube
            </Typography>

            <TextField
              fullWidth
              id="link"
              label="SnapTube link"
              name="snapchat"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              Linkedin
            </Typography>

            <TextField
              fullWidth
              id="link"
              label=" Linkedin link"
              name="linkedin"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}
            >
              Twitter
            </Typography>

            <TextField
              fullWidth
              id="link"
              label=" Twitter Link"
              name="twitter"
              autoComplete="link"
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
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

function ImageSelect({ file, setFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
  });
  const thumbs = file?.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img src={file.preview} className={styles.img} alt={file.name} />
      </div>
      {/* <button onClick={removeFile(file)}>Remove File</button> */}
    </div>
  ));
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Card
          className={styles.dropzone}
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            p: "25px",
            mb: "15px",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              alignItems: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: ["center", "center", "inherit"],
              }}>
              <Typography variant='h5' fontWeight='500' mb={1}>
                Drop files here or click to upload.
              </Typography>
            </Box>
          </Box>
        </Card>
      </div>
      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </>
  );
}
