import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { USER_API_END_POINT } from "../../utils/constant"
import { toast } from 'react-toastify';
import { useDispatch, useSelector} from 'react-redux'
import {Loader2} from "lucide-react"
import {setLoading} from '../../redux/authSlice'
import { useEffect } from 'react';

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                withCredentials: true,
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
            if(user){
                navigate("/");
            }
        },[])

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50">
            <Navbar />
            <div className='flex items-center justify-center min-h-[80vh]'>
                <form onSubmit={submitHandler} className='w-full max-w-lg bg-white/90 border border-gray-200 rounded-2xl shadow-xl p-8 my-10'>
                    <h1 className='font-extrabold text-3xl mb-7 text-gray-900 text-center tracking-tight drop-shadow'>Sign Up</h1>
                    <div className='my-4'>
                        <Label className="text-base font-semibold">Full Name</Label>
                        <Input type="text" placeholder="Aayushi Singh" value={input.fullname} name="fullname" onChange={changeEventHandler} className="mt-1 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div className='my-4'>
                        <Label className="text-base font-semibold">Email</Label>
                        <Input type="email" placeholder="aayushi34@gmail.com" value={input.email} name="email" onChange={changeEventHandler} className="mt-1 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div className='my-4'>
                        <Label className="text-base font-semibold">Phone Number</Label>
                        <Input type="number" placeholder="91+" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="mt-1 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div className='my-4'>
                        <Label className="text-base font-semibold">Password</Label>
                        <Input type="password" placeholder="****" value={input.password} name="password" onChange={changeEventHandler} className="mt-1 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <RadioGroup className="flex items-center gap-8 my-3">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role == 'student'} onChange={changeEventHandler} className="cursor-pointer accent-indigo-500" />
                                <Label htmlFor="r1" className="text-base">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role == 'recruiter'} onChange={changeEventHandler} className="cursor-pointer accent-pink-500" />
                                <Label htmlFor="r2" className="text-base">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label className="text-base font-semibold">Profile</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-300" />
                        </div>
                    </div>
                    {
                        loading ?
                        <Button className="w-full my-4 bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-bold shadow-md" disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                        :
                        <Button type="submit" className="w-full my-4 bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-bold shadow-md hover:from-pink-400 hover:to-indigo-500 border-0">
                            signUp
                        </Button>
                    }
                    <span className='text-sm block text-center mt-2'> Already have an account? <Link to="/login" className='text-indigo-600 font-semibold hover:underline'>login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup