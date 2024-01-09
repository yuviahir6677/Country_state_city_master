import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Randertabel from './Ctable';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import Dropdown from './Dropdown';
import Header from '../Header';



export default function State() {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-1',
      cancelButton: 'btn btn-danger m-1'
    },
    buttonsStyling: false
  })
  const header = [
    "No", "State", "Country", "Action",
  ];
  const [states, setstates] = useState([]);
  useEffect(() => {
    getdata();
  }, []);


  const editcallback = (response) => {

    // console.log(response);
    // if (response.status == 1) {
      document.getElementById("btnm").click();
      setcountry_Id(response[0].country_Id);
      formik.setFieldValue("id", response[0]._id)
      formik.setFieldValue("state_name", response[0].state_name)
    // }
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      state_name: "",
      country_Id: ""
    },
    validationSchema: Yup.object({
      state_name: Yup.string().label().required("Statename required*")
    }),

    onSubmit: function (values) {
      Object.assign(values, { country_Id })
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
        setstates(response.data)


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

  const [country_Id, setcountry_Id] = useState();
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

  const deleteState = (id) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:5000/put-state?id=${id}`, options)
      .then(response => response.json())
      .then((response) => {

        if (response.status == 1) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          getdata()
        } else {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            (response.message),
            'error'
          )
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

  const editState = (id) => {
    console.log(JSON.stringify({ id: id }));
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      //  body:JSON.stringify({values})
    };
    fetch(`http://localhost:5000/get-state?id=${id}`, options)
      .then(response => response.json())
      .then((response) => {
        if(response.status==1){
          editcallback(response.data);
        }
        console.log(response);
      })
      .catch((err) => {
        alert("Server Down")
        console.error(err)

      });
  }
  return (
    <main id="main" className="main">
      <Header />
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
          <button type="button" id='btnm' onClick={e => formik.resetForm()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#verticalycentered">
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
                      value={country_Id}
                      fieldname={'Select Country'}
                      db_field={'country_name'}
                      data={countries}
                      onChange={(e) => setcountry_Id(e.target.value)}
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
          tabledata={states}
          deletedatacallback={deleteState}
          editcallback={editState}

        />
      </section>
    </main>
  )
}
