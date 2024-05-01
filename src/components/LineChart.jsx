import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const LineChart = ({ data, months, w = 800, h = 400 }) => {
  const svgRef = useRef();
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    if (!data || !months || data.length !== months.length) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(months).range([0, width]).padding(0.1);

    // Calculate buffer value as a percentage of the data range
    const buffer = (d3.max(data) - d3.min(data)) * 0.1; // Adjust the buffer percentage as needed
    const y = d3
      .scaleLinear()
      .domain([d3.min(data) - buffer, d3.max(data) + buffer]) // Adjust domain based on buffer
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(months[i]) + x.bandwidth() / 2)
      .y((d) => y(d));

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    tooltip
      .append("rect")
      .attr("width", 50)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.5)
      .attr("transform", "translate(-25, -30)");

    tooltip
      .append("text")
      .attr("x", 0)
      .attr("dy", "-0.3em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("transform", "translate(0, -15)");

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => tooltip.style("display", null))
      .on("mouseout", () => tooltip.style("display", "none"))
      .on("mousemove", function (event) {
        const mouseX = d3.pointer(event)[0];
        const index = Math.floor(mouseX / (width / months.length));
        const yValue = data[index];
        setHoveredValue(yValue);
        tooltip.attr(
          "transform",
          `translate(${x(months[index]) + x.bandwidth() / 2},${y(yValue)})`
        );
        tooltip.select("text").text(yValue);
      });
  }, [data, months]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
