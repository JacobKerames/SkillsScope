'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


type Skills = {
  skillName: string;
  percentage: number;
};

const SearchResults = () => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('title');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (keyword) {
        try {
          const response = await fetch(`http://localhost:5277/search/skills/${encodeURIComponent(keyword)}`, { signal });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          let data = await response.json();
          data.sort((a: { percentage: number; }, b: { percentage: number; }) => b.percentage - a.percentage);
          setSkills(data);
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('Error fetching search results:', error);
          }
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [keyword]);

  const data = {
    labels: skills.map(skill => skill.skillName),
    datasets: [
      {
        data: skills.map(skill => skill.percentage),
        backgroundColor: '#15B8A6',
        borderColor: 'gray',
        borderWidth: 2,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#000',
        align: 'start' as const,
        anchor: 'end' as const,
        font: {
          size: 15,
          weight: 'bold' as const,
        },
        formatter: (value: number, context: any) => {
          return `${value.toFixed(2)}%`;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks:{
          display: false,
        },
      },
      y:{
        grid: {
          display: false,
        },
        ticks:{
          beginAtZero: true,
          color: '#FFF',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const calculateChartHeight = () => {
    const heightPerSkill = 45;

    const dynamicHeight = skills.length * heightPerSkill;
    return dynamicHeight;
  };

  return (
    <>
      <div className="container mt-20 mx-auto flex flex-col p-6" style={{ maxWidth: '800px' }}>
        <p className="text-xl text-left">Top skills for job titles matching '{keyword}'</p>
      </div>
      <div className="container mb-20 mx-auto flex flex-col justify-center items-center px-6" style={{ height: calculateChartHeight(), maxWidth: '800px' }}>
        {skills.length > 0 ? (
            <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        ) : (
            <p>No skills found for {keyword}.</p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
