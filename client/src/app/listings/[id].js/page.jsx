// pages/listings/[id].js
import ListingDetails from "@/components/ListingDetails"; 
import { getListing } from '@/lib/api';

export async function getServerSideProps({ params }) {
  try {
    const response = await getListing(params.id);
    return {
      props: {
        listing: response.data, // Pass the listing data to the component
      },
    };
  } catch (error) {
    console.error('Error fetching listing details:', error);
    return {
      notFound: true, // Return 404 page if the listing is not found
    };
  }
}

export default function ListingDetailsPage({ listing }) {
  return <ListingDetails listing={listing} />;
}
