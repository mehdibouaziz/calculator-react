
import React from 'react';
import "./Toggle.css";

const Toggle = (props) => {

    return (
            <label className='toggle-switch'>
                <input id={props.id} type="checkbox" checked={props.checked} onChange={props.onToggle} />
                <span className="switch" />
            </label>
    );
}

export default Toggle;
