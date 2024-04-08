import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { addListing } from '../../../Controllers/Requests/dbRequests';
import AWS from 'aws-sdk';
import { useDispatch } from 'react-redux';
import { getListings } from '../../../Controllers/Requests/dbRequests';
import { fetchListings } from '../../../Controllers/Redux/listingsSlice';
import { useNavigate } from 'react-router-dom';

window.Buffer = window.Buffer || require('buffer').Buffer;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// A custom button with MUI's styled utility for the upload button
const UploadButton = styled(Button)({
  marginTop: '8px',
  marginBottom: '16px',
});

// A custom button for the form submission
const SubmitButton = styled(Button)({
  marginTop: '16px',
  padding: '10px 0',
  borderRadius: '20px',
});

//Ref: https://stackoverflow.com/questions/71939930/how-to-upload-image-to-an-amazon-s3-bucket-using-react-js

const AddListingModal = ({ open, handleClose }) => {
  const [listingLocation, setListingLocation] = useState('Halifax');
  const [listingImage, setListingImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setListingLocation(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setListingImage(file);
  };

  const uploadFile = (event, fileName) => {
    event.preventDefault();

    const AWS = require('aws-sdk');

    AWS.config.update({
      accessKeyId: 'ASIA47CRZQGRRSEDBOGB',
      secretAccessKey: 'jlJarjUZ5kMbMrzh7615RvXv+twfMxxyGE8KsF7J',
      region: 'us-east-1',
      sessionToken:
        'IQoJb3JpZ2luX2VjEMn//////////wEaCXVzLXdlc3QtMiJHMEUCIG6Ceh/f2wNoKDrpONqqwAXrmyE9XygjsYHc0lfKAKa8AiEAv7AhYDEeYssKTEg5xbIGkQx+vp4Zq8nsluOdjzpneIIqsgII8v//////////ARAAGgw4OTEzNzcyNTQ4MTkiDE3dRF7PCrRa9+wphCqGAsZECC2JWsYzKXxT7H22fvJTqKN20DXO7aApRtTMf+5Ka1FqjFYhVjR48B7TMRetzCjTnBo8UOV03SCWXvYs/rdu9KqKL2wJ9ngB5YcczlEusaLGYHjNXdc16C6olqbZccmvq7WeDlWlU0CQWOpIHDXuJm06ugQia3x01gTQ6g8K8WkGP9LyWfnMw0KnMwU9DVKcUxGbHHjKSun8uiA0OdwOTZNpSvSd03oOYPIN/Mwcl9PIyPsKK8vNxHTi+deChltPtPo8FybsJIt1E6MmYzJ9Le/G/ZMvkUs0zoY0Xm4OpowUxV3ClUsbJMMcrF3y1y1lJOHMu8wWtFf/qX0dKsJN5RDw1LcwxLnQsAY6nQGWCh4E5n+mmRbhVCLJIbqaCbsjoQ8ILvNgQlmsiuuRwX6bQXnwLnwk6sRvX1Oqvy/ssMVTSZZzuh3c/gVjsQJxn4GH35t+jAuXEAevKLb3KseAY8BPUdOZdzmeX8qjYIFdbXnet6sK0jbtrxGtw1TIZpbtlZ+1Av6+5c5t/1i6HppAyME0sPvpiT7msOhTkU/OvNO8bltcUnnJbOk/',
    });

    const s3 = new AWS.S3({
      params: { Bucket: 'scotia-rentals-listings-bucket' },
      region: 'us-east-1',
    });

    const params = {
      Bucket: 'scotia-rentals-listings-bucket',
      Key: fileName + '.png',
      Body: listingImage,
      ContentType: 'image/png',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully:', data);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //uploadFile(event);

    //make post request
    const data = new FormData(event.currentTarget);
    //console.log(data);

    //AXIOS POST create new listing
    data.append('image', listingImage); // Assuming listingImage is the File object
    const listing_data = {
      name: data.get('name'),
      description: data.get('description'),
      amenities: data.get('amenities'),
      price: data.get('price'),
      location: listingLocation,
    };

    //get the listing's id which will be used to later fetch data from s3 bucket
    addListing(listing_data).then((response) => {
      //response == listing_id
      uploadFile(event, response);

      dispatch(fetchListings());
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
          align="center"
          fontSize="15"
        >
          Add a new Listing
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            id="name"
            fullWidth
            label="Listing Name"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Listing Description"
            margin="normal"
            name="description"
            id="description"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Listing Amenities"
            margin="normal"
            name="amenities"
            id="amenities"
          />
          <TextField
            fullWidth
            label="Listing Price"
            margin="normal"
            type="number"
            name="price"
            id="price"
          />

          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={listingLocation}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="halifax"
              control={<Radio />}
              label="Halifax"
            />
            <FormControlLabel value="truro" control={<Radio />} label="Truro" />
            <FormControlLabel
              value="dartmouth"
              control={<Radio />}
              label="Dartmouth"
            />
          </RadioGroup>

          <UploadButton
            variant="contained"
            component="label"
            style={{ marginTop: '2rem' }}
            sx={{ mt: 3, mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              name="image"
              id="image"
              onChange={handleFileChange}
            />
          </UploadButton>
          <SubmitButton
            fullWidth
            variant="contained"
            color="error"
            type="submit"
          >
            Add Listing
          </SubmitButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddListingModal;
