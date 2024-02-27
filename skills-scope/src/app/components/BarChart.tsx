import { useRef, useEffect, useState } from "react";
import { Results } from "./SearchResults";
import * as d3 from "d3";

type BarChartProps = {
  results: Results[];
};

const BarChart = ({ results }: BarChartProps) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const barPadding = 1.1;
  const barHeight = 30;
  const chartHeight =
    results.length * barHeight + results.length * barPadding * barHeight;

  useEffect(() => {
    // Set initial container width
    if (d3Container.current) {
      setContainerWidth(d3Container.current.clientWidth);
    }

    // Add resize listener to update width
    const handleResize = () => {
      if (d3Container.current) {
        setContainerWidth(d3Container.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (results && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Clear SVG before redrawing
      svg.selectAll("*").remove();

      // Create scales
      const maxPercentage = d3.max(results, (d) => d.percentage ?? 0);
      const xScale = d3
        .scaleLinear()
        .domain([0, maxPercentage ?? 0])
        .range([0, containerWidth]);

      const yScale = d3
        .scaleBand()
        .domain(results.map((results) => results.resultName))
        .range([0, chartHeight])
        .paddingInner(barPadding)
        .paddingOuter(0.5);

      // Draw bars
      svg
        .selectAll(".bar")
        .data(results)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", (d) => yScale(d.resultName) ?? 0)
        .attr("height", barHeight)
        .attr("x", 0)
        .attr("width", (d) => xScale(d.percentage))
        .attr("fill", "#4b86b4")
        .attr("rx", 4) // Set the x-axis radius for rounded corners
        .attr("ry", 4); // Set the y-axis radius for rounded corners

      // Add result names above each bar
      svg
        .selectAll(".result-label")
        .data(results)
        .enter()
        .append("text")
        .attr("class", "result-label")
        .attr("y", (d) => (yScale(d.resultName) ?? 0) - 6)
        .attr("x", 2)
        .attr("text-anchor", "start") // Aligns the text to the start of the bar
        .text((d) => d.resultName)
        .attr("fill", "#4b86b4")
        .attr("font-size", "15px")
        .attr("font-weight", "bold");

      // Add percentage labels inside bars
      svg
        .selectAll(".label")
        .data(results)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => xScale(d.percentage) - 8) // Adjust this value to position the label inside the end of the bar
        .attr("y", (d) => (yScale(d.resultName) ?? 0) + barHeight / 2 + 5) // Center the label vertically
        .text((d) => `${d.percentage.toFixed(2)}%`) // Display the percentage
        .attr("text-anchor", "end") // Right-align the text with the end of the bar
        .attr("fill", "#E6E6E6") // Set the text color to white for visibility
        .attr("font-size", "15px");
    }
  }, [chartHeight, containerWidth, results]);

  return (
    <div className="my-6">
      <svg ref={d3Container} width="100%" height={chartHeight} />
    </div>
  );
};

export default BarChart;
