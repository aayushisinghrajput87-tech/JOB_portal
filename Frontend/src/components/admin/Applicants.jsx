import React,{useEffect} from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // <-- highlight: add useSelector
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants=()=>{
    const params=useParams();
    const dispatch=useDispatch();
    // Get applicants from redux
    const applicants = useSelector(store => store.application?.applicants || []);
    useEffect(()=>{
        const fetchAllApplicants=async()=>{
            try{
                const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                    withCredentials:true
                });
                // Use applicants array from backend response
                const apps = res.data?.applicants || [];
                dispatch(setAllApplicants(apps));
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllApplicants();
    },[params.id, dispatch]);
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 flex flex-col">
            <Navbar/>
            <div className='flex-1 flex flex-col items-center justify-start'>
                <div className='w-full max-w-7xl mt-8'>
                    <h1 className='font-extrabold text-3xl md:text-4xl my-8 text-gray-900'>Applicants {applicants.length || 0}</h1>
                    <ApplicantsTable applicants={applicants}/>
                </div>
            </div>
        </div>
    )
}

export default Applicants