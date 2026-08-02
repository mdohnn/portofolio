document.addEventListener('DOMContentLoaded', () => {
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

