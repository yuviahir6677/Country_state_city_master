import React from 'react'

export default function Dropdown(
    props
) {
  return (
    <div class="form-floating mb-3">
    <select class="form-select" value={props.fieldname && props.value} id="floatingSelect" aria-label="Country">
      {/* <option>New York</option> */}
      <option  defaultChecked >{props.fieldname}</option>
      {props.data != null && props.data.map((element) => {

return <option>{element.country_name}</option>

})}
    </select>
    <label for="floatingSelect">Country</label>
  </div>
  )
}
