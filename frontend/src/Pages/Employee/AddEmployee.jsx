import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AddEmployees } from '../../ApiCalls/Employee';
import { toast } from 'react-toastify';

const AddEmployee = ({setModal,FetchData}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isloading,setIsloading]=useState(false) 
    // Watch the password field
    const password = watch("password");
  const onSubmit =async(data)=>{
    // setIsloading(true)
    try {
      console.log(data);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('dateOfJoining', data.dateOfJoining);
      formData.append('email', data.email);
      formData.append('employeeId', data.employeeId);
      formData.append('number', data.number);
      formData.append('password', data.password);
      formData.append('position', data.position);
      formData.append('region', data.region);
      if (data.profileImage[0]) formData.append('profileImage', data.profileImage[0]);
      const response = await AddEmployees(formData);
      if (response.success){
        setModal(false)
        toast.success(`${response.message}`)
        FetchData();
      }else{
        toast.error(`${response.message}`);
        setIsloading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="modal" tabIndex="10" role="dialog" style={{ display: 'block', backdropFilter: 'blur(10px)'  }}>
    
        {isloading?(
        <div className="loader-container modal-dialog  modal-dialog-centered" style={{backgroundColor:"#fff",maxWidth: '700px'}}>
          <div className="loader"></div>
        </div>
      ):
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px' }}>
        <div className="modal-content" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)' }}>
            <div className="modal-header">
              <button className="btn close submit-form" data-bs-dismiss="modal" onClick={()=>setModal(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>New Job</h4>
                        </div>
                      </div>
          
                          <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.name ? 'is-invalid':""}`}
                              {...register("name" , { required: true })}
                            />
                            {errors.name && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                      <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Employee Id</label>
                            <input
                              type="text"
                              className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                              {...register("employeeId", { required: true })}
                            />
                            {errors.employeeId && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Date Of Joining</label>
                            <input
                              type="date"
                              className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''} `}
                              {...register("dateOfJoining")}
                            />
                            {errors.dateOfJoining && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Contact Number</label>
                            <input
                              type="number"
                              className={`form-control ${errors.number ? 'is-invalid' : ''} `}
                              {...register("number", { required: true })}
                            />
                            {errors.number && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Email Id</label>
                            <input
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''} `}
                              {...register("email", { required: true })}
                            />
                            {errors.email && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Position</label>
                            <input
                              type="text"
                              className={`form-control ${errors.position ? 'is-invalid' : ''} `}
                              {...register("position", { required: true })}
                            />
                            {errors.position && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Region</label>
                            <input
                              type="text"
                              className={`form-control ${errors.region ? 'is-invalid' : ''} `}
                              {...register("region", { required: true })}
                            />
                            {errors.region && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Password</label>
                          <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register("password", { required: "Password is required" })}
                          />
                          {errors.password && (
                            <span className="invalid-feedback">{errors.password.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            {...register("confirmPassword", {
                              required: "Confirm Password is required",
                              validate: (value) =>
                                value === password || "Passwords do not match",
                            })}
                          />
                          {errors.confirmPassword && (
                            <span className="invalid-feedback">{errors.confirmPassword.message}</span>
                          )}
                        </div>
                      </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Profile Picture</label>
                            <input
                              type="file"
                              className={`form-control ${errors.profileImage ? 'is-invalid' : ''} `}
                              {...register("profileImage", { required: true })}
                            />
                            {errors.profileImage && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>

                      
                 
             
                      <div className="col-12 col-md-6 col-xl-3">
                        <div className="doctor-submit text-end">
                          <button type="submit" data-bs-dismiss="modal" className="btn btn-primary submit-form me-2">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>	
            </div>
          </div>}
        </div>
	
    </>
  )
}

export default AddEmployee