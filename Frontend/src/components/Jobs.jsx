import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs';

const jobsArray=[1,2,3,4,5,6,7,8];

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

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
          allJobs.length <= 0 ? (
            <span>No Jobs Available</span>
          ) : (
            allJobs.map((job) => (
              <Job key={job?._id} job={job} />
            ))
          )
        }
      </div>
    </main>

  </div>
</div>
</div>
  )
}

export default Jobs
