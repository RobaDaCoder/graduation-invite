import React from 'react'
import styles from './ThemeOption.module.css'
import { useState } from 'react'

const ThemeOption = () => {

    const [theme, setTheme] = useState('light') // default theme
    
    const handleThemeSelect = (theme) => {
        document.querySelector('body').setAttribute('data-theme', theme);
    }

    const handleThemeChange = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        handleThemeSelect(newTheme)
    }

    return (
        <div className={styles.themeContainer}>
            <div onClick={handleThemeChange} className={styles.themeOption} id={`theme-${theme}`}>
                {theme === 'dark' ? 'Light' : 'Dark'}
            </div>
        </div>
        
    )
}

export default ThemeOption