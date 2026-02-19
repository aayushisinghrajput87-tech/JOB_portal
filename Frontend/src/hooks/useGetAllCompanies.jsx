import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {setCompanies} from '@/redux/companySlice';
import { setSingleCompany } from '@/redux/companySlice';

const useGetAllCompanies=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchCompanies=async()=>{
            try{
                console.log("Fetching all companies");
                const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log("API Response:", res.data);
                if(res.data.success){
                    console.log("Companies fetched:", res.data.companies);
                    dispatch(setCompanies(res.data.companies));
                }
            }catch(error){
                console.error("Error fetching companies:", error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies