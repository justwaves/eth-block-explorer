import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shortenAddress } from '../lib/utils';

const StyledLink = styled(Link)``;

const TagLink = ({ shorten, text, location }) => {
  let mutatedText = text;
  if (shorten) {
    mutatedText = shortenAddress(text);
  }
  return <StyledLink to={`${location}`}>{mutatedText}</StyledLink>;
};

TagLink.propTypes = {
  shorten: PropTypes.bool,
  text: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

TagLink.defaultProps = {
  shorten: '',
};

export default TagLink;
