import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const Reports = () => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [assetType, setAssetType] = useState('');
  const [reportType, setReportType] = useState('');
  const [report, setReport] = useState(null);

  const generateReport = () => {
    // Implement report generation logic here
    const generatedReport = {
      title: "Sample Report",
      data: [
        { name: "Trade 1", profit: 500 },
        { name: "Trade 2", profit: 1500 }
      ]
    };
    setReport(generatedReport);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Generate Report
            </Typography>
            <TextField
              label="Start Date"
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              fullWidth
              style={{ marginBottom: '16px' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              fullWidth
              style={{ marginBottom: '16px' }}
              InputLabelProps={{ shrink: true }}
            />
            <Select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              <MenuItem value="crypto">Cryptocurrency</MenuItem>
              <MenuItem value="stocks">Stocks</MenuItem>
            </Select>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              <MenuItem value="tradeSummary">Trade Summary</MenuItem>
              <MenuItem value="assetPerformance">Asset Performance</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={generateReport} fullWidth>
              Generate Report
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            {report ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {report.title}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Profit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report.data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>${row.profit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>Export as PDF</Button>
                <Button variant="contained" color="secondary" style={{ marginTop: '16px', marginLeft: '8px' }}>Export as CSV</Button>
              </>
            ) : (
              <Typography variant="h6" gutterBottom>
                No report available. Please generate a report.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;
