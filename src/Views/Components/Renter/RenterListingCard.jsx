import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { addListingToFavorites } from '../../../Controllers/Requests/dbRequests';
import { fetchFavoritesListings } from '../../../Controllers/Redux/favoritesListingsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Listing Card component
const RenterListingCard = ({
  listing_id,
  listing_img,
  listing_title,
  listing_description,
  listing_location,
  listing_amenities,
  listing_price,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle adding listing to favorites
  const handleAddToFavorite = (
    listing_id,
    listing_title,
    listing_description
  ) => {
    try {
      //fill in
      const data = {
        listing_id: listing_id,
        listing_title: listing_title,
        listing_description: listing_description,
      };
      addListingToFavorites(data);

      alert('Successfully added listing to favorites');
      //navigate('/favorites');
      dispatch(fetchFavoritesListings());
    } catch (error) {
      console.error('Error in addToFavorite:', error);
    }
  };

  //handle adding listing to favorites
  const handleViewListing = (
    listing_id,
    listing_title,
    listing_description,
    listing_amenities,
    listing_price
  ) => {
    try {
      const data = {
        listing_id: listing_id,
        listing_title: listing_title,
        listing_description: listing_description,
        listing_amenities: listing_amenities,
        listing_price: listing_price,
        listing_img: listing_img,
      };
      //navigate to viewlisting and pass the current listing's data as state
      navigate('/viewlisting', { state: { listing_data: data } });
    } catch (error) {
      console.error('Error in viewListing:', error);
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
          alt="listing pic"
          style={{ height: '200px', width: '290px', borderRadius: '2rem' }}
        />
        <Typography gutterBottom variant="h5" component="h2" align="center">
          {listing_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {listing_description}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={800}
          style={{ marginTop: '10px' }}
        >
          Located In: {listing_location.toUpperCase()}
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
          onClick={() =>
            handleViewListing(
              listing_id,
              listing_title,
              listing_description,
              listing_amenities,
              listing_price
            )
          }
        >
          View Listing
        </Button>

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
          onClick={() =>
            handleAddToFavorite(listing_id, listing_title, listing_description)
          }
        >
          Add to Favorites
        </Button>
      </CardActions>
    </Card>
  );
};

export default RenterListingCard;
