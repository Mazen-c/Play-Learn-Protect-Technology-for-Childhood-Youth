import React from 'react'; 
import { LinearProgress, Box, Typography } from "@mui/material";

interface ProgressBarProps {
    progress: number ;
}

/**
 * @param {ProgressBarProps} props - The props for the component.
 * @param {number} props.progress - The percentage value of the progress bar.
 * @returns {React.ReactElement} - The component element.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="text.secondary">
                {`${Math.round(progress)}%`}
            </Typography>
        </Box>
    );
};

export default ProgressBar;
