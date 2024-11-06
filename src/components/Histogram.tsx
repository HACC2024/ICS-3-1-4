/* eslint-disable @typescript-eslint/quotes */

'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HistogramProps {
  data: number[];
  // eslint-disable-next-line react/require-default-props
  variable?: string; // Optional prop for the variable name, defaulting to "AGEP"
}

const Histogram: React.FC<HistogramProps> = ({ data, variable = "AGEP" }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    console.log(data);
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear existing content on updates

    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 50, left: 50 };

    // X scale
    const x = d3.scaleLinear()
      .domain([0, d3.max(data) ?? 0])
      .range([margin.left, width - margin.right]);

    // Binning the data into 10 separate bins
    const bins = d3.bin().domain(x.domain() as [number, number]).thresholds(10)(data);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) ?? 0])
      .range([height - margin.bottom, margin.top]);

    // Add bars
    svg.append('g')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', d => x(d.x0 ?? 0) + 1)
      .attr('y', d => y(d.length))
      .attr('width', d => x(d.x1 ?? 0) - x(d.x0 ?? 0) - 1)
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', 'steelblue');

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text(variable); // Set the x-axis label to the variable name

    // Y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -height / 2)
      .attr("y", -37)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "13px")
      .text("Frequency"); // Set the y-axis label

    // Title
    svg.append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text(`Histogram of ${variable}`);
  }, [data, variable]);

  return <svg ref={svgRef} width={500} height={300} />;
};

export default Histogram;
