import React from "react";
import "./FilterCard.css";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// FIX: Use correct relative import for setSearchQuery
import { setSearchQuery } from "../redux/jobSlice";


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
    const [selectedValue, setSelectedValue] = React.useState("");
    const dispatch=useDispatch();
    const ChangeHandler = (value) => {
        setSelectedValue(value);
    };

        // FIX: Use correct action name and import
        useEffect(()=>{
            dispatch(setSearchQuery(selectedValue));
        },[selectedValue,dispatch]);

    // Custom style for rounded filter circles with white gap
    const circleStyle = {
      width: '24px',
      height: '24px',
      borderRadius: '100%',
      background: '#fff',
      border: '2px solid #000',
      display: 'inline-block',
      marginRight: '8px',
    };

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="text-lg">Filter Jobs</h1>
            <hr className="mt-3"/>
            <RadioGroup onValueChange={ChangeHandler} className="w-full" value={selectedValue}>
                {
                    filterData.map((data,index)=>(
                        <div key={index} className="mt-6">
                            <h1 className="font-bold text-2xl mb-3">
                                {data.filterType}
                            </h1>
                            {
                                data.array.map((item,idx)=>{
                                      const itemId=`id${index}-${idx}`
                                    return (
                                        <div key={itemId} className="flex items-center space-x-3 my-2">
                                            {/* Highlighted: Custom circle style for filter */}
                                            <RadioGroupItem value={item} id={itemId} className="pure-circle-radio" />
                                            <Label htmlFor={itemId}>{item}</Label>
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