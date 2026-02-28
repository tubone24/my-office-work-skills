import React from "react";
import { Composition } from "remotion";
import { TitleCard, type TitleCardProps } from "./compositions/TitleCard";
import { SlideShow, type SlideShowProps } from "./compositions/SlideShow";
import {
  CountdownTimer,
  type CountdownTimerProps,
} from "./compositions/CountdownTimer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition<TitleCardProps>
        id="TitleCard"
        component={TitleCard}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "タイトル",
          subtitle: "サブタイトル",
          backgroundColor: "#1a1a2e",
          textColor: "#ffffff",
        }}
      />
      <Composition<SlideShowProps>
        id="SlideShow"
        component={SlideShow}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          slides: [
            { text: "スライド 1", backgroundColor: "#e63946" },
            { text: "スライド 2", backgroundColor: "#457b9d" },
            { text: "スライド 3", backgroundColor: "#2a9d8f" },
          ],
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.slides.length * 60,
          };
        }}
      />
      <Composition<CountdownTimerProps>
        id="CountdownTimer"
        component={CountdownTimer}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          from: 10,
          label: "開始まで",
          backgroundColor: "#0f0f0f",
          accentColor: "#e63946",
        }}
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: (props.from + 1) * 30,
          };
        }}
      />
    </>
  );
};