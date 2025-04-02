import { useState, useEffect } from 'react'
import './App.css'

type Theme = 'light' | 'dark';

function App() {
    const [theme, setTheme] = useState<Theme>('dark')

    // Update the `data-theme` attribute on the root element when the theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }

	return (
		<>

			<button onClick={toggleTheme}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>

			<h1>Article Name</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>

			<h2>Section Header</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>

			<h3>Subsection Header</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>

			<h4>Sub Heading Four</h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>

			<h5>Sub Heading Five</h5>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>

			<h6>Sub Heading Six</h6>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec velit nibh. Curabitur a arcu quam. Donec laoreet erat a magna lacinia feugiat. Vestibulum ut risus at lectus volutpat lacinia. Integer pulvinar eros ut erat suscipit vulputate. Mauris elit libero, varius ac justo et, ullamcorper ultricies dui. Suspendisse eget dui non nibh dignissim cursus in eget massa. Phasellus vitae varius mi. Sed consequat posuere neque, vitae fringilla nunc cursus a. Aenean nisl nulla, sodales sit amet feugiat vel, congue at nunc. Integer bibendum tortor quam, quis tempus urna feugiat et. Ut pretium vitae turpis at mollis. Donec faucibus sem nec mi consectetur, in volutpat purus maximus. Ut euismod vestibulum tellus ac laoreet. Pellentesque sed enim ullamcorper lorem efficitur dapibus. Vivamus tincidunt urna eget augue pharetra finibus. </p>



		</>
	)
}

export default App
