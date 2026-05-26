import { Badge } from "./ui/badge";
import React  from "react";
import { useNavigate } from "react-router-dom";
    
const LatestJobCards=({job})=>{
    const navigate=useNavigate();
    return (
        <div 
            className="p-6 rounded-xl shadow-xl bg-gradient-to-br from-teal-50 via-pink-50 to-yellow-50 border border-gray-100 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-teal-300 duration-200 group" 
            onClick={()=>navigate(`/description/${job._id}`)}
        >
            <div className="mb-2">
                <h1 className="font-semibold text-2xl text-gray-900 group-hover:text-teal-700 transition-colors">{job?.company?.name}</h1>
                <p className="text-xs text-gray-400 mt-1">India</p>
            </div>
            <div className="mb-3">
                <h2 className="font-extrabold text-3xl leading-tight text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">{job?.title}</h2>
                <p className="text-base text-gray-600 mt-1">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
               <Badge className={'text-blue-700 font-bold bg-blue-50'} variant="ghost">{job?.position} Positions</Badge> 
               <Badge className={'text-[#F83002] font-bold bg-red-50'} variant="ghost">{job?.jobType}</Badge> 
               <Badge className={'text-[#7289b7] font-bold bg-indigo-50'} variant="ghost">{job?.salary}LPA</Badge> 
            </div>
        </div>
    )
}

export default LatestJobCards