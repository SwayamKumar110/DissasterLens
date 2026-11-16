import React, { useEffect, useState } from 'react';
import { 
  AlertCircle, 
  Activity, 
  Plus, 
  HeartHandshake, 
  Layers, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';

import { DashboardData, NavPage } from '../types';
import { fetchDashboard } from '../services/api';
import { FALLBACK_DASHBOARD } from '../data/fallbackData';
import { KPICard } from '../components/KPICard';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

interface Props {
  onNavigate: (page: NavPage) => void;
}

export const OverviewPage: React.FC<Props> = ({ onNavigate }) => {
  const [data, setData] = useState<DashboardData>(FALLBACK_DASHBOARD);

  useEffect(() => {
    fetchDashboard()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.warn('Using local fallback for dashboard:', err);
      });
  }, []);

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-[#FDF2F2] text-[#C24141] border-[#F8D7D7]';
      case 'medium':
        return 'bg-[#FEF8ED] text-[#B87D1F] border-[#FBEAD0]';
      default:
        return 'bg-[#F0F8F5] text-[#1E705C] border-[#D4EFE6]';
    }
  };

  const getDamageBadge = (damage: string) => {
    switch (damage.toLowerCase()) {
      case 'severe':
        return 'bg-[#FDF2F2] text-[#C24141] border-[#F8D7D7]';
      case 'mild':
        return 'bg-[#FEF8ED] text-[#B87D1F] border-[#FBEAD0]';
      default:
        return 'bg-[#F0F8F5] text-[#1E705C] border-[#D4EFE6]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#202B38] tracking-tight leading-tight">
            Disaster Intelligence Overview
          </h1>
          <p className="text-[14px] text-[#697586] mt-1 font-normal leading-normal">
            Understand disaster situations through combined visual and textual analysis.
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onNavigate('analysis')}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563A6] hover:bg-[#1D4F85] text-white font-medium text-[13.5px] card-shadow transition-colors cursor-pointer self-start sm:self-center shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Subtle Information Banner */}
      <DisclaimerBanner text="Academic demonstration environment. All operational statistics and disaster events shown here use sample data." />

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Analyses"
          value={data.kpis.total_analyses}
          subtitle="Multimodal incident assessments"
          icon={<Activity className="w-4 h-4" />}
          trend="+12% this week"
          trendPositive={true}
          accentColor="blue"
        />
        <KPICard
          title="High Urgency Cases"
          value={data.kpis.high_urgency_cases}
          subtitle="Immediate response required"
          icon={<AlertCircle className="w-4 h-4" />}
          trend="Critical priority"
          trendPositive={false}
          accentColor="red"
        />
        <KPICard
          title="Damage Detected"
          value={data.kpis.damage_detected}
          subtitle="Severe & mild damage verified"
          icon={<Layers className="w-4 h-4" />}
          trend="67.7% of assessments"
          trendPositive={true}
          accentColor="amber"
        />
        <KPICard
          title="Relief Required"
          value={data.kpis.relief_required}
          subtitle="Rescue, food & medical aid"
          icon={<HeartHandshake className="w-4 h-4" />}
          trend="Active requests"
          trendPositive={false}
          accentColor="cyan"
        />
      </div>

      {/* Analytics Section: Distribution Donut & Activity Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Disaster Classification Distribution */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-semibold text-[#202B38] tracking-tight">
                Disaster Classification Distribution
              </h3>
              <span className="text-[11.5px] text-[#697586] font-normal">1,284 total</span>
            </div>
            <p className="text-[12.5px] text-[#697586] mb-2 font-normal">
              Breakdown of assessed disaster incidents by hazard category.
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7EAF0',
                    borderRadius: '8px',
                    color: '#202B38',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}
                  formatter={(val: any) => [`${val} cases`, 'Total']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E7EAF0] text-[12px]">
            {data.distribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[#4B5565] truncate font-normal">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Activity Timeline */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-semibold text-[#202B38] tracking-tight">
                Analysis Activity Timeline
              </h3>
              <span className="text-[11.5px] text-[#697586] font-normal">Last 24 Hours</span>
            </div>
            <p className="text-[12.5px] text-[#697586] mb-2 font-normal">
              Rate of processed multimodal analyses and high urgency classifications.
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.activity_timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
                <XAxis dataKey="time" stroke="#8792A2" fontSize={11} tickLine={false} />
                <YAxis stroke="#8792A2" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7EAF0',
                    borderRadius: '8px',
                    color: '#202B38',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="analyses"
                  name="Total Analyses"
                  stroke="#2563A6"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#2563A6', strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="high_urgency"
                  name="High Urgency"
                  stroke="#D65B5B"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#D65B5B', strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E7EAF0] text-[12px] text-[#697586]">
            <span>Peak Volume: 16:00 (198/hr)</span>
            <span className="text-[#2563A6]">Throughput: ~35,797 samples/sec</span>
          </div>
        </div>

      </div>

      {/* Recent Disaster Analyses Table */}
      <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-[#202B38] tracking-tight">
              Recent Disaster Analyses
            </h3>
            <p className="text-[12.5px] text-[#697586] mt-0.5 font-normal">
              Chronological log of evaluated disaster incidents with classification outputs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('analysis')}
            className="text-[13px] font-medium text-[#2563A6] hover:text-[#1D4F85] flex items-center gap-1 self-start sm:self-center cursor-pointer"
          >
            <span>Analyse an incident</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#E7EAF0] text-[#697586] text-[12px]">
                <th className="pb-2.5 font-medium">Case ID</th>
                <th className="pb-2.5 font-medium">Disaster Type</th>
                <th className="pb-2.5 font-medium">Urgency</th>
                <th className="pb-2.5 font-medium">Damage Level</th>
                <th className="pb-2.5 font-medium">Relief Required</th>
                <th className="pb-2.5 font-medium text-right">Analysis Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8]">
              {data.recent_analyses.map((row) => (
                <tr key={row.case_id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-2.5 font-medium text-[#202B38]">{row.case_id}</td>
                  <td className="py-2.5 text-[#4B5565]">{row.disaster_type}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11.5px] border ${getUrgencyBadge(row.urgency)}`}>
                      {row.urgency}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11.5px] border ${getDamageBadge(row.damage_level)}`}>
                      {row.damage_level}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[11.5px] border ${
                      row.relief_required.toLowerCase() === 'required'
                        ? 'bg-[#FDF2F2] text-[#C24141] border-[#F8D7D7]'
                        : 'bg-[#F0F8F5] text-[#1E705C] border-[#D4EFE6]'
                    }`}>
                      {row.relief_required}
                    </span>
                  </td>
                  <td className="py-2.5 text-[#697586] text-right text-[12px]">{row.analysis_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
