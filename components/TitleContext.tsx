import React, { createContext, useState } from 'react';

const TitleContext = createContext();

const TitleProvider = ({ children }) => {
    const [title, setTitle] = useState('');

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    );
};

export { TitleContext, TitleProvider };