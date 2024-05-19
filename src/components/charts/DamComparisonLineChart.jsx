import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { formatDate } from "@/utils/formatDate";
import useDam from "@/hooks/useDam";

const DamComparisonLineChart = ({
  selectedAttribute,
  currentDamData,
  damName,
  comparisonDamId,
  w = 800,
  h = 400,
}) => {
  const svgRef = useRef();
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const { fetchDamMonthlyData, fetchDamById } = useDam();
  const [comparisonDamData, setComparisonDamData] = useState([]);
  const [comparisonDam, setComparisonDam] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: months, error: monthsError } = await fetchDamMonthlyData(
        comparisonDamId
      );

      if (monthsError) {
        setFetchError(monthsError);
        return;
      }

      const { data: dam, error: damError } = await fetchDamById(
        comparisonDamId
      );

      if (damError) {
        setFetchError(damError);
        return;
      }

      setFetchError(null);
      setComparisonDamData(months);

      setFetchError(null);
      setComparisonDam(dam);
    };

    fetchData();
  }, [comparisonDamId]);

  useEffect(() => {
    if (!currentDamData.length || !comparisonDamData.length) {
      // console.log("Current or comparison data is empty");
      return;
    }

    const clearGraph = () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };

    clearGraph();

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = currentDamData.map((d) => d.month);

    const x = d3.scaleBand().domain(months).range([0, width]).padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max([
          ...currentDamData.map((d) => d[selectedAttribute]),
          ...comparisonDamData.map((d) => d[selectedAttribute]),
        ]),
      ])
      .nice()
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(months[i]) + x.bandwidth() / 2)
      .y((d) => y(d));

    const xAxis = d3.axisBottom(x).tickFormat((d) => formatDate(d));
    const yAxis = d3.axisLeft(y);

    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").call(yAxis);

    const drawLine = (data, color, damName) => {
      const lineData = data.map((d) => d[selectedAttribute]);
      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("d", line);
    };

    drawLine(currentDamData, "steelblue");
    drawLine(comparisonDamData, "red");

    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("display", "none");

    const tooltipTexts = [currentDamData, comparisonDamData].map(
      (data, index) =>
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
          const currentData = currentDamData[index];
          const comparisonData = comparisonDamData[index];
          tooltip.attr(
            "transform",
            `translate(${x(month)}, ${y(
              Math.max(
                currentData[selectedAttribute],
                comparisonData[selectedAttribute]
              )
            )})`
          );
          tooltipTexts[0].text(`${damName}: ${currentData[selectedAttribute]}`);
          tooltipTexts[1].text(
            `${comparisonDam.name}: ${comparisonData[selectedAttribute]}`
          );
        } else {
          tooltip.style("display", "none");
        }
      });

    return () => clearGraph();
  }, [currentDamData, comparisonDamData, selectedAttribute]);

  return (
    <div>
      {fetchError && <div>Error fetching comparison data: {fetchError}</div>}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DamComparisonLineChart;
