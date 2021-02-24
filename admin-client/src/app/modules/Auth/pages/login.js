import React from 'react'
import { Link } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as auth from '../_redux/authAction'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  let config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer 1|sMgTtYUZDQEKtMDZP4z82e4lbBEgxooldIP3QDba'
    }
  }

  const dispatch = useDispatch();

  const login = (username, password) => {
    dispatch(auth.login(username, password));
  };

  const formik = useFormik({
    initialValues: {
      username: 'user01@gmail.com',
      password: '123456'
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      login(values.username, values.password)
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <input type="text" placeholder="Username" autoComplete="username"
                        id="username"
                        name="username"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                    </CInputGroup>

                    {formik.touched.username && formik.errors.username ? (
                      <p>{formik.errors.username}</p>
                    ) : null}

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>

                      <input type="password" placeholder="Password" autoComplete="current-password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </CInputGroup>
                    {formik.touched.password && formik.errors.password ? (
                      <p>{formik.errors.password}</p>
                    ) : null}

                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
