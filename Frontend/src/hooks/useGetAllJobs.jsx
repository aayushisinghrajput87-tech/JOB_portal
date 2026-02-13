import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setAllJobs} from '@/redux/jobSlice';

const useGetAllJobs=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllJobs=async()=>{
            try{
                console.log("Fetching jobs from:", `${JOB_API_END_POINT}/get`);
                const res=await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
                console.log("API Response:", res.data);
                if(res.data.success){
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setAllJobs(res.data.jobs));
                }
            }catch(error){
                console.error("Error fetching jobs:", error);
            }
        }
        fetchAllJobs();
    },[dispatch])
}

export default useGetAllJobs