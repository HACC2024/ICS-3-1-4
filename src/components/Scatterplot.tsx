/* eslint-disable @typescript-eslint/quotes */

'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ScatterplotProps {
  data: Array<[number, number]>;
  xVariable: string;
  yVariable: string;
}

const Scatterplot: React.FC<ScatterplotProps> = ({ data, xVariable, yVariable }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous chart content

    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 50, left: 80 };

    const minX = d3.min(data, d => d[0]) ?? 0;
    const maxX = d3.max(data, d => d[0]) ?? 0;

    // Define scales
    const x = d3.scaleLinear()
      .domain([minX, maxX])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1]) ?? 0])
      .range([height - margin.bottom, margin.top]);

    // Add points
    svg.append('g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => x(d[0]))
      .attr('cy', d => y(d[1]))
      .attr('r', 3)
      .attr('fill', 'steelblue');

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text(xVariable);

    // Y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "13px")
      .text(yVariable);

    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text(`Scatterplot of ${yVariable} vs. ${xVariable}`);
  }, [data, xVariable, yVariable]);

  return <svg ref={svgRef} width={500} height={300} />;
};

export default Scatterplot;
