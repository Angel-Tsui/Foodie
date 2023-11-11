"use client";
import styles from "../../src/app/record/record.module.css";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function RadarChart(allRatings) {
  let ratingData = allRatings.allRatings;

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");
      let newChart = new Chart(context, {
        type: "radar",
        data: {
          labels: [
            "Melt in the mouth",
            "Tender",
            "Juicy",
            "Chewy",
            "Thick",
            "Rich",
          ],
          datasets: [
            {
              label: "Your Rating",
              data: ratingData,
              backgroundColor: ["rgba(114, 17, 17, 0.7)"],
              borderColor: ["black"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scale: {
            startAtZero: true,
            min: 0,
            max: 10,
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, [ratingData]);
  return (
    <div className={styles.radar}>
      <canvas ref={chartRef} />
    </div>
  );
}
