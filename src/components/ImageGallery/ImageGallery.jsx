import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.css';

export default class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    images: PropTypes.array,
  };

  handleImageClick = (imageURL, imageALT) => {
    this.props.onClick(imageURL, imageALT);
  };

  render() {
    const { status, error, images, onLoadMore } = this.props;

    if (status === 'idle') {
      return <div className="helper-text">Enter search query</div>;
    }
    if (status === 'pending') {
      return Loader();
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved' && images.length !== 0) {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.handleImageClick}
              />
            ))}
          </ul>
          {<Button onLoadMore={onLoadMore} />}
        </>
      );
    } else {
      return <div className="helper-text">We can't find it</div>;
    }
  }
}
