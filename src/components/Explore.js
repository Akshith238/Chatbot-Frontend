import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Navigate for navigation
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GetAppIcon from '@mui/icons-material/GetApp'; // Import icons for download buttons

const Explore = ({ setSelectedItem, setActiveReportId }) => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:5000/documents');
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = (pdfData, name) => {
    const linkSource = `data:application/pdf;base64,${pdfData}`;
    const downloadLink = document.createElement('a');
    const fileName = `${name}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div className="h-screen p-8 bg-gray-100">
      <TextField
        type="text"
        placeholder="Search documents by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        margin="normal"
        className="mb-4"
        sx={{ backgroundColor: 'white' }}
      />
      <div className='flex flex-col gap-4'>
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <CardContent className="flex flex-col h-full p-4">
              <Typography variant="h6" component="h3" className=" font-poppins font-bold mb-2 text-slate-800">
                {doc.name}
              </Typography>
              <div className="flex items-center space-x-4 mt-auto">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GetAppIcon />}
                  onClick={() => downloadPDF(doc.functional_pdf, `${doc.name}_functional`)}
                  className="min-w-[150px] font-poppins bg-slate-900 hover:bg-slate-800"
                >
                  Functional
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<GetAppIcon />}
                  onClick={() => downloadPDF(doc.analysis_pdf, `${doc.name}_analysis`)}
                  className="min-w-[120px] font-poppins bg-slate-700 hover:bg-slate-600"
                >
                  Analysis
                </Button>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <IconButton
                    aria-label="view-details"
                    color="primary"
                    onClick={() => { setSelectedItem('Document'); setActiveReportId(doc.id); }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* Optional fallback in case no documents match */}
        {filteredDocuments.length === 0 && <Typography variant="body1" className="text-center text-gray-600">No documents found.</Typography>}
      </div>
    </div>
  );
};

export default Explore;
