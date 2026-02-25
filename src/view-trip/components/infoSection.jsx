import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { dummyTrip1 } from '@/constants/options';
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({ trip = dummyTrip1 }) {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSection?.location?.label
      };
      const result = await GetPlaceDetails(data); // Passed data as an argument
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Failed to fetch place photo", error);
    }
  };

  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsiAq-KRvqIB-qfGEuol0V_vUdedYtDUgNKvino6Puc2Ntuczwrr6YgG1fepB3a_KB8Go&usqp=CAU"
        className='h-[340px] w-full object-cover rounded-xl'
        alt="Trip"
      />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md'>
              📅 {trip?.userSection?.noOfDays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md'>
              💰 {trip?.userSection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-800 text-xs md:text-md'>
              🍷 No. of Travelers: {trip?.userSection?.traveler}
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
