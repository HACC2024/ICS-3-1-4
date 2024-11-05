'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HistogramProps {
  data: number[];
}

const Histogram: React.FC<HistogramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear existing content on updates

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3.scaleLinear()
      .domain([0, d3.max(data) ?? 0])
      .range([margin.left, width - margin.right]);

    const bins = d3.bin().domain(x.domain() as [number, number]).thresholds(10)(data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) ?? 0])
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', d => x(d.x0 ?? 0) + 1)
      .attr('y', d => y(d.length))
      .attr('width', d => x(d.x1 ?? 0) - x(d.x0 ?? 0) - 1)
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef} width={400} height={200} />;
};

export default Histogram;
