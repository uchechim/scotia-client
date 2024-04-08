import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Renter/Header';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const ViewListing = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const listing_data = location.state.listing_data;
  const amenities = location.state.listing_data['listing_amenities'].split(',');

  return (
    <>
      <Header />
      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          borderRadius: '16px',
          overflow: 'hidden',
          marginTop: '50px',
        }}
      >
        <img
          src={listing_data.listing_img} // Replace with the path to your image
          alt="imgpic"
          style={{ width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            {listing_data.listing_title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            marginBottom={2}
            textAlign="center"
          >
            {listing_data.listing_description}
          </Typography>

          <List dense>
            <Typography variant="body2" color="text.secondary" marginBottom={2}>
              Amenities
            </Typography>
            {amenities.map((amenity, index) => (
              <ListItem key={index}>
                <Typography variant="body2">{amenity}</Typography>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="body2"
            color="text.secondary"
            marginBottom={2}
            textAlign="center"
            fontSize={20}
            fontWeight={800}
          >
            Price: {listing_data.listing_price}
          </Typography>
        </CardContent>
        <CardActions>
          <CustomButton fullWidth onClick={() => navigate('/listings')}>
            Back to Listings
          </CustomButton>
        </CardActions>
      </Card>
    </>
  );
};
export default ViewListing;
