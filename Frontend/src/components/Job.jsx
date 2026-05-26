import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from "./ui/badge";
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
  const navigate=useNavigate();
  //const jobId=job._id;
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentDate=new Date();
    const timeDiff=currentDate-createdAt;
    return Math.floor(timeDiff/(1000*60*60*24));
  }
  return (
    <div className="border rounded-lg shadow-sm bg-white w-full h-full flex flex-col p-5">

      {/* TOP */}
      <div className="flex justify-start items-start">
        <p className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full shadow-sm">{daysAgoFunction(job?.createdAt)==0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
      </div>

      {/* LOGO + COMPANY */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="h-12 w-12 shadow-md ring-2 ring-teal-100">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{job?.company?.name}</h3>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-extrabold mt-4 text-indigo-700">{job?.title}</h3>

      {/* DESCRIPTION → FIXED HEIGHT */}
      <p
        className="text-base text-gray-700 mt-2 flex-1 overflow-hidden"
        style={{ maxHeight: "4.5rem" }}
      >
      {job?.description}
      </p>

      {/* BADGES */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="text-blue-700 font-bold bg-blue-50" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold bg-red-50" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7289b7] font-bold bg-indigo-50" variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* BUTTONS → ALWAYS AT BOTTOM */}
      <div className="mt-auto pt-4">
        <div className="flex items-center">
          <Button 
            onClick={()=>navigate(`/description/${job?._id}`)}
            className="rounded-md px-6 py-2 bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-semibold shadow-md hover:from-teal-400 hover:to-indigo-500 border-0 w-full"
          >
            Details
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Job;