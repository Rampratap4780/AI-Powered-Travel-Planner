import { dummyTrip1 } from '@/constants/options';
import React from 'react';
import { Link } from 'react-router-dom';

// const dummyTripData = {
//   tripData: {
//     hotels: [
//       {
//         hotelName: "The Grand Hotel",
//         hotelAddress: "123 Main Street, Cityville",
//         price: "$200 per night",
//         rating: "4.5",
//         imageUrl: "/a2.jpg"
//       },
//       {
//         hotelName: "Oceanview Resort",
//         hotelAddress: "456 Beach Avenue, Seaside",
//         price: "$300 per night",
//         rating: "4.7",
//         imageUrl: "/a2.jpg"
//       },
//       {
//         hotelName: "Mountain Lodge",
//         hotelAddress: "789 Hilltop Road, Mountainview",
//         price: "$150 per night",
//         rating: "4.3",
//         imageUrl: "/a2.jpg"
//       },
//       {
//         hotelName: "City Center Inn",
//         hotelAddress: "321 Urban Drive, Metropolis",
//         price: "$180 per night",
//         rating: "4.4",
//         imageUrl: "/a2.jpg"
//       }
//     ]
//   }
// };

function Hotels() {
  const trip = dummyTrip1;

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=` + hotel?.hotelName + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer'>
              <img src={hotel.imageUrl} className='rounded-xl h-[200px] w-full object-cover' alt={hotel.hotelName} />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>{hotel?.hotelAddress}</h2>
                <h2 className='text-sm'>💰 {hotel?.price}</h2>
                <h2 className='text-sm'>★ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;


