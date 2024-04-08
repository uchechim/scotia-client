import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../Components/Renter/Header';
import { Button, Grid } from '@material-ui/core';
import FavoritesListingCard from '../../Components/Renter/FavoritesListingCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesListings } from '../../../Controllers/Redux/favoritesListingsSlice';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoritesListingsData, setFavoritesListingsData] = useState([]);
  //What needs to be done here , is to use a useSelector to access the state of listings within the application, also need to modify code below to reflect that change.
  const favoritesListings = useSelector((state) => state.favoritesListings);

  useEffect(() => {
    dispatch(fetchFavoritesListings());
    setFavoritesListingsData(favoritesListings.favoritesListings);
  }, [favoritesListingsData]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2
          style={{
            fontSize: '35px',
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          My Favorites
        </h2>
      </div>
      <Grid container justifyContent="center" spacing={1}>
        {favoritesListingsData.length > 0 ? (
          favoritesListingsData.map((listingData, index) => {
            return (
              <Grid Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <FavoritesListingCard
                  listing_id={listingData.listing_id}
                  listing_img={listingData.listing_img}
                  listing_title={listingData.listing_title}
                  listing_description={listingData.listing_description}
                  listing_price={listingData.listing_price}
                  listing_amenities={listingData.listing_amenities}
                />
              </Grid>
            );
          })
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: '20vh',
            }}
          >
            <h3 style={{ fontSize: '3rem' }}>
              Seems Like You Have No Units Added to your Favorites
            </h3>
            <h3 style={{ fontSize: '2rem' }}>
              Click Below To Add a Listing to your Favorites
            </h3>
            <Button
              variant="contained"
              text=""
              style={{ backgroundColor: 'red', color: 'white', width: '200px' }}
              onClick={() => navigate('/listings')}
            >
              Add To Favorites
            </Button>
          </div>
        )}
      </Grid>
    </>
  );
};
export default Favorites;
