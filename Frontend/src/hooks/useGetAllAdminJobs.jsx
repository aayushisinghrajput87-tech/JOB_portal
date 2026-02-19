import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setAllJobs,setAllAdminJobs} from '@/redux/jobSlice';

const useGetAllAdminJobs=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs=async()=>{
            try{
                console.log("Fetching jobs from:", `${JOB_API_END_POINT}/getadminjobs`);
                const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                console.log("API Response:", res.data);
                if(res.data.success){
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            }catch(error){
                console.error("Error fetching jobs:", error);
            }
        }
        fetchAllAdminJobs();
    },[dispatch])
}

export default useGetAllAdminJobs