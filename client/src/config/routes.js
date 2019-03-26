import Home from '../pages/Home';
import Todo from '../pages/Todo';

const routes = [
    {
        path: '/home',
        component: Home,
        fetch: Home.fetch
    },
    {
        path: '/todo',
        component: Todo,
        fetch: null
    }
];

export {
    routes
}