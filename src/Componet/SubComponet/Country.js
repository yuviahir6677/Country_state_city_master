import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Formik, useFormik } from 'formik';
import Randertabel from './Ctable';
import Swal from 'sweetalert2'
import * as Yup from 'yup';


export default function Country() {

    const header = [
        "No", "Country", "Action",
    ];
    const [countries, setcountries] = useState([]);
    useEffect(() => {
        getdata();
    }, []);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-1',
            cancelButton: 'btn btn-danger m-1'
        },
        buttonsStyling: false
    })

    const getdata = () => {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:5000/get-countries', options)
            .then(response => response.json())
            .then((response) => {
                setcountries(response.data)

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

    const editcallback = (response) => {
        // console.log(response);
        // if(response.status==1){
        document.getElementById("btnadd").click();
        // }
        formik.setFieldValue("id", response[0]._id)
        formik.setFieldValue("country_name", response[0].country_name)

    }

    const formik = useFormik({
        initialValues: {
            id: "",
            country_name: "",
        },
        validationSchema: Yup.object({
            country_name: Yup.string().label().required("Countryname required*")
        }),

        onSubmit: function (values) {
            const options = {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' },
            };

            fetch('http://localhost:5000/post-countries', options)
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

    const deleteCoutries = (id) => {
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:5000/put-countries?id=${id}`, options)
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
    const editCountries = (id) => {
        console.log(JSON.stringify({ id: id }));
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            //  body:JSON.stringify({values})
        };
        fetch(`http://localhost:5000/get-countries?id=${id}`, options)
            .then(response => response.json())
            .then((response) => {
                editcallback(response.data);
            })
            .catch((err) => {
                alert("Server Down")
                console.error(err)

            });
    }


    return (

        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Country</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item">Components</li>
                        <li className="breadcrumb-item active">Country</li>
                    </ol>
                </nav>
            </div>{/* End Page Title */}
            <section className="section">

                {/* <!-- Vertically centered Modal --> */}

                <button type="button" id="btnadd" onClick={e => formik.resetForm()} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#verticalycentered">
                    ADD NEW
                </button>

                <div class="modal fade" id="verticalycentered" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Enter NewCountry</h5>
                                <button type="button" class="btn-close" id='closemodel' data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={formik.handleSubmit} >
                                <div class="modal-body">
                                    <div class="form-floating mb-3">
                                        <input type="text" className={`form-control ${formik.touched.country_name && formik.errors.country_name ? "red-border" : ""} `} id="country_name" placeholder="India" value={formik.values.country_name} onChange={formik.handleChange} />
                                        <label for="floatingInput">Enter Country</label>
                                        <span className="text-red">{formik.errors.country_name}</span>

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
                {/* <!-- End Vertically centered Modal--> */}


                <Randertabel
                    header={header}
                    tabledata={countries}
                    deletedatacallback={deleteCoutries}
                    editcallback={editCountries}
                />


            </section>
        </main >

    )
}


// className={`btn btn-primary ${formik.touched.country_name && formik.errors.country_name ? "red-border" : ""} `}