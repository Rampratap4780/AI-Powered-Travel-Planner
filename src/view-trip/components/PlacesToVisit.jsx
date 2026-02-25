import React from 'react';
import PlaceCarditem from './PlaceCarditem';
import { dummyTrip } from '@/constants/options';


function PlacesToVisit({ trip }) {
  trip = dummyTrip; // Use dummy data if no trip prop is passed

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index} className='my-5'>
            <h2 className='font-medium text-lg mb-3'>{item.days}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {item.plan.map((place, idx) => (
                <div className='border p-4 rounded-lg shadow-sm' key={idx}>
                  <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                  <PlaceCarditem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

