import axios from 'axios';

export const signUp = async (userData) => {
  const response = await axios
    .post(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/signup',
      userData
    )
    .then((response) => {
      if (response.status === 200) {
        alert('successfully signed up user');
      }
    })
    .catch((err) => {
      alert('A user with this Email address already exists.');
      console.log('There was an error signing up user, error: ' + err);
      return err;
    });
  //return response;
};

export const signIn = async (userData) => {
  const response = await axios
    .post(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/signin',
      userData
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

export const addListing = async (userData) => {
  const response = await axios
    .post(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/add-listing',
      userData
    )
    .then((response) => {
      const listing_id = response.data.listing[0];
      return listing_id;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

export const getListings = async () => {
  const data = [];
  const response = await axios.get(
    'http://scotia-rentals.us-east-1.elasticbeanstalk.com/get-listings'
  );

  const listings = response.data.listings;
  const listings_imgs = response.data.image_sources;

  for (const [i, element] of listings.entries()) {
    const listing_data = listings[i];
    const listing_id = listing_data[0];
    const listing_title = listing_data[1];
    const listing_description = listing_data[2];
    const listing_amenities = listing_data[3];
    const listing_price = listing_data[4];
    const listing_location = listing_data[5];

    const listing_image_key = listings_imgs[i]?.Key;

    const listing_img_url =
      'https://scotia-rentals-listings-bucket.s3.amazonaws.com/' +
      listing_image_key;

    var complete_data = {
      listing_id: listing_id,
      listing_title: listing_title,
      listing_description: listing_description,
      listing_amenities: listing_amenities,
      listing_price: listing_price,
      listing_location: listing_location,
      listing_img: listing_img_url,
    };

    data.push(complete_data);
  }

  return data;
};

export const deleteListing = async (listingId) => {
  try {
    const response = await axios.delete(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/delete-listing',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          listing_id: listingId,
        },
      }
    );
    return response;
  } catch (error) {
    console.log('Error deleting the listing:', error.response);
    throw error;
  }
};

export const addListingToFavorites = async (listingData) => {
  const response = await axios
    .post(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/add-listing-to-favorites',
      listingData
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log('error adding to favorites ', err);
    });

  return response;
};

export const deleteListingFromFavorites = async (listingId) => {
  try {
    const response = await axios.delete(
      'http://scotia-rentals.us-east-1.elasticbeanstalk.com/delete-listing-from-favorites',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          listing_id: listingId,
        },
      }
    );
    return response;
  } catch (error) {
    console.log('Error deleting the listing:', error.response);
    throw error;
  }
};

export const getFavoritesListings = async () => {
  const data = [];
  const response = await axios.get(
    'http://scotia-rentals.us-east-1.elasticbeanstalk.com/get-favorites-listings'
  );

  const favoriteListings = response.data.listings;
  const listings_imgs = response.data.image_sources;

  for (const [i, element] of favoriteListings.entries()) {
    const favorites_listing_data = favoriteListings[i];
    const listing_id = favorites_listing_data[0];
    const listing_title = favorites_listing_data[1];
    const listing_description = favorites_listing_data[2];

    const listing_image_key = listings_imgs[i]?.Key;

    const listing_img_url =
      'https://scotia-rentals-listings-bucket.s3.amazonaws.com/' +
      listing_image_key;

    var complete_data = {
      listing_id: listing_id,
      listing_title: listing_title,
      listing_description: listing_description,
      listing_img: listing_img_url,
    };

    data.push(complete_data);
  }

  return data;
};
