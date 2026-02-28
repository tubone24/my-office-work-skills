import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

type Slide = {
  text: string;
  backgroundColor: string;
};

export type SlideShowProps = {
  slides: Slide[];
};

const FRAMES_PER_SLIDE = 60;

const SlideItem: React.FC<{ slide: Slide }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [FRAMES_PER_SLIDE - 15, FRAMES_PER_SLIDE],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: slide.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity * fadeOut,
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: 64,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: 60,
        }}
      >
        {slide.text}
      </div>
    </AbsoluteFill>
  );
};

export const SlideShow: React.FC<SlideShowProps> = ({ slides }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {slides.map((slide, index) => (
        <Sequence
          key={index}
          from={index * FRAMES_PER_SLIDE}
          durationInFrames={FRAMES_PER_SLIDE}
        >
          <SlideItem slide={slide} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};