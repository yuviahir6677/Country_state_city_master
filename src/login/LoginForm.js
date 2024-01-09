import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'





export default function LoginForm() {

  const [cookies, setCookie, removeCookie] = useCookies(['krm-token']);

  const navigate = useNavigate();
  const formiklogin = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().label('UserName').required("Please enter a username"),
      password: Yup.string().min(8, "Must Contain 8 Characters").required("Please enter a password")
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

      fetch('http://localhost:5000/loginuser', options)
        .then(response => response.json())
        .then((response) => {
          // alert(response.message)

          if (response.status == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "Login Successful",
              showConfirmButton: false,
              timer: 1200
            })
            setCookie('krm-token', response.token)
            navigate("/header")
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oops...',
              text: "Invalid Username Password",
              showConfirmButton: false,
              timer: 1500
            })

          }

        })
        .catch((err) => {
          console.error(err)
        });
    }
  })
  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
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
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      </div>
                      <form className="row g-3 needs-validation" onSubmit={formiklogin.handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Username</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="username" className={`form-control ${formiklogin.touched.username && formiklogin.errors.username ? "red-border" : ""}  `} value={formiklogin.values.username} onChange={formiklogin.handleChange}
                              id="username" />
                          </div>
                          <span className='text-red'>{formiklogin.errors.username}</span>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" name="password" className={`form-control ${formiklogin.touched.password && formiklogin.errors.password ? "red-border" : ""}  `} value={formiklogin.values.password} onChange={formiklogin.handleChange}
                            id="password" />
                          <span className='text-red'>{formiklogin.errors.password}</span>
                        </div>
                        {/* <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" defaultValue="true" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                  </div> */}
                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">Login</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-3">Don't have account? <Link to="/myregister"> Create an account</Link></p>
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

    </>
  )
}
