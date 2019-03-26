import React from 'react';

class Home extends React.Component{
    render(){
        return (
            <div>首页</div>
        )
    }
}

Home.fetch = async ({ req, res }) => {
    console.log('fetch  entry');
    return { result: 'test'}
};

export default Home;