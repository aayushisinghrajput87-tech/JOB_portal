import React from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";


const filterData=[
    {
        filterType:'Location',
        array:["Delhi NCR","Banglore","Hyderabad","pune","Mumbai"],
    },
    {
        filterType:'Industry',
        array:["Frontend Developer","Backened Developer","FullStack Developer"],
    },
    {
        filterType:'Salary',
        array:["0-40k","42-1lakh","1lakh to 5lakh"],
    },
];

const FilterCard=()=>{
    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="text-lg">Filter Jobs</h1>
            <hr className="mt-3"/>
            <RadioGroup>
                {
                    filterData.map((data,index)=>(
                        <div key={index} className="mt-6">
                            <h1 className="font-bold text-2xl mb-3">
                                {data.filterType}
                            </h1>
                            {
                                data.array.map((item,index)=>{
                                    return (
                                        <div key={index} className="flex items-center space-x-3 my-2">
                                            <RadioGroupItem value={item} id={`${data.filterType}-${index}`} className="h-4 w-4"/>
                                            <Label htmlFor={`${data.filterType}-${index}`}>{item}</Label>
                                        </div>    
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
            </div>
    );
};

export default FilterCard ;