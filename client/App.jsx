import React from 'react';
import { Link } from 'react-router-dom';

export default props => (<div>
    <div>
        <Link to={'/home'}>首页</Link>
    </div>
    <div>
        <Link to={'/todo'}>todo</Link>
    </div>
</div>)