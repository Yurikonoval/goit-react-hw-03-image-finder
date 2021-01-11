import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import imagesAPI from './services/image-api';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

export default class App extends Component {
  state = {
    findValue: '',
    pageNumber: 1,
    images: [],
    restImages: 0,
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: '',
    imageAlt: '',
  };

  handleFormSubmit = findValue => {
    this.setState({
      findValue: findValue,
      pageNumber: 1,
      images: [],
      restImages: 0,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevFindValue = prevState.findValue;
    const nextFindValue = this.state.findValue;

    if (prevFindValue !== nextFindValue) {
      this.setState({ status: 'pending' });

      this.getImages();
    }
  }

  getImages = () => {
    const { findValue, pageNumber } = this.state;

    imagesAPI
      .fetchImages(findValue, pageNumber)
      .then(res =>
        this.setState(({ images, pageNumber }) => ({
          images: [...images, ...res.hits],
          status: 'resolved',
          pageNumber: pageNumber + 1,
          restImages: res.total - images.length,
        })),
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.getImages();
    this.scrollTo();
  };

  scrollTo = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: 'smooth',
      });
    }, 500);
  };

  onOpenModal = e => {
    const { alt } = e.target;
    const { url } = e.target.dataset;

    this.setState({ largeImageURL: url, imageAlt: alt });

    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const {
      status,
      error,
      images,
      largeImageURL,
      imageAlt,
      showModal,
      restImages,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          status={status}
          error={error}
          images={images}
          onOpenModal={this.onOpenModal}
        />
        {restImages > 11 && <Button onLoadMore={this.onLoadMore} />}
        {showModal && (
          <Modal
            src={largeImageURL}
            alt={imageAlt}
            onCloseModal={this.modalToggle}
          />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
