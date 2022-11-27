const Card = ({card, onCardClick}) => {

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="card-list__item">
      <div onClick={handleClick} className="card-list__overlay">
        <button className="btn card-list__trash"></button>
        <img src={card.link} alt="-" className="card-list__image"/>
      </div>
      <div className="card-list__description">
        <h2 className="card-list__place">{card.name}</h2>
        <div className="card-list__likes-container">
          <button type="button" className="btn card-list__button-like"></button>
          <span className="card-list__likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
