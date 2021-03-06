import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'

const MenuItem = ({ item, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)

  let ref = useRef()

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  return (
    <li className="menu-item" ref={ref} onClick={onMouseEnter} onMouseLeave={onMouseLeave}>
      {item.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {item.title} {depthLevel > 0 ? <span>&raquo</span> : <span className="arrow" />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={item.submenu} dropdown={dropdown} />
        </>
      ) : (
        <a href={item.url}>{item.title}</a>
      )}
    </li>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object,
  depthLevel: PropTypes.number,
}

export default MenuItem
