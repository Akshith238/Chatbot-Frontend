import React, { useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inspect = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsm'))) {
      setExcelFile(file);
    } else {
      toast.error('Please upload a valid Excel file.');
    }
  };

  const handleSend = async () => {
    if (!excelFile) {
      toast.error('Please upload an Excel file.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', excelFile);

      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const responseData = await response.json();
      const functionalPdfData = responseData.functional_documentation_pdf;
      const analysisPdfData = responseData.analysis_report_pdf;

      // Function to download PDF
      const downloadPdf = (pdfData, filename) => {
        const blob = base64ToBlob(pdfData);
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

      // Download functional documentation PDF
      downloadPdf(functionalPdfData, 'functional_documentation.pdf');

      // Download analysis report PDF
      downloadPdf(analysisPdfData, 'analysis_report.pdf');

      toast.success('Data sent successfully');
    } catch (error) {
      toast.error('Error sending data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const base64ToBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'application/pdf' });
  };

  return (
    <Box className={`p-4 space-y-4 font-poppins flex flex-col h-screen items-center bg-gray-100 ${loading ? 'loading' : ''}`}>
      <div className='flex flex-col items-center justify-center gap-[12px]'>
        <Typography variant="h3" component="h1" className="font-bold font-poppins text-slate-900 mb-6">
          Inspect Your Macros
        </Typography>
        <Box
          className="w-[300px] h-[300px] flex items-center justify-center bg-white rounded-lg shadow-lg"
          sx={{ border: '2px dashed #E5E7EB' }}
        >
          <input
            accept=".xlsx,.xlsm"
            id="excel-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            disabled={loading}
          />
          <label htmlFor="excel-upload" className="flex flex-col items-center cursor-pointer">
            <UploadFileIcon fontSize="large" className='text-slate-900' />
            <Typography variant="h6" className="font-poppins text-center text-gray-800 mt-2">
              Drag and drop or click to upload Excel file
            </Typography>
          </label>
        </Box>
        {excelFile && (
          <Box className="text-center mt-4">
            <Typography variant="subtitle1" className="font-poppins text-slate-800">
              {excelFile.name}
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          className="rounded-lg font-poppins bg-slate-900 text-white"
          onClick={handleSend}
          disabled={!excelFile || loading}
        >
          {loading ? (
            <CircularProgress size={24} className='text-white'/>
          ) : (
            'Send'
          )}
        </Button>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default Inspect;
