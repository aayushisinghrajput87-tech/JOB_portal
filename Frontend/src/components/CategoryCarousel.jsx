import React from 'react';
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from './ui/carousel'; 
import {Button} from './ui/button';


const category=[
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Graphic Designer",
    "Data Science"
];

const CategoryCarousel=()=>{
    return (
        <div className="w-full max-w-xl mx-auto my-20 relative">
          <Carousel opts={{align:"start"}} className="w-full">
            <CarouselContent className="flex-ml-2">
                {
                    category.map((cat,index)=>(
                        <CarouselItem key={index} className="pl-2 md:basis-1/2 lg:basis-1/3">
                          <Button variant="outline" className="rounded-full w-full py-3 text-sm bg-white !important text-gray-700 border border-gray-300 hover:bg-gray-100">{cat}</Button>
                        </CarouselItem>
                    

                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="!bg-white !text-gray-700 !border !border-gray-300 !rounded-full !shadow-md hover:!bg-gray-100 !p-3"/>
            <CarouselNext className="!bg-white !text-gray-700 !border !border-gray-300 !rounded-full !shadow-md hover:!bg-gray-100 !p-3"/>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;