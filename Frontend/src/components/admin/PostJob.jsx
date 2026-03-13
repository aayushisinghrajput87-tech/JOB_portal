import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { NativeSelect, NativeSelectOptGroup ,NativeSelectOption} from '../ui/native-select'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const companyArray=[];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const {companies}=useSelector(store=>store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler=(value)=>{
      const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value);
      setInput({...input,companyId:selectedCompany._id});
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        // Highlighted: Validate and convert salary before sending
        const salaryNum = Number(input.salary);
        if (isNaN(salaryNum)) {
            toast.error("Salary must be a valid number");
            return;
        }
        try{
            setLoading(true);
            const res=await axios.post(`${JOB_API_END_POINT}/post`, { ...input, salary: salaryNum }, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        }catch(error){
          toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form  onSubmit={submitHandler} action="" className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Salary</Label>
                        <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Location</Label>
                        <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Job Type</Label>
                        <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    <div>
                        <Label>No of Position</Label>
                        <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                    </div>
                    {
                        companies.length > 0 && (
                            <div>
                                <Label htmlFor="companyId">Company</Label>
                                <NativeSelect
                                    id="companyId"
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={changeEventHandler}
                                >
                                    {/*<NativeSelectOption onValueChange={selectChangeHandler}>Select a Company</NativeSelectOption>*/}
                                     <NativeSelectOption value="">Select a Company</NativeSelectOption>
                                    {companies.map(company => (
                                        <NativeSelectOption key={company._id} value={company._id}>
                                            {company.name}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>
                        )
                    }
                    
                </div>
                {/*<Button className="w-full mt-4">Post New Job</Button>*/}
                {loading ? (
                        <Button disabled type="submit" className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 transition-colors font-semibold">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 transition-colors font-semibold">
                         Post New Job
                        </Button>
                    )}
                {
                    companies.length===0 && <p className='text-xs text-red-600 font-bold text-center my-3'>* please register a company first,before posting a job</p>
                }
                </form>

            </div>
        </div>
    )
}

export default PostJob