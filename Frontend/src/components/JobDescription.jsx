import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied =false;

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-6 rounded-2xl border">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold">Frontend Developer</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="ghost" className="text-blue-700 text-sm font-medium">
              12 Positions
            </Badge>
            <Badge variant="ghost" className="text-red-600 text-sm font-medium">
              Part Time
            </Badge>
            <Badge variant="ghost" className="text-indigo-600 text-sm font-medium">
              24 LPA
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          className={`rounded-lg px-5 ${
            isApplied
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* DIVIDER */}
      <h2 className="mt-8 border-b pb-3 text-lg font-medium">
        Job Description
      </h2>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p><span className="font-semibold">Role:</span> Frontend Developer</p>
        <p><span className="font-semibold">Location:</span> Hyderabad</p>
        <p><span className="font-semibold">Experience:</span> 2 years</p>
        <p><span className="font-semibold">Salary:</span> 12 LPA</p>
        <p><span className="font-semibold">Total Applicants:</span> 4</p>
        <p><span className="font-semibold">Posted Date:</span> 17-07-2026</p>

        <p className="pt-2">
          <span className="font-semibold">Description:</span>{' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          mollitia sit. Veritatis iure dolore placeat nam tempora ut rerum.
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
