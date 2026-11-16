import React from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  HeartHandshake
} from 'lucide-react';
import { ClassificationResult } from '../types';

interface Props {
  result: ClassificationResult;
}

export const ClassificationCard: React.FC<Props> = ({ result }) => {
  const getTaskIcon = (task: string) => {
    switch (task.toLowerCase()) {
      case 'time period':
        return <Clock className="w-4 h-4" />;
      case 'urgency':
        return <AlertCircle className="w-4 h-4" />;
      case 'relevance':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'damage':
        return <Layers className="w-4 h-4" />;
      case 'relief':
        return <HeartHandshake className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (predictedClass: string) => {
    const val = predictedClass.toLowerCase();
    const isDanger = ['severe', 'high', 'required', 'relevant'].includes(val);
    const isSuccess = ['little/no damage', 'low', 'not required', 'not relevant'].includes(val);
    const isWarning = ['mild', 'medium', 'future'].includes(val);

    if (isDanger) {
      return {
        badgeBg: 'bg-[#FDF2F2] text-[#C24141] border-[#F8D7D7]',
        barBg: 'bg-[#D65B5B]',
        iconBg: 'bg-[#FDF2F2] text-[#D65B5B]',
      };
    }
    if (isWarning) {
      return {
        badgeBg: 'bg-[#FEF8ED] text-[#B87D1F] border-[#FBEAD0]',
        barBg: 'bg-[#D99A35]',
        iconBg: 'bg-[#FEF8ED] text-[#D99A35]',
      };
    }
    if (isSuccess) {
      return {
        badgeBg: 'bg-[#F0F8F5] text-[#1E705C] border-[#D4EFE6]',
        barBg: 'bg-[#23856D]',
        iconBg: 'bg-[#F0F8F5] text-[#23856D]',
      };
    }
    return {
      badgeBg: 'bg-[#F0F4F8] text-[#2563A6] border-[#D5E1ED]',
      barBg: 'bg-[#2563A6]',
      iconBg: 'bg-[#F0F4F8] text-[#2563A6]',
    };
  };

  const styles = getStatusStyles(result.predicted_class);

  return (
    <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E7EAF0] card-shadow flex flex-col justify-between transition-shadow hover:card-shadow-hover">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center ${styles.iconBg}`}>
              {getTaskIcon(result.task)}
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#202B38] leading-tight">
                {result.task}
              </h4>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 rounded-md text-[11.5px] font-medium border ${styles.badgeBg}`}>
            {result.predicted_class}
          </span>
        </div>

        {/* Confidence metric */}
        <div className="my-3">
          <div className="flex justify-between items-baseline mb-1 text-[12px]">
            <span className="text-[#697586] font-normal">Confidence</span>
            <span className="font-semibold text-[#202B38]">{result.confidence.toFixed(1)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#F0F4F8] overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${styles.barBg}`}
              style={{ width: `${Math.min(100, Math.max(5, result.confidence))}%` }}
            />
          </div>
        </div>

        {/* Human-readable explanation text */}
        <p className="text-[12.5px] text-[#4B5565] leading-relaxed bg-[#F7F8FA] p-3 rounded-lg border border-[#E7EAF0] mb-3 font-normal">
          {result.explanation}
        </p>
      </div>

      {/* Probabilities breakdown */}
      {result.all_probabilities && Object.keys(result.all_probabilities).length > 0 && (
        <div className="pt-2.5 border-t border-[#E7EAF0]">
          <p className="text-[11px] text-[#8792A2] font-medium uppercase tracking-wider mb-1.5">Class Breakdown</p>
          <div className="space-y-1">
            {Object.entries(result.all_probabilities).map(([cls, prob]) => {
              const isSelected = cls === result.predicted_class;
              return (
                <div key={cls} className="flex items-center justify-between text-[11.5px]">
                  <span className={isSelected ? 'text-[#202B38] font-medium' : 'text-[#697586]'}>{cls}</span>
                  <span className={isSelected ? 'text-[#202B38] font-medium' : 'text-[#8792A2]'}>{prob.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
