import React, {useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = () => {
    const [val, setVal] = React.useState('');
    const handleChange = (event) => {
        setVal(event.target.value);
    };

    return (
        <AppContext.Provider
            value={{
                val,
                handleChange,
            }}
        >
            {/*{children}*/}
        </AppContext.Provider>
    )
}

// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }