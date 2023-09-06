import React, { useEffect, useState } from 'react';
import '../App.css';
import { getInstaPostData } from '../api';
import axios from 'axios';

export const InstagramViewImages = () => {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [pBtnActive, setPBtnActive] = useState(false);
    const [rBtnActive, setRBtnActive] = useState(false);
    const [instagramData, setInstagramData] = useState([]);
    console.log(instagramData)
    useEffect(() => {
        setIsFirstTime(true);
        setRBtnActive(false);
        setPBtnActive(false);
    }, []);
    const fetchInstagramData = async () => {
        try {
            const response = await axios.get('/api/instagram');
            setInstagramData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleOnClick = async () => {
        setIsFirstTime(false);
        fetchInstagramData();
    };
    useEffect(() => {
        const handleKeywordAction = (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setPBtnActive(!pBtnActive);
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setRBtnActive(true);
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setRBtnActive(true);
            }
        };
        window.addEventListener('keydown', handleKeywordAction);
        return () => {
            window.removeEventListener('keydown', handleKeywordAction);
        };
    }, [pBtnActive, rBtnActive]);
    const url = [
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_0.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_1.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_2.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_3.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_4.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_5.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_6.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_7.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_8.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_9.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_10.jpg",
        "https://s3.eu-central-1.wasabisys.com/instaloader/5349466738_11.jpg",
    ];
    return (
        <>
            {isFirstTime ? <div className='header'>
                <button onClick={handleOnClick} type='button' className='btn-primary'>Start</button>
            </div> : <div>
                <div className='menu-main'>
                    <div className='menu1'>
                        <button className='menu-btn'>{'<'}</button>
                        <button onClick={() => setPBtnActive(!pBtnActive)} className={`menu-btn ${pBtnActive && 'btn-active'}`}>P</button>
                    </div>
                    <div className='menu2'>
                        <button onClick={() => setRBtnActive(true)} className={`menu-btn ${rBtnActive && 'btn-active'}`}>R</button>
                        <div>Profiles showed: 10</div>
                        <div>%: 44</div>
                        <div>ID: 4222999785</div>
                        <div>DB: 16290</div>
                        <div>Total done: 1</div>
                    </div>
                </div>
                <div className='img-section'>
                    <div className='row-header'>
                        <div className='row'>
                            {url?.map((item, idx) => {
                                return <div key={idx} className='img-block'>
                                    <img src={item} alt='insta-img' className='img-styled' />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
