import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/pages/home.css";
import orageImage from "../img/orage.png";
import bruineImage from "../img/bruine.png";
import pluieImage from "../img/pluie.png";
import neigeImage from "../img/neige.png";
import soleilImage from "../img/soleil.png";
import nuagesImage from "../img/des-nuages.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloud,
    faTemperatureFull,
    faWind,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
    const APIKey = "559c3446a6d5d692e2813e94444f84c6";
    const [city, setCity] = useState("");
    const [data, setData] = useState();
    const imgRef = useRef();

    function handleSubmit(e) {
        if (!city) {
            e.preventDefault();
            alert("Entrez le nom de la ville !");
            return;
        }

        e.preventDefault();

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&lang=fr&units=metric`
            )
            .then((r) => {
                setData(r.data);
            })
            .catch((err) => console.error("Erreur !", err))
            .finally(() => setCity(""));
    }

    function setWeatherIcon() {
        if (!data || !imgRef.current) {
            return;
        }

        if (200 <= data.weather[0].id && data.weather[0].id <= 232) {
            imgRef.current.src = orageImage;
        }

        if (300 <= data.weather[0].id && data.weather[0].id <= 321) {
            imgRef.current.src = bruineImage;
        }

        if (500 <= data.weather[0].id && data.weather[0].id <= 531) {
            imgRef.current.src = pluieImage;
        }

        if (600 <= data.weather[0].id && data.weather[0].id <= 622) {
            imgRef.current.src = neigeImage;
        }

        if (data.weather[0].id === 800) {
            imgRef.current.src = soleilImage;
        }

        if (801 <= data.weather[0].id && data.weather[0].id <= 804) {
            imgRef.current.src = nuagesImage;
        }

        return;
    }

    useEffect(() => {
        if (data) {
            setWeatherIcon();
        }
    }, [data]);

    return (
        <main>
            <form className="w-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="input">Entrez le nom de la ville</label>
                <div>
                    <input
                        id="input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Paris"
                    />
                    <button type="submit">Rechercher</button>
                </div>
            </form>
            {data && (
                <div className="w-card">
                    <div className="w-main">
                        <img
                            className="w-icon"
                            ref={imgRef}
                            alt="Weather Icon"
                        />
                        <h3>Météo {data.name}</h3>
                    </div>
                    <div className="w-description">
                        <div>
                            Condition <FontAwesomeIcon icon={faCloud} /> :{" "}
                            <br />
                            {data.weather[0].description}
                        </div>{" "}
                        <br />
                        <div>
                            Température{" "}
                            <FontAwesomeIcon icon={faTemperatureFull} />: <br />
                            {Math.ceil(data.main.temp)}°C
                        </div>{" "}
                        <br />
                        <div>
                            Vent <FontAwesomeIcon icon={faWind} />: <br />
                            {Math.ceil(data.wind.speed)} km/h
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;
