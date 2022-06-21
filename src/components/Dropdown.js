import React from 'react'
import MenuItem from './MenuItem'
import PropTypes from 'prop-types'

const Dropdown = (props) => {
  const { submenus, dropdown } = props
  let { depthLevel } = props

  depthLevel += 1

  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : ''

  return (
    <ul className={`dropdown-o ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <MenuItem item={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}

Dropdown.propTypes = {
  submenus: PropTypes.array,
  dropdown: PropTypes.bool,
  depthLevel: PropTypes.number,
}

export default Dropdown
