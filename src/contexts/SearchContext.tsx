import React, { useCallback, useContext, useState } from 'react'

type SearchContext = {
  destination: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  hotelId: string
  starRating: string[]
  hotelType: string[]
  facilitiesType: string[]
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => void;

  saveStarRating: (starRating: string[]) => void;
  saveHotelType: (hotelType: string[]) => void;
  saveFacilitiesType: (hotelType: string[]) => void;
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined)

type SearchContextProviderProps = {
  children: React.ReactNode
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem('destination') || '',
  )
  
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()),
  )
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()),
  )

  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('adultCount') || '1'),
  )
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('childCount') || '1'),
  )
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem('hotelID') || '',
  )


const [starRating, setStarRating] = useState<string[]>(()=>{
  const savedRating = sessionStorage.getItem('starRating');
return savedRating? JSON.parse(savedRating) : []
})

const [hotelType, setHotelType] = useState<string[]>(()=>{
  const savedHotelType = sessionStorage.getItem('hotelType');
  return savedHotelType ? JSON.parse(savedHotelType) : []
})


const [facilitiesType, setFacilities] = useState<string[]>(()=>{
  const savedFacilitiesType = sessionStorage.getItem('facilitiesType');
  return savedFacilitiesType ? JSON.parse(savedFacilitiesType) : []
})



  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string,
  ) => {
    setDestination(destination)
    setCheckIn(checkIn)
    setCheckOut(checkOut)
    setAdultCount(adultCount)
    setChildCount(childCount)
    if (hotelId) {
      setHotelId(hotelId)
    }

    sessionStorage.setItem('destination', destination)
    sessionStorage.setItem('checkIn', checkIn.toISOString())
    sessionStorage.setItem('checkOut', checkOut.toISOString())
    sessionStorage.setItem('adultCount', adultCount.toString())
    sessionStorage.setItem('childCount', childCount.toString())
    if (hotelId) {
      sessionStorage.setItem('hotelId', hotelId)
    }
  }


     const saveStarRating = useCallback((starRatings: string[])=>{
         setStarRating(starRatings)
          sessionStorage.setItem('starRating', JSON.stringify(starRatings))
    }, [setStarRating])

    const saveHotelType = useCallback((hotel: string[])=>{
      setHotelType(hotel)
      sessionStorage.setItem('hotelType', JSON.stringify(hotel))
    }, [setHotelType])

    const saveFacilitiesType = useCallback((facilitiesType: string[])=>{
      setFacilities(facilitiesType)
      sessionStorage.setItem('facilitiesType', JSON.stringify(facilitiesType))
    },[setFacilities])


  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        starRating,
        hotelType,
        facilitiesType,
        saveSearchValues,
        saveStarRating,
        saveHotelType,
        saveFacilitiesType
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  return context as SearchContext
}
