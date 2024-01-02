// import React from 'react'

// export default function Dropdown(
//     props
// ) {
//   return (
//     <div class="form-floating mb-3">
//     <select class="form-select" value={props.fieldname && props.value} id="floatingSelect" aria-label="Country">
//       {/* <option>New York</option> */}
//       <option  defaultChecked >{props.fieldname}</option>
//       {props.data != null && props.data.map((element) => {

// return <option>{element.country_name}</option>

// })}
//     </select>
//     <label for="floatingSelect">Country</label>
//   </div>
//   )
// }
import React from 'react'

export default function Dropdown(
  props
) {

  return (
    <div class="form-floating mb-3">
      <select onChange={props.onChange} class="form-select" value={props.fieldname && props.value} id="floatingSelect" aria-label="Country">
        <option defaultChecked >{props.fieldname}</option>
          {props.data != null && props.data.map((element) => {
            if (element._id == props.value) {
              return <option defaultChecked value={element._id}>{element[props.db_field]}</option>
            } else {
              return <option value={element._id}>{element[props.db_field]}</option>
            }
          })}
      </select>
      <label for="floatingSelect">Country</label>
    </div>
  )
}
