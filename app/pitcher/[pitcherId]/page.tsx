"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { PitchPlot, PitchPlotPitch } from "../../../components/ui/pitch-plot";
import Avatar from "@mui/material/Avatar";
import PitchTable from "@/components/pitchTable";
import { getFillColor } from "../../utility";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LabelValueList, { LabelValue } from "@/components/LabelValueList";
import styled, { keyframes } from "styled-components";

const colorChange = keyframes`
  0% { border-color: #FF6600; }
  33% { border-color: #FFD100; }
  67% { border-color: #FFFFFF; }
  100% { border-color: #A7A9AC; }
`;

const LoaderWrapper = styled.div`
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
  border: 10px solid transparent; /* Adjust thickness as needed */
  border-radius: 50%;
  border-top-color: #ff6600; /* Initial color */
  animation: ${colorChange} 2s linear infinite;
`;

interface PitcherInfo {
  id: string;
  name: string;
  organization_abbreviation: string;
  organization_name: string;
  pitcher_birth_date: string;
  pitcher_position: string;
  pitcher_stance: string;
}

interface Pitch {
  pitch_id: string;
  pitcher_id: string;
  batter_name: string;
  batter_stance: "R" | "L" | "S";
  batter_position:
    | "1B"
    | "2B"
    | "3B"
    | "C"
    | "CF"
    | "LF"
    | "RF"
    | "SS"
    | "RP"
    | "SP";
  batter_birth_date: string;
  is_swing: boolean;
  is_contact: boolean;
  is_in_play: boolean;
  is_strike: boolean;
  play_result: string;
  pitch_type: string;
  velocity: number;
  spin_rate: number;
  release_location_x: number;
  release_location_y: number;
  release_location_z: number;
  location_x: number;
  location_z: number;
}

interface PitchesData {
  pitches: Pitch[];
}

export default function Page({ params }: { params: { pitcherId: string } }) {
  const { pitcherId } = params;
  const [selectedPitcherId, setSelectedPitcherId] = useState<string | null>(
    pitcherId
  );
  const [loading, setLoading] = useState(true);
  const [pitchers, setPitchers] = useState<PitcherInfo[]>([]);
  const [pitcherInfo, setPitcherInfo] = useState<PitcherInfo | null>(null);
  const [pitcherStats, setPitcherStats] = useState<PitchesData | null>(null);
  const [pitches, setPitches] = useState<PitchPlotPitch[]>([]);
  const [pitcherImg, setPitcherImg] = useState("");
  const [singlePitch, setSinglePitch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState(null);

  useEffect(() => {
    const fetchPitchers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mia-api.vercel.app/api/pitchers`
        );
        setPitchers(response.data.pitchers);
      } catch (error) {
        console.error("Error fetching pitchers: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchPitchers();
  }, []);

  useEffect(() => {
    const festPitcherByID = async () => {
      try {
        const pitcherResponse = await axios.get(
          `https://mia-api.vercel.app/api/pitcher-info?pitcherId=${selectedPitcherId}`
        );
        const pitchResponse = await axios.get(
          `https://mia-api.vercel.app/api/pitches?pitcherId=${selectedPitcherId}`
        );
        setPitcherInfo(pitcherResponse.data.pitcherInfo);
        setPitcherStats(pitchResponse.data.pitches);

        const formattedPitches = pitchResponse.data.pitches.map(
          (pitch: any) => ({
            pitchId: pitch.pitch_id,
            locationX: pitch.location_x,
            locationZ: pitch.location_z,
            fill: getFillColor(pitch.pitch_type),
            pitchType: pitch.pitch_type,
            playResult: pitch.play_result,
            strike: pitch.is_strike,
            contact: pitch.is_contact,
            inPlay: pitch.is_in_play,
            batter: pitch.batter_name,
            batterStance: pitch.batter_stance,
          })
        );
        setPitches(formattedPitches);
        const imgUrl = `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${selectedPitcherId}/headshot/silo/current`;
        setPitcherImg(imgUrl);
      } catch (error) {
        console.log("error fetching from api: ", error);
      }
    };

    festPitcherByID();
  }, [selectedPitcherId]);

  const handlePitchClick = (pitch) => {
    console.log("pitch clicked: ", pitch.pitchId);
    if (pitch.pitchId) {
      setOpen(true);
      setSelectedPitchId(pitch.pitchId);
      setSinglePitch(pitch);
    }
  };

  const handleLabelValueListClose = () => {
    setOpen(false);
  };

  const items = [
    { label: "Batter", value: singlePitch.batter },
    { label: "Batter Stance", value: singlePitch.batterStance },
    { label: "Pitch Type", value: singlePitch.pitchType },
    { label: "Strike", value: String(singlePitch.strike) },
    { label: "Contact Made", value: String(singlePitch.contact) },
    { label: "In Play", value: String(singlePitch.inPlay) },
    { label: "Play Result", value: singlePitch.playResult },
  ];

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="89vh"
        >
          <LoaderWrapper />
        </Box>
      ) : (
        <div>
          <FormControl
            variant="outlined"
            style={{ background: "#FF6600", borderRadius: "4px" }}
            sx={{ width: "200px" }}
          >
            <InputLabel id="pitcher-select-label" style={{ color: "#FFFFFF" }}>
              Select Pitcher
            </InputLabel>
            <Select
              labelId="pitcher-select-label"
              value={selectedPitcherId}
              onChange={(e) => setSelectedPitcherId(e.target.value)}
              label="Select Pitcher"
              style={{ color: "#FFFFFF" }}
            >
              {pitchers.map((pitcher) => (
                <MenuItem key={pitcher.id} value={pitcher.id}>
                  {pitcher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Card style={{ display: "flex" }}>
              <div style={{ width: "700px" }}>
                <CardHeader style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar
                    alt="Remy Sharp"
                    sx={{
                      width: 56,
                      height: 56,
                      border: "2px solid",
                      borderColor: "#FF6600",
                    }}
                    src={pitcherImg}
                  />
                  <div style={{ paddingLeft: "16px" }}>
                    <CardTitle>{pitcherInfo.name}</CardTitle>
                    <div>{pitcherInfo.organization_name}</div>
                  </div>
                </CardHeader>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "336px",
                  }}
                >
                  <LabelValue
                    label={"Age"}
                    value={
                      new Date().getFullYear() -
                      new Date(pitcherInfo.pitcher_birth_date).getFullYear()
                    }
                  />
                  <LabelValue
                    label="Stance"
                    value={pitcherInfo.pitcher_stance}
                  />
                  <LabelValue
                    label="Position"
                    value={pitcherInfo.pitcher_position}
                  />
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    paddingLeft: "1.5rem",
                    height: "320px",
                  }}
                >
                  <PitchPlot
                    className="w-64"
                    onPitchClick={handlePitchClick}
                    pitches={pitches}
                  />
                  {open ? (
                    <LabelValueList
                      items={items}
                      onClose={handleLabelValueListClose}
                    />
                  ) : null}
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <PitchTable
                  rowData={pitcherStats}
                  selectedPitchId={selectedPitchId}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
