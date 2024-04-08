import { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Header from '../../Components/Landlord/Header';
import AddListingsModal from '../../Components/Modals/AddListingModal';

import { useSelector } from 'react-redux';
import ListingCard from '../../Components/Landlord/ListingCard';

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '35px' }}>My Listings</h2>
      </div>
      <Grid container justifyContent="center" spacing={1}>
        {landLordListingData.length > 0 ? (
          landLordListingData.map((listingData, index) => {
            return (
              <Grid Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ListingCard
                  listing_img={listingData.listing_img}
                  listing_title={listingData.listing_title}
                  listing_description={listingData.listing_description}
                  listing_id={listingData.listing_id}
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
              Seems Like You Have No Rental Units Listed
            </h3>
            <h3 style={{ fontSize: '2rem' }}>
              Click Below To Add a New Listing
            </h3>
            <Button
              variant="contained"
              text=""
              style={{ backgroundColor: 'red', color: 'white', width: '200px' }}
              onClick={handleModalOpen}
            >
              Add New Listing
            </Button>
            <AddListingsModal open={modalOpen} handleClose={handleModalClose} />
          </div>
        )}
      </Grid>
    </>
  );
};
export default MyListings;
