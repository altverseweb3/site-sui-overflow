import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const SupplyComponent: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>your supply positions</AccordionTrigger>
          <AccordionContent>discover your positions</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SupplyComponent;
