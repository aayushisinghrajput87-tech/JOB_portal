import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import {useEffect} from "react";
import {useDispatch} from "react-redux"
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAppliedJobs=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs=async()=>{
            try{
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log("Applied Jobs:", res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            }catch(error){
                console.error("Error fetching applied jobs:", error);
            }
        }
        fetchAppliedJobs();
    },[])
};

export default useGetAppliedJobs