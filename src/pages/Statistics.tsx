import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Statistics() {
  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const candidates = useAppSelector((state: RootState) => state.candidates)
  const navigate = useNavigate()
  useEffect(() => {
    if (user.user?._id && !user.user.isAdmin) {
      navigate("/votes")
    }
    else if (!user.user?._id) {
      navigate("/login")

    }
  }, [user])
  return (
    <div className='statistics-page' >
      <h1>Statistics</h1>
<div className="can-cards">
    {candidates.candidates?.map((candidate) => (
        <div key={candidate._id} className='candidate-card'>
          <h2>{candidate.name}</h2>
          <h2>{candidate.votes} - votes</h2>
          <img className='candidate-image' src={candidate.image} alt="candidate image" />
        </div>
      ))}
</div>


      <div className='statistics-graph'>
        <div className="dataCard customerCard">
          <Bar
            data={{
              labels: candidates.candidates?.map((candidate) => candidate.name),
              datasets: [
                {
                  label: "Votes",
                  data: candidates.candidates?.map((candidate) => candidate.votes),
                  backgroundColor: [
                    "rgba(215, 30, 40, 0.8)",
                    "rgba(0, 66, 202, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Vote data",
                },
              },
            }}
          />
        </div>

        <div className="dataCard categoryCard">
          <Doughnut
            data={{
              labels: candidates.candidates?.map((candidate) => candidate.name),
              datasets: [
                {
                  label: "Count",
                  data: candidates.candidates?.map((candidate) => candidate.votes),
                  backgroundColor: [
                    "rgba(215, 30, 40, 0.8)",
                    "rgba(0, 66, 202, 0.8)",
                  ],
                  borderColor: [
                    "rgba(215, 30, 40, 0.8)",
                    "rgba(0, 66, 202, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Vote data",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
