import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  return <div data-testid="error-page">
    <h1>Whoopsie!</h1>
    <p>There was an error with your page navigation.</p>
    <i>{error.statusText || error.message}</i>
  </div>
}