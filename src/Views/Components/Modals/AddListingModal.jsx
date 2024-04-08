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
      accessKeyId: 'ASIA47CRZQGRXASSCNHM',
      secretAccessKey: 'EreVeDL+kzSTOYlFkkU3oW7sLxVDJDGKqh5/pg8k',
      region: 'us-east-1',
      sessionToken:
        'IQoJb3JpZ2luX2VjEKP//////////wEaCXVzLXdlc3QtMiJHMEUCIQC+yliypSganiaXOtMG/kEf/SPH1Der43c3YSecOYh2nAIgDNmzVZohFttFfzVmO0Dna38bwnmAodJdKE3HHCyUgXcqsgIIzP//////////ARAAGgw4OTEzNzcyNTQ4MTkiDJU9xOPVF2pHt+dkvCqGAmLA78q1OqZQpf+DmRpv8Efa/adnrVHkxlFukHH6OmKvargo7aiWi5yHMKCGxlbDR2RBqbWrH9Ig58tOOlzP4CTEfjNUNSf1jJtvC54UISJ6u3N1OqW3E7SsourCZOuAu/S9dJ4BMjFAxZm7/7EuuI67ve7k8Ry1949fO2vxes2B91/i0Fc6ci0Z8qoaJOXdZwCLvScZ7+aeBCeOWAWJ1IOuAX/FX7cmCNzNhTk8fyg4KbuYmBidgsvvspAd2cRHDyIKtyaXkUJAhxEpLAmqcLZHlR1bOZQuizBawi+4OcWp7ZjtFNOoyHmp/veu6xcond6JBwolutG49K2m6AnSyuKCt+X9jWown4jIsAY6nQGNo1q1BiqOgvXnsCysnm9r3+Y3hYOjgVqvfTUGTqobrLYRrhvzUgY2jXaXP6RG9zzyqY6Zicvzjh/TXlmtxoF46N6FcP/75jDmfdseQ6Rii2LjqvoRTnUzS9QTd480SCTsjfwJfTJXmlOWzgJWOoRg+YZ16pN3XzHXOc9cZPisggkC6sHTwgBn0XUZFkXqNsa29IL+o1NNUKreOYwN',
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
