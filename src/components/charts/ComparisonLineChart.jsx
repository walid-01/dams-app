import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { formatDate } from "@/utils/formatDate";

const ComparisonLineChart = ({ selectedRows, months, w = 800, h = 400 }) => {
  const svgRef = useRef();
  const [hoveredMonth, setHoveredMonth] = useState(null);

  useEffect(() => {
    if (!months || !selectedRows.length || !months.length) return;

    const clearGraph = () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(months.map((month) => month.month))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(months, (month) =>
          d3.max(selectedRows.map((row) => month[row]))
        ),
      ])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((_, i) => x(months[i].month) + x.bandwidth() / 2)
      .y((d, i) => y(d));

    const xAxis = d3.axisBottom(x).tickFormat((d) => formatDate(d));
    const yAxis = d3.axisLeft(y);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").call(yAxis);

    selectedRows.forEach((paramId) => {
      const paramData = months.map((month) => month[paramId]);
      svg
        .append("path")
        .datum(paramData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    });

    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    const tooltipTexts = selectedRows.map((row, index) =>
      tooltip
        .append("text")
        .attr("x", 0)
        .attr("y", (index + 1) * 20) // Adjusted y position
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
    );

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
        const month = months[index];

        if (month) {
          setHoveredMonth(month);
          tooltip.attr(
            "transform",
            `translate(${x(month.month)}, ${y(
              d3.max(selectedRows.map((row) => month[row]))
            )})`
          );
          tooltipTexts.forEach((text, i) => {
            text.text(`${selectedRows[i]}: ${month[selectedRows[i]]}`);
          });
        } else {
          tooltip.style("display", "none");
        }
      });

    return clearGraph;
  }, [months, selectedRows]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ComparisonLineChart;
