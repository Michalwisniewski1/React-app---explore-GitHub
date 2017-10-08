import React from 'react';
import PropTypes from 'prop-types';
import Battle from './Battle'

function PlayerPreview({avatar, username, children}) {
    return (
        <div>
            <div className="col">
                <img className="avatar" src={avatar} alt={'Avatar for ' + username}/>
                <h2 className="username">@{username}</h2>
            </div>
            {children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default PlayerPreview;
