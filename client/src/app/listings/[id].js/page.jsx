
export async function getServerSideProps({ params }) {
  try {
    const response = await getListing(params.id);
    console.log('Listing data:', response.data); 
    return {
      props: {
        listing: response.data, 
      },
    };
  } catch (error) {
    console.error('Error fetching listing details:', error);
    return {
      notFound: true, 
    };
  }
}
