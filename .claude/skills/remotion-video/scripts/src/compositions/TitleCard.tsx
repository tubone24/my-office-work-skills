import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export type TitleCardProps = {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
};

export const TitleCard: React.FC<TitleCardProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleTranslateY = interpolate(frame, [20, 40], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          color: textColor,
          fontSize: 80,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            color: textColor,
            fontSize: 36,
            fontFamily: "sans-serif",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};