import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useNavigate, useParams } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';


const CompanySetup = () => {
   const params=useParams();
   useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany}=useSelector(store=>store.company);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler=(e)=>{
        const file=e.target.files?.[0];
        setInput({...input,file});
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",input.name);
        formData.append("description",input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        if(input.file){
          formData.append("file",input.file);  
        }
        try{
            setLoading(true);
            const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
            }catch(error){
                console.log(error);
                toast.error(error.response.data.message);
            }finally{
                setLoading(false);
            }
    }

    useEffect(()=>{
        // guard against null singleCompany to avoid runtime errors
        if(!singleCompany){
            setInput({
                name: "",
                description: "",
                website: "",
                location: "",
                file: null
            });
            return;
        }

        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
                <form onSubmit={submitHandler} className='bg-white rounded-lg shadow-sm p-8'>
                    {/* Header Section */}
                    <div className='flex items-center gap-4 mb-8 pb-6 border-b border-gray-200'>
                        <div onClick={()=>navigate("/admin/companies")} className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition'>
                            <ArrowLeft className='w-5 h-5 text-gray-600' />
                            <span className='text-gray-600 text-sm font-medium'>Back</span>
                        </div>
                        <h1 className='font-bold text-2xl text-gray-900'>Company Setup</h1>
                    </div>

                    {/* Company Name and Description */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                        <div className='space-y-2'>
                            <Label htmlFor="companyName" className='font-semibold text-gray-700'>Company Name</Label>
                            <Input 
                                id="companyName"
                                type="text" 
                                name="name" 
                                value={input.name} 
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                className='h-10'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="companyDescription" className='font-semibold text-gray-700'>Company Description</Label>
                            <Input 
                                id="companyDescription"
                                type="text" 
                                name="description" 
                                value={input.description} 
                                onChange={changeEventHandler}
                                placeholder="Enter company description"
                                className='h-10'
                            />
                        </div>
                    </div>

                    {/* Website and Location */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                        <div className='space-y-2'>
                            <Label htmlFor="companyWebsite" className='font-semibold text-gray-700'>Company Website</Label>
                            <Input 
                                id="companyWebsite"
                                type="text" 
                                name="website" 
                                value={input.website} 
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                                className='h-10'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="companyLocation" className='font-semibold text-gray-700'>Company Location</Label>
                            <Input 
                                id="companyLocation"
                                type="text" 
                                name="location" 
                                value={input.location} 
                                onChange={changeEventHandler}
                                placeholder="Enter location"
                                className='h-10'
                            />
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className='mb-8 space-y-2'>
                        <Label htmlFor="companyLogo" className='font-semibold text-gray-700'>Company Logo</Label>
                        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition cursor-pointer'>
                            <Input 
                                id="companyLogo"
                                type="file" 
                                accept="image/*" 
                                onChange={changeFileHandler}
                                className='cursor-pointer'
                            />
                            <p className='text-xs text-gray-500 mt-2'>Upload a logo image (PNG, JPG, etc.)</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button disabled type="submit" className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 transition-colors font-semibold">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 transition-colors font-semibold">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup;