import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { deleteListing } from '../../../Controllers/Requests/dbRequests';
import { useNavigate } from 'react-router-dom';
import { fetchListings } from '../../../Controllers/Redux/listingsSlice';
import { useDispatch } from 'react-redux';

// Listing Card component
const ListingCard = ({
  listing_id,
  listing_img,
  listing_title,
  listing_description,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //remove listing then update state of store
  const handleRemove = async (listing_id) => {
    try {
      const res = await deleteListing(listing_id);
      console.log(res);
      dispatch(fetchListings());
    } catch (error) {
      console.error('Error in handleRemove:', error);
    }
  };
  return (
    <Card
      sx={{ maxWidth: 345, m: 2, backgroundColor: 'rgba(152, 152, 152, 0.29)' }}
      variant="contained"
    >
      <CardContent align="center">
        <img
          src={listing_img}
          alt="listing image"
          style={{ height: '200px', width: '290px', borderRadius: '2rem' }}
        />
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {listing_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {listing_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            backgroundColor: 'red', // Red background
            color: 'white', // White text
            '&:hover': {
              backgroundColor: 'darkred', // Darker red on hover
            },
            width: '100%', // Full width button
          }}
          onClick={() => handleRemove(listing_id)}
        >
          Remove Listing
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
