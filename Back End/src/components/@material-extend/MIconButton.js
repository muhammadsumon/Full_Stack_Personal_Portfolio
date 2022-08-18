import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { IconButton } from '@mui/material';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }, ref) => (
  <ButtonAnimate>
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  </ButtonAnimate>
));

MIconButton.propTypes = {
  children: PropTypes.node
};

export default MIconButton;
