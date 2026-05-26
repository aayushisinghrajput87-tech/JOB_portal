import React from 'react'
import Navbar from '../shared/Navbar'
import {Input} from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate=()=>{
    const navigate=useNavigate();
    const [companyName, setCompanyName] = React.useState("");
    const dispatch=useDispatch();
    const registerNewCompany=async()=>{
        try{
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{ companyName: companyName },{headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId=res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
        }
        
        }catch(err){
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed to register company");
        }
    }
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 via-blue-300 to-blue-300 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 mx-4 mt-10 mb-16 border border-gray-200">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg">Your Company Name</h1>
                        <p className="text-lg text-gray-500">What would you like to give your company name? <span className="text-gray-400">You can change this later.</span></p>
                    </div>
                    <div className="mb-8">
                        <Label htmlFor="companyName" className="text-lg font-semibold text-gray-700">Company Name</Label>
                        <Input 
                            id="companyName" 
                            placeholder="Enter company name" 
                            className="mt-2 px-4 py-3 w-full rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 text-lg shadow-sm transition-all duration-200"
                            onChange={(e)=>setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button 
                            className="px-6 py-2 rounded-xl text-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-150 shadow text-white"
                            variant="outline" 
                            onClick={()=>navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="px-6 py-2 rounded-xl text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 shadow-lg transition-all duration-150"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate