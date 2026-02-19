import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setAllJobs} from '@/redux/jobSlice';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById=(companyId)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async()=>{
            try{
                console.log("Fetching company by ID:", companyId);
                const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                console.log("API Response:", res.data);
                if(res.data.success){
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setSingleCompany(res.data.company));
                }
            }catch(error){
                console.error("Error fetching jobs:", error);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
}

export default useGetCompanyById