"use client";

import React, { useRef, useEffect } from "react";
import { Skills } from "./SearchResults";
import * as d3 from "d3";

type BarChartProps = {
  skills: Skills[];
};

const BarChart = ({ skills }: BarChartProps) => {
  const d3Container = useRef(null);
  const barPadding = 1.5;
  const barHeight = 30;
  const chartHeight =
    (skills.length * barHeight) + (skills.length * barPadding * barHeight);
  const chartWidth = 800;

  useEffect(() => {
    if (skills && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Clear SVG before redrawing
      svg.selectAll("*").remove();

      // Create scales
      const maxPercentage = d3.max(skills, (d) => d.percentage ?? 0);
      const xScale = d3
        .scaleLinear()
        .domain([0, maxPercentage ?? 0])
        .range([0, chartWidth]);

      const yScale = d3
        .scaleBand()
        .domain(skills.map((skill) => skill.skillName))
        .range([0, chartHeight])
        .padding(barPadding);

      // Draw bars
      svg
        .selectAll(".bar")
        .data(skills)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => yScale(d.skillName) ?? 0)
        .attr("height", barHeight)
        .attr("x", 0)
        .attr("width", (d) => xScale(d.percentage))
        .attr("fill", "#991B1B")
        .attr("rx", 4) // Set the x-axis radius for rounded corners
        .attr("ry", 4) // Set the y-axis radius for rounded corners
        .attr("stroke", "#323232") // Border color
        .attr("stroke-width", 2); // Border width

      // Add skill names above each bar
      svg
        .selectAll(".skill-label")
        .data(skills)
        .enter()
        .append("text")
        .attr("class", "skill-label")
        .attr("y", (d) => (yScale(d.skillName) ?? 0) - 8)
        .attr("x", 0)
        .attr("text-anchor", "start") // Aligns the text to the start of the bar
        .text((d) => d.skillName)
        .attr("fill", "#FFF")
        .attr("font-size", "14px");

      // Add percentage labels inside bars
      svg
        .selectAll(".label")
        .data(skills)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => xScale(d.percentage) - 8) // Adjust this value to position the label inside the end of the bar
        .attr("y", (d) => (yScale(d.skillName) ?? 0) + barHeight / 2 + 5) // Center the label vertically
        .text((d) => `${d.percentage.toFixed(2)}%`) // Display the percentage
        .attr("text-anchor", "end") // Right-align the text with the end of the bar
        .attr("fill", "#FFF") // Set the text color to white for visibility
        .attr("font-size", "15px");

      // Add y-axis
      svg.append("g").call(d3.axisLeft(yScale));
    }
  }, [chartHeight, skills]);

  return <svg ref={d3Container} width={chartWidth} height={chartHeight} />;
};

export default BarChart;
