import React,{useEffect} from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useSelector,useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

//const randomJobs=[1,2,3,4,5,6];

const Browse=()=>{
    useGetAllJobs();
    const {allJobs}=useSelector(store=>store.job);
    const dispatch=useDispatch();
        useEffect(()=>{
            return ()=>{
            dispatch(setSearchQuery(""));
            }
        }
        ,[])
    return (
         <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50">
            <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs.map((job,index)=>{
                            return (
                                <Job key={index} job={job}/>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Browse;