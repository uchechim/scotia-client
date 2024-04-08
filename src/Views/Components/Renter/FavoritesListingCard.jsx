import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { deleteListingFromFavorites } from '../../../Controllers/Requests/dbRequests';
import { useNavigate } from 'react-router-dom';
import { fetchFavoritesListings } from '../../../Controllers/Redux/favoritesListingsSlice';
import { useDispatch } from 'react-redux';

// Listing Card component
const FavoritesListingCard = ({
  listing_id,
  listing_img,
  listing_title,
  listing_description,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //remove listing then update state of store
  const handleRemove = async (listing_id) => {
    try {
      const res = await deleteListingFromFavorites(listing_id);
      dispatch(fetchFavoritesListings());
      alert('Successfully removed from favorites');
      navigate('/listings');
      console.log(res);
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
          alt="listing pic"
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
          Remove From Favorites
        </Button>
      </CardActions>
    </Card>
  );
};

export default FavoritesListingCard;
