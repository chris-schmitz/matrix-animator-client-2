import {render} from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = document.getElementById("app-root")
    expect(linkElement).toBeInTheDocument();
});
