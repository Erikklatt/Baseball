const pitchColorMap: Record<string, string> = {
  FF: "blue", // Fastball
  SL: "red", // Slider
  CH: "green", // Changeup
  SI: "purple", // Sinker
  CU: "oragne", //Curve
  default: "gray", // Default color for unknown pitch types
};

export const getFillColor = (pitchType: string): string => {
  return pitchColorMap[pitchType] || pitchColorMap["default"];
};
