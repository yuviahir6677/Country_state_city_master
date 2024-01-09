import React from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link,useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



export default function RegisterForm() {
  const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          id:'',
          username:'',
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          username: Yup.string().label('UserName').required("Please enter a username!"),
          email: Yup.string().label('Email').email().required("Please enter a valid Email adddress!"),
          password:Yup.string().min(8, "Must Contain 8 Characters").required("Please enter a password!")
          .matches(
            /^(?=.*[a-z])/,
            " Must Contain One Lowercase Character"
          )
          .matches(
            /^(?=.*[A-Z])/,
            "  Must Contain One Uppercase Character"
          )
          .matches(
            /^(?=.*[0-9])/,
            "  Must Contain One Number Character"
          )
          .matches(
            /^(?=.*[!@#/$%^/&/*])/,
            "  Must Contain  One Special Case Character"
          )
        }),
        onSubmit: function (values) {
          const options = {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
          };
      
          fetch('http://localhost:5000/registration', options)
            .then(response => response.json())
            .then((response) => {
              console.log(response)
              // alert(response.message)
              // Swal.fire({
              //   position: 'center',
              //   icon: 'success',
              //   title:"Register Successful",
              //   showConfirmButton: false,
              //   timer:1200
              // })
              if(response.status==1){
                Swal.fire({
                position: 'center',
                icon: 'success',
                title:"Register Successful",
                showConfirmButton: false,
                timer:1200
              })
                navigate("/");
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
              })
              }
            })
            .catch((err) => {
              // alert("Server Down!")
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Server Down!',
            })
              console.error(err)
      
            });
        }
      })
  return (
    <div>
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt />
                    <span className="d-none d-lg-block">NtceAdmin</span>
                  </a>
                </div>{/* End Logo */}
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    </div>
                    <form className="row g-3 needs-validation" onSubmit={formik.handleSubmit}>
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Your Email</label>
                        <input type="email" name="email" className={`form-control ${formik.touched.email && formik.errors.email ? "red-border" : ""}  `}  value={formik.values.email}   onChange={formik.handleChange}
                         id="email"  />
                        <span className='text-red'>{formik.errors.email}</span>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Username</label>
                        <div className="input-group ">
                          <span className="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="username" className={`form-control ${formik.touched.username && formik.errors.username ? "red-border" : ""}  `}  value={formik.values.username}  onChange={formik.handleChange} 
                          id="username"/>
                        </div>
                          <span className='text-red'>{formik.errors.username}</span>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input type="password" name="password" className={`form-control ${formik.touched.password && formik.errors.password ? "red-border" : ""}  `}  value={formik.values.password}   onChange={formik.handleChange}
                         id="password" />
                        <span className='text-red'>{formik.errors.password}</span>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" name="terms" type="checkbox" defaultValue id="acceptTerms" required />
                          <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                          <div className="invalid-feedback">You must agree before submitting.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">Create Account</button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-3">Already have an account? <Link to="/">Log in</Link></p>
                        <p class="social-text">Or Sign up with social platforms</p>
                          <div class="social-media">
                            <a href="#" class="social-icon">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon">
                              <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon">
                              <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="social-icon">
                              <i class="fab fa-linkedin-in"></i>
                            </a>
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>{/* End #main */}
  </div>
  )
}
