import React from 'react';
import style from './App.module.scss';

const App = () => {
    return (
        <div className={style.app}>
            <div className="container">123</div>
            <input type="text" placeholder={'send'}/>
        </div>
    );
};

export default App;
