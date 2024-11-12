import { useState } from "react";
import cn from "classnames";
// import { Button } from "./ui/button";

const Features = () => {
  const [active, setActive] = useState("SCAN"); // Set the initial active item

  const items = ["SCAN", "PAY", "BROWSE", "ANALYZE"];

  return (
    <div className="px-6 py-12 mb-3">
      <p className="text-4xl font-medium">Features</p>
      <div className="bg-neutral-400 mx-auto flex gap-4 max-w-fit p-2 rounded-full my-10 ">
        {items.map((item) => (
          <p
            key={item}
            onClick={() => setActive(item)}
            className={cn(
              "cursor-pointer px-5 py-2 rounded-full",
              {
                "bg-neutral-800 text-white transition-colors duration-500 ease-custom ": active === item, 
                "hover:bg-neutral-300" : active !== item
                
              }
            )}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="mt-4 text-2xl flex gap-7 flex-col items-center justify-center w-full ">
      
        {active === "SCAN" && <p>Scan the QR code to view the menu.</p>}
        {active === "PAY" && <p>Pay your bill directly from your phone.</p>}
        {active === "BROWSE" && <p>Browse menus from various restaurants.</p>}
        {active === "ANALYZE" && <p>Analyze customer feedback and orders.</p>}

        {/* <Button className="rounded-md ">Get Started</Button> */}
      </div>
    </div>
  );
};

export default Features;
