const ImagePopup = ({card, onClose}) => {
  const isOpen = Object.keys(card).length !== 0 ? 'popup_opened' : '';
  return (
    <div className={`popup popup_type_open-photo ${isOpen}`}>
      <div className="popup__image-container">
        <button
          onClick={onClose}
          type="button"
          className="popup__button popup__button_operation_close"
        ></button>
        <figure className="popup__figure">
          <img src={card.link} className="popup__image" alt="Image"/>
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
