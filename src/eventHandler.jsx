import { useEffect, useRef } from 'react';

const useChatbox = () => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        textarea.rows = 1;

        const handleInput = () => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        };

        // Initialize the textarea height
        handleInput();

        textarea.addEventListener('input', handleInput);

        return () => {
            textarea.removeEventListener('input', handleInput);
        };
    }, []);

    return {
        textareaRef
    };
};

export default useChatbox;