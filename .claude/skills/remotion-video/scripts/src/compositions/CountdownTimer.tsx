import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export type CountdownTimerProps = {
  from: number;
  label: string;
  backgroundColor: string;
  accentColor: string;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  from,
  label,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentSecond = from - Math.floor(frame / fps);
  const frameInSecond = frame % fps;

  const numberScale = spring({
    frame: frameInSecond,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const progress = interpolate(frame, [0, from * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ringRadius = 180;
  const circumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = circumference * (1 - progress);

  const displayNumber = Math.max(0, currentSecond);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 400, height: 400 }}>
        <svg
          width={400}
          height={400}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <circle
            cx={200}
            cy={200}
            r={ringRadius}
            fill="none"
            stroke="#333333"
            strokeWidth={8}
          />
          <circle
            cx={200}
            cy={200}
            r={ringRadius}
            fill="none"
            stroke={accentColor}
            strokeWidth={8}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 400,
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 120,
              fontWeight: "bold",
              fontFamily: "sans-serif",
              transform: `scale(${numberScale})`,
              lineHeight: 1,
            }}
          >
            {displayNumber}
          </div>
          <div
            style={{
              color: "#999999",
              fontSize: 24,
              fontFamily: "sans-serif",
              marginTop: 12,
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
