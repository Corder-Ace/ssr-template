import React from 'react';
import { Button } from 'antd';

class Home extends React.Component{
    render(){
        return (
            <div>首页<Button type='primary'>按钮</Button></div>
        )
    }
}

Home.fetch = async ({ req, res }) => {
    console.log('fetch  entry');
    return { result: 'test'}
};

export default Home;