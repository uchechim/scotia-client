import { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Header from '../../Components/Renter/Header';
import AddListingsModal from '../../Components/Modals/AddListingModal';
import { useSelector } from 'react-redux';
import RenterListingCard from '../../Components/Renter/RenterListingCard';
const MyListings = () => {
  const [landLordListingData, setLandLordListingData] = useState([]);
  //What needs to be done here , is to use a useSelector to access the state of listings within the application, also need to modify code below to reflect that change.
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const propertyListings = useSelector((state) => state.propertyListings);

  useEffect(() => {
    setLandLordListingData(propertyListings.propertyListings);
  }, [propertyListings]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2
          style={{
            fontSize: '35px',
            margin: 'auto',
            margin: 'auto',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Available Listings
        </h2>
        {/*<button style={{ fontSize: '35px' }}>filter</button>*/}
      </div>
      <Grid container justifyContent="center" spacing={1}>
        {landLordListingData.length > 0 ? (
          landLordListingData.map((listingData, index) => {
            return (
              <Grid Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <RenterListingCard
                  listing_id={listingData.listing_id}
                  listing_img={listingData.listing_img}
                  listing_title={listingData.listing_title}
                  listing_description={listingData.listing_description}
                  listing_location={listingData.listing_location}
                  listing_amenities={listingData.listing_amenities}
                  listing_price={listingData.listing_price}
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
              Seems Like There Are No Available Listings.
            </h3>
            <h3 style={{ fontSize: '2rem' }}>
              Please Wait Until a Landlord Posts a Listing
            </h3>
          </div>
        )}
      </Grid>
    </>
  );
};
export default MyListings;
