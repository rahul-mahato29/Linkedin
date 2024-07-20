import { Info } from "lucide-react";
import React from "react";

interface NAVITEMS {
  heading: String,
  subHeading: String
}

const newsItems: NAVITEMS[] = [
  {
    heading: "E-retailer retag health drinks",
    subHeading: "4h ago - 345 readers",
  },
  {
    heading: "Lets transport raises $32 million",
    subHeading: "4h ago - 322 readers",
  },
  {
    heading: "Causual wear is in at India Inc",
    subHeading: "4h ago - 234 readers",
  },
  {
    heading: "Smaller cities go on loans",
    subHeading: "4h ago - 112 readers",
  },
];

const News = () => {
  return (
    <div className="hidden md:block w-[25%] h-fit bg-white rounded-lg border pb-2 border-gray-300">
      <div className="flex items-center justify-between p-3">
        <h3 className="font-semibold m-1">LinkedIn News</h3>
        <Info size={18} className="cursor-pointer" />
      </div>
      <div className="">
        {newsItems.map((item, index) => {
          return(
            <div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              <h1 className="text-sm font-semibold">{item.heading}</h1>
              <p className="text-xs text-gray-500">{item.subHeading}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default News;
