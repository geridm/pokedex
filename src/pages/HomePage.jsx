import { useRef } from "react";
import { setTrainerSlice } from "../store/slices/trainer.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/style/HomePage.css";

const HomePage = () => {
  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleTrainer = (e) => {
    e.preventDefault();
    dispatch(setTrainerSlice(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="home">
      <img className="home__image" src="/imgs/img001.png" alt="" />
      <h2 className="home__greetings">Hi Trainer!</h2>
      <p className="home__phrase">
        To start, please, give me your trainer name
      </p>
      <form className="formuser" onSubmit={handleTrainer}>
        <input className="formuser__input" ref={inputTrainer} type="text" />
        <button className="formuser__button">Start!</button>
      </form>
      <img className="home__image__foot" src="/imgs/img002.png" alt="" />
    </div>
  );
};

export default HomePage;
