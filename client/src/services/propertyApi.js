const RAPID_API_KEY = '4885948156mshc2edeb2411cc080p145767jsnf648def0ed12'; // Your actual API key

export async function getProperties(city, state) {
  const url = `https://us-real-estate-listings.p.rapidapi.com/for-rent?location=${encodeURIComponent(city)},%20${state}&offset=0&limit=50&days_on=1`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': 'us-real-estate-listings.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const result = await response.json();
    const listings = result.listings; // Assuming the API response includes a `listings` property

    // Fetch photos for each property
    const propertiesWithPhotos = await Promise.all(listings.map(async (property) => {
      const photoResponse = await fetch(`https://us-real-estate-listings.p.rapidapi.com/propertyPhotos?id=${property.property_id}`, options);
      if (!photoResponse.ok) {
        console.error(`Error fetching photos for property ID ${property.property_id}: ${photoResponse.status}`);
        return { ...property, photos: [] }; // Return the property with empty photos array if fetch fails
      }
      const photoResult = await photoResponse.json();
      return { ...property, photos: photoResult.photos }; // Add photos to the property object
    }));

    return propertiesWithPhotos; // Return the properties with photos
  } catch (error) {
    console.error('Error fetching properties:', error);
    return []; // Return an empty array in case of error
  }
}
