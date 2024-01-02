import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Randertabel from './Ctable';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropdown from './Dropdown';



export default function State() {
  const header = [
    "No", "State", "Action",
  ];
  const [tabledata, settabledata] = useState([]);
  // const [Stabledata, setStabledata] = useState([]);
  useEffect(() => {
    getdata();
}, []);




  const formik = useFormik({
    initialValues: {
      id: "",
      state_name: "",
    },
    validationSchema: Yup.object({
      state_name: Yup.string().label().required("Statename required*")
    }),

  onSubmit: function (values) {
    const options = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:5000/post-state', options)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            // alert(response.message)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: true,
            })
            document.getElementById("closemodel").click();
            getdata();
        })
        .catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
            console.error(err)

        });
}
})

const getdata = () => {
  const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };
  fetch('http://localhost:5000/get-state', options)
      .then(response => response.json())
      .then((response) => {
          settabledata(response.data)

      })
      .catch((err) => {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
          })
          console.error(err)

      });
}



  const [countryid, setcountryid] = useState();
  const [countries, setcountries] = useState([]);


  useEffect(() => {
    getcountries();
  }, []);

  const getcountries = () => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body:JSON.stringify(formdata)
    };
    fetch('http://localhost:5000/get', options)
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          setcountries(response.data)
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
      })
      console.error(err)

      });
  }
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>State</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Components</li>
            <li className="breadcrumb-item active">State</li>
          </ol>
        </nav>
      </div>{/* End Page Title */}
      <section className="section">

        <div>
          {/* Vertically centered Modal */}
          <button type="button" onClick={e =>formik.resetForm()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#verticalycentered">
            NEW ADD
          </button>

          <div class="modal fade" id="verticalycentered" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Enter NewState</h5>
                  <button type="button" class="btn-close" id='closemodel' data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={formik.handleSubmit} >

                  <div class="modal-body">
                   <Dropdown
                           value={countryid}
                          //  column={'country_name'}
                          //  onchange={getstates}
                           fieldname={'Select Country'}
                           data={countries}
                    />
                    <div class="form-floating mb-3">
                      <input type="text" className={`form-control ${formik.touched.state_name && formik.errors.state_name ? "red-border" : ""} `}
                        id="state_name" placeholder="India" value={formik.values.state_name} onChange={formik.handleChange} />
                      <label for="floatingInput">Enter State</label>
                      <span className="text-red">{formik.errors.state_name}</span>

                    </div>
                    <button type="submit" class="btn btn-success">Submit</button>
                  </div>
                </form>
                <div class="modal-footer">
                  {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
          {/* End Vertically centered Modal*/}
        </div>


        <Randertabel
          header={header}
          tabledata={tabledata}

        />
      </section>
    </main>
  )
}
