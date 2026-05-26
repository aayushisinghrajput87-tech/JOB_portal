import React,{useState} from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import {useDispatch} from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query,setQuery] = React.useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const searchJobHandler=()=>{
        dispatch(setSearchQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-6 my-14'>
                <span className='mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-pink-100 via-yellow-100 to-teal-100 text-[#F83002] font-semibold shadow-sm'>Gateway to your professional future</span>
                <h1 className='text-5xl md:text-6xl font-extrabold drop-shadow-lg text-gray-900'>
                    Search, <span className="text-teal-600">Apply</span> & <br/>
                    Get Your <span className='text-pink-600'>Dream Jobs</span>
                </h1>
                <p className='text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium'>
                    Discover your potential. Search thousands of openings from top-tier startups to Fortune 500 companies. Your dream job is waiting.
                </p>
                <div className='flex w-full max-w-xl shadow-xl border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white/80 backdrop-blur-sm'>
                    <input 
                        type="text" 
                        placeholder='Find your dream jobs' 
                        onChange={(e) => setQuery(e.target.value)} 
                        className='outline-none border-none w-full bg-transparent text-gray-800 placeholder-gray-400 py-3 px-2 text-lg'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-r-full bg-teal-500 hover:bg-pink-500 transition-colors text-white px-6 py-2 text-lg font-semibold shadow-md"
                    >
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection