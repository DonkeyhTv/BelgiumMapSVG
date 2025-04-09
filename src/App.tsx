import './App.css'
import { useState, useEffect } from 'react'
import Map from './components/Map'

function App() {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])

  useEffect(() => {
    const storedProvinces = JSON.parse(
      localStorage.getItem('selectedProvinces') || '[]',
    )
    setSelectedProvinces(storedProvinces)
  }, [])

  useEffect(() => {
    if (selectedProvinces.length > 0) {
      localStorage.setItem(
        'selectedProvinces',
        JSON.stringify(selectedProvinces),
      )
    }
  }, [selectedProvinces])

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 overflow-hidden'>
      <h1 className='text-2xl sm:text-3xl font-bold text-center text-red-600 mb-4'>
        Belgium Map Selector
        <span className='block text-sm font-medium text-gray-500 mt-1'>
          by Steve Amissi
        </span>
      </h1>
      <p className='text-center text-sm sm:text-base text-gray-700 max-w-3xl mx-auto mb-4'>
        A dynamic map selector built with React, TypeScript, and Tailwind CSS.
        Users can select provinces on an interactive SVG map. Data is stored
        using LocalStorage for persistence across sessions.
      </p>
      <div className='w-full max-w-4xl bg-white rounded-2xl shadow-md p-4 sm:p-6 box-border overflow-hidden'>
        <div className='relative w-full max-h-[60vh]'>
          <Map
            selectedProvinces={selectedProvinces}
            setSelectedProvinces={setSelectedProvinces}
          />
        </div>

        <div className='mt-4 text-center text-base font-medium text-gray-800 px-2'>
          {selectedProvinces.length > 0 ? (
            <p className='break-words'>
              Province sélectionnée :{' '}
              <span className='text-red-500 font-semibold'>
                {selectedProvinces
                  .map(
                    province =>
                      province.charAt(0).toUpperCase() + province.slice(1),
                  )
                  .join(', ')}
              </span>
            </p>
          ) : (
            <p className='text-gray-500'>Aucune province sélectionnée</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
