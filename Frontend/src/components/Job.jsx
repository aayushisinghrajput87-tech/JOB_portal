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
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)==0?"Today":`${daysAgoFunction(job?.createdAt)}days ago`}</p>
        <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* LOGO + COMPANY */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ584acfWMPuHP7nRm1z5_Yt5zLmKyGrANsQ&s" />
        </Avatar>

        <div>
          <h3 className="font-medium text-lg">{job?.company?.name}</h3>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-bold mt-4">{job?.title}</h3>

      {/* DESCRIPTION → FIXED HEIGHT */}
      <p
        className="text-sm text-gray-600 mt-2 flex-1 overflow-hidden"
        style={{ maxHeight: "4.5rem" }}
      >
      {job?.description}
      </p>

      {/* BADGES */}
      <div className="mt-4 flex gap-2">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7289b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
      </div>

      {/* BUTTONS → ALWAYS AT BOTTOM */}
      <div className="mt-auto pt-4">
        <div className="flex items-center gap-3">
          <Button onClick={()=>navigate(`/description/${job?._id}`)}variant="outline" style={{backgroundColor:"#08115de6",color:"white"}}>Details</Button>
          <Button style={{backgroundColor:"#08115de6",color:"white"}} className="rounded-md px-4 py-1">Save For Later</Button>
        </div>
      </div>

    </div>
  );
};

export default Job;