import {useEffect, useState} from "react";
import api from "../utils/api";
import Card from "./Card";

const Main = ({onEditProfile, onAddPalce, onEditAvatar, onCardClick}) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getData()
      .then((userData) => {
        const [{name, about, avatar}, cardsData] = userData;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards([...cardsData]);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className='profile__avatar-container'>
          <img src={userAvatar} alt="_" className="profile__avatar"/>
          <button onClick={onEditAvatar} type='button' className='btn profile__avatar-edit'></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button onClick={onEditProfile} type="button" className="btn profile__button-edit"></button>
          <p className="profile__description">{userDescription}</p>
        </div>

        <button onClick={onAddPalce} type="button" className="btn profile__button-add"></button>
      </section>

      <section className="elements content__photo-grid">
        <ul className="card-list">
          {cards.map((data) => {
            return <Card card={data} onCardClick={onCardClick} key={data._id}/>
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
