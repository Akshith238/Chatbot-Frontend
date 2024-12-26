import React, { useState } from 'react';
import { IconButton, Grid, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 border border-dashed rounded-md space-y-4">
      <div className="flex justify-between items-center gap-[5px]">
        <Typography variant="h6" className="font-poppins text-black">Attach Images</Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton className='text-yellow-500' aria-label="upload pictures" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
      <Grid container spacing={2}>
        {images.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" className="text-center font-poppins text-black">No images attached</Typography>
          </Grid>
        )}
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="w-full h-auto object-cover rounded-md"
                style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-white rounded-full"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUploader;
