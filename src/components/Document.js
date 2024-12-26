import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, Typography, Dialog, DialogContent, Button, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image'; // Importing image icon

const Document = ({ activeReportId }) => {
  const { id } = useParams(); // Extracting id from URL params using useParams
  const [macros, setMacros] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Use activeReportId if provided, otherwise fallback to id from URL params
    const documentId = activeReportId ? activeReportId : id;
    fetchMacros(documentId);
  }, [id, activeReportId]); // Fetch macros whenever id or activeReportId changes

  const fetchMacros = async (documentId) => {
    try {
      const response = await fetch(`http://localhost:5000/macros/${documentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch macros');
      }
      const data = await response.json();
      setMacros(data);
    } catch (error) {
      console.error('Error fetching macros:', error);
    }
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="p-8 h-screen">
      <h1 className="text-2xl font-bold mb-4 font-poppins">Document {id} Macros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {macros.map((macro) => (
          <motion.div
            key={macro.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden shadow-md rounded-lg"
          >
            <Card className="h-full flex flex-col justify-between">
              <CardContent className="flex flex-col h-full">
                <Typography variant="h6" component="h3" className="font-poppins font-bold mb-2">
                  {macro.name}
                </Typography>
                <Typography className="font-poppins" variant="body2" color="textSecondary">
                  Efficient: {macro.efficient ? 'Yes' : 'No'}
                </Typography>
                {macro.flowchart && (
                  <div className="mt-4 flex-grow">
                    <Typography variant="subtitle1" className="font-poppins font-bold mb-2">
                      Flowchart
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<ImageIcon />}
                      className="mt-4 text-white font-poppins bg-slate-900 "
                      onClick={() => handleOpen(macro.flowchart)}
                    >
                      View Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className="flex justify-center items-center">
          {selectedImage && (
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Larger Flowchart"
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Document;
