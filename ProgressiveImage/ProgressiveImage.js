import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { TweenMax } from 'gsap';

// Styled Components
import { OriginalImage, PreviewImage, ProgressiveImageWrapper } from './ProgressiveImage.sc';

// Consts
import { IMAGE_SIZES } from './../../utils/consts';

export default class ProgressiveImage extends React.PureComponent {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    originalImageStyle: PropTypes.object,
    originalImageSize: PropTypes.string,
    previewImageStyle: PropTypes.object,
    previewImageSize: PropTypes.string,
    showPreview: PropTypes.bool
  };

  static defaultProps = {
    originalImageStyle: {},
    originalImageSize: '',
    previewImageStyle: {},
    previewImageSize: IMAGE_SIZES.W79,
    showPreview: false
  };

  state = {
    originalImageIsLoaded: false,
    previewImageIsLoaded: !this.props.showPreview
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.imageURL !== nextProps.imageURL) {
      this.setState(prevState => update(prevState, {
        originalImageIsLoaded: { $set: false },
        previewImageIsLoaded: { $set: false }
      }));

      TweenMax.set(this.originalImage, {
        opacity: 0
      });
    }
  }

  componentDidUpdate() {
    if (this.state.originalImageIsLoaded && this.state.previewImageIsLoaded) {
      TweenMax.to(this.originalImage, 0.7, {
        opacity: 1,
        ease: Quad.easeOut
      });

      if (this.props.showPreview) {
        TweenMax.to(this.previewImage, 0.7, {
          opacity: 0,
          ease: Quad.easeOut
        });
      }
    }
  }

  imageIsLoaded = (imageIdentifier) => {
    this.setState(prevState => update(prevState, {
      [`${imageIdentifier}IsLoaded`]: { $set: true }
    }));
  };

  render() {
    const { imageURL, originalImageStyle, originalImageSize, previewImageStyle, previewImageSize, showPreview } = this.props;
    const { previewImageIsLoaded } = this.state;
    const originalImageSource = originalImageSize ? imageURL.replace('original', originalImageSize) : imageURL;

    return(
      <ProgressiveImageWrapper>
        {showPreview &&
          <PreviewImage innerRef={img => this.previewImage = img} isLoaded={previewImageIsLoaded} onLoad={() => this.imageIsLoaded('previewImage')} src={imageURL.replace('original', previewImageSize)} style={previewImageStyle} />
        }
        <OriginalImage innerRef={img => this.originalImage = img} onLoad={() => this.imageIsLoaded('originalImage')} showPreview={showPreview} src={originalImageSource} style={originalImageStyle} />
      </ProgressiveImageWrapper>
    );
  }
}
