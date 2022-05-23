import React from 'react'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faPinterestSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer>
        <nav>
			<ul>
				Nous contacter :
				<li><FontAwesomeIcon icon={faArrowRight} /> <a href="mailto:%63&#111;%6e%74%61c%74&#64;%73&#104;%69&#112;&#45;&#115;&#104;&#111;&#112;%2e&#99;%6f&#109;">contact&#64;ship-shop.com</a></li>
				<li><Link to=""><FontAwesomeIcon icon={faArrowRight} /> ou par formulaire</Link></li>
			</ul>
			<address>
				<ul>
					<li>42 avenue des Bobos </li>
					<li>75015 Paris</li>
					<li>01.02.03.04.05</li>
					<li></li>
				</ul>
			</address>

			<aside>
				<FontAwesomeIcon icon={faTwitterSquare} size="2x" />
				<FontAwesomeIcon icon={faFacebookSquare} size="2x" />
				<FontAwesomeIcon icon={faInstagramSquare} size="2x" />
				<FontAwesomeIcon icon={faPinterestSquare} size="2x" />
			</aside>

		</nav>
        <p>copyright dev@ro 2022</p>
    </footer>
  )
}

export default Footer