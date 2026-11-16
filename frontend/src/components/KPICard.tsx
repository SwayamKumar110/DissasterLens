import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  accentColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  accentColor = 'blue'
}) => {
  const colorMap: Record<string, { iconBg: string; iconColor: string }> = {
    blue: { iconBg: 'bg-[#F0F4F8]', iconColor: 'text-[#2563A6]' },
    red: { iconBg: 'bg-[#FDF2F2]', iconColor: 'text-[#D65B5B]' },
    amber: { iconBg: 'bg-[#FEF8ED]', iconColor: 'text-[#D99A35]' },
    cyan: { iconBg: 'bg-[#EFF6F9]', iconColor: 'text-[#3B82A0]' },
    emerald: { iconBg: 'bg-[#F0F8F5]', iconColor: 'text-[#23856D]' },
  };

  const scheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow transition-shadow duration-150 card-shadow-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12.5px] font-medium text-[#697586]">
          {title}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${scheme.iconBg} ${scheme.iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[26px] font-semibold text-[#202B38] tracking-tight leading-none">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {trend && (
          <span className={`text-[11.5px] font-medium ${trendPositive ? 'text-[#23856D]' : 'text-[#697586]'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[12px] text-[#697586] font-normal leading-normal">
        {subtitle}
      </p>
    </div>
  );
};
