import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
//import useGetSingleJob from '@/hooks/useGetSingleJob';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const {singleJob}=useSelector(store=>store.job);
  const params=useParams();
  const jobId=params.id;
  const {user}=useSelector(store=>store.auth);
  const isApplied =singleJob?.applications?.some(application=>application.applicant===user?._id) || false;
  const dispatch=useDispatch();
  const applyJobHandler=async()=>{
    try{
      const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      console.log(res.data);
      if(res.data.success){
        toast.success(res.data.message);
      }
    }catch(error){
     console.log(error);
     toast.error(error.response.data.message);
    }
  }

   useEffect(()=>{
        const fetchSingleJob=async()=>{
            try{
                console.log("Fetching jobs from:", `${JOB_API_END_POINT}/get`);
                const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                console.log("API Response:", res.data);
                if(res.data.success){
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setSingleJob(res.data.job));
                }
            }catch(error){
                console.error("Error fetching jobs:", error);
            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id]);



  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-6 rounded-2xl border">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold">{singleJob?.title}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="ghost" className="text-blue-700 text-sm font-medium">
              {singleJob?.positions} Positions
            </Badge>
            <Badge variant="ghost" className="text-red-600 text-sm font-medium">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-indigo-600 text-sm font-medium">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        <Button onClick={isApplied?null:applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-5 ${
            isApplied
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* DIVIDER */}
      <h2 className="mt-8 border-b pb-3 text-lg font-medium">
        Job Description
      </h2>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p><span className="font-semibold">Role:</span>{singleJob?.title}</p>
        <p><span className="font-semibold">Location:</span>{singleJob?.location}</p>
        <p><span className="font-semibold">Experience:</span>{singleJob?.experience} years</p>
        <p><span className="font-semibold">Salary:</span>{singleJob?.salary}LPA</p>
        <p><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length}</p>
        <p><span className="font-semibold">Posted Date:</span>{singleJob?.createdAt.split('T')[0]}</p>

        <p className="pt-2">
          <span className="font-semibold">Description:</span>{' '}
           {singleJob?.description}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;