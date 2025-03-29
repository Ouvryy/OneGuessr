import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#CC213B', '#E6B96F'];

export default function StatsPage() {
  const [history, setHistory] = useState([]);
  const [arcStats, setArcStats] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('answerHistory') || '[]');
    setHistory(data);

    const grouped = {};
    data.forEach(({ correctArc, isCorrect }) => {
      if (!grouped[correctArc]) {
        grouped[correctArc] = { arc: correctArc, total: 0, correct: 0 };
      }
      grouped[correctArc].total++;
      if (isCorrect) grouped[correctArc].correct++;
    });

    const stats = Object.values(grouped).map(stat => ({
      ...stat,
      accuracy: ((stat.correct / stat.total) * 100).toFixed(1),
    })).sort((a, b) => b.total - a.total);

    setArcStats(stats);
  }, []);

  const total = history.length;
  const correct = history.filter(e => e.isCorrect).length;
  const accuracy = total ? ((correct / total) * 100).toFixed(1) : 0;

  const pieData = [
    { name: 'Bonnes réponses', value: correct },
    { name: 'Mauvaises réponses', value: total - correct }
  ];

  const topArcs = [...arcStats].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
  const flopArcs = [...arcStats].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'black', color: 'white', p: 4 ,paddingBottom: '80px'}}>
      <Typography variant="h4" sx={{ color: '#E6B96F', fontWeight: 'bold', mb: 2, fontSize: '50px', textAlign: 'center' }}
      >
        Statistics
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, fontSize: '15px', textAlign: 'center' }}>
        Total de réponses : {total} | Précision globale : {accuracy}%
      </Typography>

      <Paper sx={{ bgcolor: '#1e1e1e', p: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#CC213B', mb: 1, fontSize: '1.25rem' }}>You are the king on thoses arcs :</Typography>
        {topArcs.map((arc, idx) => (
          <Typography key={idx} sx={{color: '#FFFFFF', fontSize: '15px' }}> {arc.arc} – {arc.correct}/{arc.total} ({arc.accuracy}%)</Typography>
        ))}
      </Paper>

      <Paper sx={{ bgcolor: '#1e1e1e', p: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#CC213B', mb: 1, fontSize: '1.25rem' }}>You suck on thoses arcs :</Typography>
        {flopArcs.map((arc, idx) => (
          <Typography key={idx} sx={{ color: '#FFFFFF', fontSize: '15px' }}> {arc.arc} – {arc.correct}/{arc.total} ({arc.accuracy}%)</Typography>
        ))}
      </Paper>

      <Divider sx={{ my: 4, borderColor: '#FFFFFF' }} />

      <Typography variant="h6" sx={{ color: '#E6B96F', mb: 2, fontSize: '1.25rem' }}>Répartition des réponses</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <Typography variant="h6" sx={{ color: '#E6B96F', mt: 4, mb: 2, fontSize: '1.25rem' }}>Taux de réussite par arc</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={arcStats.slice(0, 10)}>
          <XAxis dataKey="arc" stroke="#FFFFFF" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" />
          <YAxis stroke="#FFFFFF" />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#CC213B" name="% Réussite" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}