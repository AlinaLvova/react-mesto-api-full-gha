
import {useState, useEffect} from 'react';

function Footer(){
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
      const interval = setInterval(() => {
        setYear(new Date().getFullYear());
      }, 1000 * 60 * 60 * 24); // Обновляем год каждые 24 часа
      return () => clearInterval(interval);
    }, []);

    return(
        <footer className="footer">
            <p className="footer__copyright">&#169; {year} Mesto Russia</p>
        </footer>
    )
}

export default Footer;