import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleImageClick = () => {
    this.props.onClick(this.props.largeImageURL, this.props.tags);
  };

  render() {
    const { id, webformatURL, tags } = this.props;

    return (
      <li className="ImageGalleryItem" key={id}>
        <img
          src={webformatURL}
          alt={tags}
          // data-url={largeImageURL}
          className="ImageGalleryItem-image"
          onClick={this.handleImageClick}
        />
      </li>
    );
  }
}

// export default function ImageGalleryItem({
//   id,
//   tags,
//   webformatURL,
//   largeImageURL,
//   onOpenModal,
// }) {
//   return (
//     <li className="ImageGalleryItem" key={id}>
//       <img
//         src={webformatURL}
//         alt={tags}
//         data-url={largeImageURL}
//         className="ImageGalleryItem-image"
//         onClick={onOpenModal}
//       />
//     </li>
//   );
// }

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number.isRequired,
//   tags: PropTypes.string.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   onOpenModal: PropTypes.func.isRequired,
// };
