import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  text?: string;
  variant?: 'info' | 'warning';
}

export const DisclaimerBanner: React.FC<Props> = ({
  text = "Academic demonstration environment. All operational statistics and disaster events shown here use sample data.",
  variant = 'info'
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-[#E7EAF0] bg-[#FFFFFF] text-[13px] text-[#697586] card-shadow">
      <div className="w-5 h-5 rounded-full bg-[#F0F4F8] text-[#2563A6] flex items-center justify-center shrink-0">
        <Info className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 font-normal text-[#4B5565]">
        <span>{text}</span>
      </div>
      <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#F0F4F8] text-[#697586] border border-[#E7EAF0]">
        Sample Data
      </span>
    </div>
  );
};
