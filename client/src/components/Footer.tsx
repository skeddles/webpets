import '../css/Footer.css';
import ThemeSelector from './ThemeSelector';

interface FooterProps {

}

export default function Footer({}: FooterProps) {


	return (<div className="Footer">
		<h1 className="logo">Web Pets</h1>
		
		<ThemeSelector />
	</div>);
}