"use client";

import { useState } from "react";

const ResultsTypeButtons = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const tabs = [
    { name: "Skills", value: "skills" },
    { name: "Education", value: "education" },
    { name: "Experience", value: "experience" },
  ];

  return (
		<div className="grid grid-cols-3 my-12">
			{tabs.map((tab) => (
				<button
					key={tab.value}
					onClick={() => setActiveTab(tab.value)}
					className={`py-2 text-md font-medium ${
						activeTab === tab.value
							? "border-b-2 border-red-500 text-white"
							: "text-gray-400 hover:text-gray-300"
					}`}
				>
					{tab.name}
				</button>
			))}
		</div>
  );
};

export default ResultsTypeButtons;
