import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Loader from './Loader';

const getStatusColorClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500';
    case 'Completed':
      return 'text-blue-500';
    case 'Validated':
      return 'text-green-700';
    default:
      return 'text-gray-500';
  }
};

const Report = ({ id }) => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      const data = {
        id,
        title: `Report Title ${id}`,
        description: `This is the detailed description of report ${id}.`,
        status: id % 3 === 0 ? 'Validated' : id % 2 === 0 ? 'Completed' : 'Pending', // Example logic for different statuses
        date: '2024-07-05',
        author: 'John Doe',
      };
      setTimeout(() => {
        setReportData(data);
      }, 2000); // Simulate network delay
    };
    fetchReportData();
  }, [id]);

  if (!reportData) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardContent>
          <Typography variant="h4" className="font-poppins font-bold mb-4">
            {reportData.title}
          </Typography>
          <Typography variant="body1" className="font-poppins mb-2">
            <strong>ID:</strong> {reportData.id}
          </Typography>
          <Typography variant="body1" className="font-poppins mb-2">
            <strong>Status:</strong> <span className={getStatusColorClass(reportData.status)}>{reportData.status}</span>
          </Typography>
          <Typography variant="body1" className="font-poppins mb-2">
            <strong>Date:</strong> {reportData.date}
          </Typography>
          <Typography variant="body1" className="font-poppins mb-2">
            <strong>Author:</strong> {reportData.author}
          </Typography>
          <Typography variant="body1" className="font-poppins mt-4">
            {reportData.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
