import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography, Autocomplete, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
//import { CustomTextField } from "../Common/InputText/InputField";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
// import { useAlert } from "react-alert";
export default function GeolocationDialog({
  allJobSegments,
  jobSegmentState,
  setJobSegmentState,
  internshipPayment,
  setInternshipPayment,
  jobPayment,
  setJobPayment,
  addJob,
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  //const alert = useAlert();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [maxWidth, setMaxWidth] = React.useState("xs");
  const [address, setAddress] = useState();
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lon: null,
  });

  //   const handleSelect = async (value) => {
  //     const results = await geocodeByAddress(value);
  //     const ll = await getLatLng(results[0]);
  //     console.log("LLLL", ll);
  //     setAddress(value);
  //     setCoordinates(ll);
  //   };

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      //setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //setStatus(null);
          console.log("POSTION", position);
          setCoordinates({
            lat: position.coords.latitude,
            lan: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        color="primary"
        variant="text"
        startIcon={<MyLocationOutlinedIcon />}
        sx={{
          boxShadow: "none",
          p: 0,
          marginTop: "6px",
          marginBottom: "6px",
        }}
      >
        select Location
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: { borderRadius: 12 },
        }}
      >
        <DialogContent>
          {/* <Typography sx={{ fontSize: "20px", mb: 2 }}>
            Select Job Segment
          </Typography> */}
          <Grid container spacing={2}>
            <Grid md={12} sx={{ display: "grid" }}>
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                //options={allJobSegments?.length > 0 ? allJobSegments : []}
                //getOptionLabel={(option) => option?.job_segment}
                //value={jobSegmentState}
                // onChange={(e, item) => {
                //   if (item) {
                //     setJobSegmentState(item);
                //   }
                // }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    label="Select Job Role"
                  />
                )}
              /> */}

              {/* <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete> */}
              <Button
                onClick={getLocation}
                color="primary"
                variant="text"
                startIcon={<MyLocationOutlinedIcon />}
                sx={{
                  boxShadow: "none",
                  p: 0,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                help us locate your current Location
              </Button>
              <Typography>{`latitude: ${
                coordinates?.lat ? coordinates?.lat : "NA"
              }`}</Typography>
              <Typography>{`lobgitude: ${
                coordinates?.lan ? coordinates?.lan : "NA"
              }`}</Typography>
            </Grid>
            <Grid md={12} sx={{ display: "grid" }}>
              <Box sx={{ mt: 3 }}>
                {/* <img src={Map} style={{ width: "100%" }} /> */}
                <iframe
                  src={`https://maps.google.com/maps?q=28.520072,77.2010112&z=15&output=embed`}
                  width="100%"
                  height="270"
                  frameborder="0"
                  /*  style={{ border: 0 }} */
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
