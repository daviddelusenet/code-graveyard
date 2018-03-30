import styled from 'styled-components';

export const ProgressiveImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SharedImageStyling = styled.img`
  display: block;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: contain;
`;

export const PreviewImage = SharedImageStyling.extend`
  filter: blur(5px);
  opacity: ${props => (props.isLoaded ? '1' : '0')};
`;

export const OriginalImage = SharedImageStyling.extend`
  will-change: opacity;
  opacity: 0;
  ${props => (props.showPreview ? 'position: absolute; top: 0; left: 0;' : null)};
`;
