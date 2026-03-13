import React from 'react'
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchQuery } from '../redux/jobSlice';
import { motion } from 'framer-motion';

//const jobsArray=[1,2,3,4,5,6,7,8];

const Jobs = () => {
  useGetAllJobs();
  const { allJobs,searchedQuery } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = React.useState(allJobs);

  React.useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          (job.title?.toLowerCase() || "").includes(searchedQuery.toLowerCase()) ||
          (job.description?.toLowerCase() || "").includes(searchedQuery.toLowerCase()) ||
          (job.location?.toLowerCase() || "").includes(searchedQuery.toLowerCase()) ||
          (job.salary?.toString().toLowerCase() || "").includes(searchedQuery.toLowerCase())
        );
      });
      setFilteredJobs(filteredJobs);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [searchedQuery, allJobs]);

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
          filteredJobs.length <= 0 ? (
            <span>No Jobs Available</span>
          ) : (
            filteredJobs.map((job) => (
              <motion.div 
              key={job?._id}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}>
              <Job key={job?._id} job={job} />
              </motion.div>
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
