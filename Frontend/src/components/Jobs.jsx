import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'

const jobArray = [1, 2, 3,4,5,6];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-8 px-6">
  <div className='flex gap-6'>

    {/* LEFT FILTER */}
    <aside className='w-[20%]'>
      <FilterCard />
    </aside>

    {/* RIGHT JOBS */}
    <main className='flex-1'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'>
        {
          jobArray.map((item, index) => (
            <Job key={index} />
          ))
        }
      </div>
    </main>

  </div>
</div>
</div>
  )
}

export default Jobs
