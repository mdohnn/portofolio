document.addEventListener('DOMContentLoaded', () => {
    const css = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        html, body {
            min-height: 100%;
        }

        body {
            background-color: #1e252d;
            color: #ffffff;
            overflow-x: hidden;
        }

        .hero {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
            padding: 2rem;
        }

        .hero-bg {
            position: absolute;
            top: -5%;
            left: -5%;
            width: 110%;
            height: 110%;
            background-image: url('assets/house_hut.webp');
            background-size: cover;
            background-position: center;
            z-index: 1;
            transition: transform 0.1s ease-out;
            filter: brightness(0.65) contrast(1.1);
        }

        .overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(30, 37, 45, 0.3) 0%, rgba(30, 37, 45, 0.75) 100%),
                        linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(30, 37, 45, 0.9) 100%);
            z-index: 2;
        }

        .clock-weather-wrap {
            position: absolute;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 4;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }

        .digital-clock {
            padding: 0.5rem 0.75rem;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.92);
            font-size: 1.35rem;
            font-weight: 700;
            letter-spacing: 0.18rem;
            text-transform: uppercase;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
            pointer-events: none;
            transition: transform 0.2s ease-out;
        }

        .weather-panel {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
            padding: 0.35rem 0.45rem;
            color: rgba(255, 255, 255, 0.95);
            text-align: left;
            transition: transform 0.2s ease-out;
        }

        .weather-value {
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.1rem;
            text-transform: uppercase;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .weather-location {
            font-size: 0.68rem;
            letter-spacing: 0.08rem;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.82);
            text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
        }

        .hero-content {
            position: relative;
            z-index: 3;
            max-width: 650px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease, transform 1s ease;
        }

        .hero-content.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .profile-container {
            margin-bottom: 1.8rem;
        }

        .profile-pic {
            width: 230px;
            height: 230px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .profile-pic:hover {
            transform: scale(1.08);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
        }

        .title-box {
            width: 100%;
            max-width: 450px;
            border-top: 2px solid #ffffff;
            border-bottom: 2px solid #ffffff;
            padding: 0.8rem 1rem;
            margin-bottom: 1.5rem;
        }

        .title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: 0.3rem;
            text-transform: uppercase;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .description {
            font-size: 0.95rem;
            line-height: 1.8;
            letter-spacing: 0.15rem;
            color: rgba(255, 255, 255, 0.85);
            text-transform: uppercase;
            max-width: 550px;
            text-shadow: 0 1px 5px rgba(0, 0, 0, 0.6);
            margin-bottom: 1.15rem;
        }

        .social-links {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.9rem;
            flex-wrap: wrap;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.35rem 0.5rem;
            color: rgba(255, 255, 255, 0.88);
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.12rem;
            font-size: 0.72rem;
            transition: opacity 0.25s ease, transform 0.25s ease;
            background: transparent;
        }

        .social-link:hover {
            opacity: 1;
            transform: translateY(-2px);
        }

        .social-icon {
            width: 19px;
            height: 19px;
            color: rgba(255, 255, 255, 0.95);
            flex-shrink: 0;
            display: block;
        }

        .social-name {
            text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
            margin-left: -5px;
        }

        @media (max-width: 600px) {
            .clock-weather-wrap {
                top: 1.35rem;
                gap: 0.5rem;
                flex-direction: column;
                align-items: center;
            }

            .digital-clock {
                font-size: 0.82rem;
                letter-spacing: 0.1rem;
            }

            .weather-panel {
                align-items: center;
                text-align: center;
            }

            .weather-value {
                font-size: 0.72rem;
                letter-spacing: 0.08rem;
            }

            .weather-location {
                font-size: 0.46rem;
                letter-spacing: 0.05rem;
            }

            .title {
                font-size: 1.5rem;
                letter-spacing: 0.15rem;
            }

            .description {
                font-size: 0.85rem;
                letter-spacing: 0.08rem;
            }

            .social-links {
                gap: 0.5rem;
            }

            .social-link {
                font-size: 0.63rem;
                letter-spacing: 0.08rem;
            }

            .profile-pic {
                width: 184px;
                height: 184px;
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    document.body.innerHTML = `
        <header class="hero" id="hero">
            <div class="hero-bg" id="hero-bg"></div>
            <div class="overlay"></div>

            <div class="clock-weather-wrap">
                <div class="digital-clock" id="digital-clock" aria-label="Jam digital"></div>
                <div class="weather-panel" id="weather-panel">
                    <div class="weather-value" id="weather-value">--°</div>
                    <div class="weather-location" id="weather-location">Mengambil lokasi...</div>
                </div>
            </div>

            <div class="hero-content" id="hero-content">
                <div class="profile-container">
                    <img src="assets/99985.webp" alt="Profile" class="profile-pic" id="profile-pic">
                </div>

                <div class="title-box">
                    <h1 class="title">HANN</h1>
                </div>

                <p class="description">
                    Still Learn Something... <br> as always
                </p>

                <div class="social-links" aria-label="Sosial media">
                    <a class="social-link" href="https://www.instagram.com/_dohnn" target="_blank" rel="noreferrer">
                        <svg class="social-icon" viewBox="0 0 24 14" aria-hidden="true">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" fill="currentColor"></path>
                        </svg>
                        <span class="social-name">Instagram</span>
                    </a>

                    <a class="social-link" href="https://discord.com/users/358687033734201356" target="_blank" rel="noreferrer">
                        <svg class="social-icon" viewBox="0 0 24 14" aria-hidden="true">
                            <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" fill="currentColor"></path>
                        </svg>
                        <span class="social-name">Discord</span>
                    </a>

                    <a class="social-link" href="https://github.com/mdohnn" target="_blank" rel="noreferrer">
                        <svg class="social-icon" viewBox="0 0 24 14" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill="currentColor"></path>
                        </svg>
                        <span class="social-name">GitHub</span>
                    </a>
                </div>
            </div>
        </header>
    `;

    const heroContent = document.getElementById('hero-content');
    const heroBg = document.getElementById('hero-bg');
    const heroSection = document.getElementById('hero');
    const digitalClock = document.getElementById('digital-clock');
    const weatherValue = document.getElementById('weather-value');
    const weatherLocation = document.getElementById('weather-location');

    function updateClock() {
        if (!digitalClock) return;

        const now = new Date();
        digitalClock.textContent = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    function getWeatherLabel(code) {
        if (code === 0) return 'CERAH';
        if ([1, 2].includes(code)) return 'BERAWAN';
        if ([45, 48].includes(code)) return 'KABUT';
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'HUJAN';
        if ([71, 73, 75, 77, 85, 86].includes(code)) return 'SALJU';
        if ([95, 96, 99].includes(code)) return 'PETIR';
        return 'CUACA';
    }

    function setWeatherFallback(message) {
        if (weatherValue) weatherValue.textContent = '--°';
        if (weatherLocation) weatherLocation.textContent = message;
    }

    function updateWeather() {
        if (!weatherValue || !weatherLocation) return;

        const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2349&longitude=106.9896&current=temperature_2m,weather_code&timezone=auto&language=id';

        fetch(weatherUrl)
            .then((response) => response.json())
            .then((data) => {
                if (!data.current) {
                    setWeatherFallback('Cuaca tidak tersedia');
                    return;
                }

                const temperature = Math.round(data.current.temperature_2m);
                const weatherCode = data.current.weather_code;
                weatherValue.textContent = `${temperature}°C • ${getWeatherLabel(weatherCode)}`;
                weatherLocation.textContent = 'Bekasi & Sekitarnya';
            })
            .catch(() => {
                setWeatherFallback('Cuaca tidak tersedia');
            });
    }

    updateClock();
    updateWeather();
    setInterval(updateClock, 1000);

    setTimeout(() => {
        if (heroContent) {
            heroContent.classList.add('loaded');
        }
    }, 200);

    if (heroSection && heroBg && window.matchMedia('(pointer: fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroSection;

            const xVal = (e.clientX / width) - 0.5;
            const yVal = (e.clientY / height) - 0.5;

            const moveX = xVal * -25;
            const moveY = yVal * -25;

            heroBg.style.transform = `scale(1.06) translate(${moveX}px, ${moveY}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroBg.style.transform = 'scale(1) translate(0px, 0px)';
        });
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY <= window.innerHeight && heroBg && heroContent) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollY / 450);
            heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
    });
});
