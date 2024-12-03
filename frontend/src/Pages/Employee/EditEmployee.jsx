import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateEmployee } from '../../ApiCalls/Employee';

const EditEmployee = ({ setModal, FetchData, editData }) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues: {
      canEditJob: true,
      canDeleteJob: true
    }
  });
  const [isloading, setIsloading] = useState(false);
  const password = watch("password");

  // Populate form with existing data
  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setValue("dateOfJoining", editData.dateOfJoining?.split('T')[0]);
      setValue("email", editData.email);
      setValue("employeeId", editData.employeeId);
      setValue("number", editData.number);
      setValue("position", editData.position);
      setValue("region", editData.region);
      setValue("canEditJob", editData.canEditJob);
      setValue("canDeleteJob", editData.canDeleteJob);
    }
  }, [editData, setValue]);

  const onSubmit = async(data) => {
    try {
      setIsloading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('dateOfJoining', data.dateOfJoining);
      formData.append('email', data.email);
      formData.append('employeeId', data.employeeId);
      formData.append('number', data.number);
      formData.append('position', data.position);
      formData.append('region', data.region);
      formData.append('canEditJob', data.canEditJob);
      formData.append('canDeleteJob', data.canDeleteJob);
      
      // Only append password if it's been changed
      if (data.password) {
        formData.append('password', data.password);
      }

      // Only append new image if one is selected
      if (data.profileImage?.[0]) {
        formData.append('profileImage', data.profileImage[0]);
      }
      
      // Add the employee ID for the update API
      formData.append('id', editData._id);

      const response = await UpdateEmployee(formData);
      if (response.success) {
        setModal(false);
        toast.success(`${response.message}`);
        FetchData();
        
      }
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
      toast.error('Error updating employee');
    }
  }

  return (
    <>
      <div className="modal" tabIndex="10" role="dialog" style={{ display: 'block', backdropFilter: 'blur(10px)' }}>
        {isloading ? (
          <div className="loader-container modal-dialog modal-dialog-centered" style={{backgroundColor:"#fff", maxWidth: '700px'}}>
            <div className="loader"></div>
          </div>
        ) : (
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '700px' }}>
            <div className="modal-content" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(1px)' }}>
              <div className="modal-header">
                <button className="btn close submit-form" data-bs-dismiss="modal" onClick={() => setModal(false)}>
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
                              <h4>Edit Employee</h4>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Name</label>
                              <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ""}`}
                                {...register("name", { required: true })}
                              />
                              {errors.name && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
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

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Date Of Joining</label>
                              <input
                                type="date"
                                className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
                                {...register("dateOfJoining")}
                              />
                              {errors.dateOfJoining && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Contact Number</label>
                              <input
                                type="number"
                                className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                                {...register("number", { required: true })}
                              />
                              {errors.number && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Email Id</label>
                              <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                {...register("email", { required: true })}
                              />
                              {errors.email && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Position</label>
                              <input
                                type="text"
                                className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                                {...register("position", { required: true })}
                              />
                              {errors.position && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>Region</label>
                              <input
                                type="text"
                                className={`form-control ${errors.region ? 'is-invalid' : ''}`}
                                {...register("region", { required: true })}
                              />
                              {errors.region && <span className="invalid-feedback">This field is required</span>}
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>New Password (Optional)</label>
                              <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                {...register("password")}
                              />
                              {errors.password && <span className="invalid-feedback">{errors.password.message}</span>}
                            </div>
                          </div>

                          {password && (
                            <div className="col-12 col-md-6 col-xl-6">
                              <div className="form-group local-forms">
                                <label>Confirm New Password</label>
                                <input
                                  type="password"
                                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                  {...register("confirmPassword", {
                                    validate: (value) =>
                                      !password || value === password || "Passwords do not match",
                                  })}
                                />
                                {errors.confirmPassword && (
                                  <span className="invalid-feedback">{errors.confirmPassword.message}</span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="col-12 col-md-6 col-xl-6">
                            <div className="form-group local-forms">
                              <label>New Profile Picture (Optional)</label>
                              <input
                                type="file"
                                className={`form-control ${errors.profileImage ? 'is-invalid' : ''}`}
                                {...register("profileImage")}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-4 col-xl-4">
                            <div className="form-group local-forms">
                              <div className="form-check mb-4">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="canEditJob"
                                  {...register("canEditJob")}
                                />
                                <label className="form-check-label" htmlFor="canEditJob">
                                  Allow Job Edit
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-4 col-xl-4">
                            <div className="form-group local-forms">
                              <div className="form-check mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="canDeleteJob"
                                  {...register("canDeleteJob")}
                                />
                                <label className="form-check-label" htmlFor="canDeleteJob">
                                  Allow Job Delete
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-4 col-xl-4">
                            <div className="doctor-submit text-end">
                              <button type="submit" className="btn btn-primary submit-form me-2">
                                Update
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
          </div>
        )}
      </div>
    </>
  );
}

export default EditEmployee;