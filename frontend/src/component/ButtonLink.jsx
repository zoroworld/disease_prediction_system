import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function ButtonLink({ data }) {
  const { name, link } = data   // destructure correctly
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(link)
  }

  return (
    <button className="btn-get-started" onClick={handleClick}>
      {name} <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> 
    </button>
  )
}
