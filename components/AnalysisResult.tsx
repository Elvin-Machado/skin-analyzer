import React from 'react';
import { AnalysisResponse } from '../types';
import { CheckCircleIcon, LightBulbIcon, ExclamationIcon } from './IconComponents';

interface AnalysisResultProps {
  data: AnalysisResponse;
}

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200">
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-lg font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
        {children}
    </div>
);


export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center p-6 bg-sky-600 text-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold">{data.conditionName}</h2>
            <p className="mt-2 text-sky-100">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <SectionCard title="Common Symptoms" icon={<ExclamationIcon />}>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {data.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                    ))}
                </ul>
            </SectionCard>

            <SectionCard title="Suggestions & Next Steps" icon={<LightBulbIcon />}>
                <ul className="space-y-2">
                    {data.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                           <div className="flex-shrink-0 mt-1 mr-2">
                             <CheckCircleIcon />
                           </div>
                            <span className="text-gray-600">{suggestion}</span>
                        </li>
                    ))}
                </ul>
            </SectionCard>
        </div>
    </div>
  );
};