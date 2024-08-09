import React, { useState } from 'react';
import alerticon from '../../assets/img/sent.png'
import { useForm } from 'react-hook-form';
import { AddParties } from '../../ApiCalls/Parties.js';
import { toast } from 'react-toastify';

const AddPartiesModal = ({ setModal ,setParties}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isOthersChecked, setIsOthersChecked] = useState(false);
  const [category,setCategory]=useState([])
  const [category2,setCategory2]=useState([])
  const [isloading,setIsloading]=useState(false) 
  const onSubmit = async (data) => {
console.log(data);
setIsloading(true)
    
    const Category = [];
    const Category2 = [];
    
    for (const key in data) {
      if (data[key] === true) {
        if (['Transporter', 'Vender', 'Customer', 'Airline', 'CHA', 'Others'].includes(key)) {
          if (key === 'Others') {
            if (data.OthersName) {
              Category.push({ name: data.OthersName });
            }
          } else {
            Category.push({ name: key });
          }
        } else if (['WCA', 'JC_TRANS', 'DL_ALLIANCE', 'GLN', 'PPL'].includes(key)) {
          Category2.push({ name: key });
        }
      }
    }
    const formData = new FormData();
    formData.append('name', data.Name);
    formData.append('address', data.Address);
    formData.append('number1', data.number1);
    formData.append('number2', data.number2);
    formData.append('email1', data.email1);
    formData.append('email2', data.email2);
    formData.append('representative', data.RepresentativeName);
    formData.append('webLink', data.weblink);
    formData.append('gst', data.GSTIN);
    formData.append('panNo', data.PANNO);
    formData.append('state',data.state);
    formData.append('statecode',data.statecode);
    formData.append('category', JSON.stringify(Category));
    formData.append('category2', JSON.stringify(Category2));
    if (data.GSTPhoto[0]) formData.append('gstphoto', data.GSTPhoto[0]);
    if (data.PANPhoto[0]) formData.append('panphoto', data.PANPhoto[0]);

    console.log('Form Data:', formData);
    
    try {
      const response = await AddParties(formData);
      if (response.success) {
        toast.success(`${response.message}`);
        setParties(response.data);
        setModal(false)
      } else {
        toast.error(`${response.message}`);
      }
      setIsloading(false)
      console.log('Parties data success:', response.datas);
    } catch (error) {
      toast.error('Error submitting form');
      console.error('Error submitting form:', error);
    }
  };

  const handleOthersChange = (event) => {
    setIsOthersChecked(event.target.checked);
  };
  const checkboxes = watch(['WCA', 'JC_TRANS', 'DL_ALLIANCE', 'GLN', 'PPL']);

  // Validation function to check if at least one checkbox is selected
  const validateCheckboxes = () => {
    return checkboxes.some(value => value);
  };
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
                      {['Name', 'Address', 'GSTIN', 'PANNO', 'RepresentativeName'].map((label, index) => (
                        <div key={index} className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>{label}</label>
                            <input
                              type="text"
                              className={`form-control ${errors[label] ? 'is-invalid' : ''}`}
                              {...register(label, { required: true })}
                            />
                            {errors[label] && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                      ))}
                          <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Website Link</label>
                            <input
                              type="text"
                              className={`form-control `}
                              {...register("weblink")}
                            />
                            {/* {errors.Number2 && <span className="invalid-feedback">This field is required</span>} */}
                          </div>
                        </div>
                      <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Contact Number 1</label>
                            <input
                              type="number"
                              className={`form-control ${errors.Number1 ? 'is-invalid' : ''}`}
                              {...register("number1", { required: true })}
                            />
                            {errors.Number1 && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Contact Number 2</label>
                            <input
                              type="number"
                              className={`form-control `}
                              {...register("number2")}
                            />
                            {/* {errors.Number2 && <span className="invalid-feedback">This field is required</span>} */}
                          </div>
                        </div>
                    
                        <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Email Id 1</label>
                          <input
                            type="text"
                            className={`form-control ${errors.email1 ? 'is-invalid' : ''}`}
                            {...register("email1", {
                              required: "This field is required",
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address"
                              }
                            })}
                          />
                          {errors.email1 && <span className="invalid-feedback">{errors.email1.message}</span>}
                        </div>
                      </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>Email Id 2</label>
                            <input
                              type="text"
                              className={`form-control `}
                              {...register("email2", {
                            
                                pattern: {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email address"
                                }
                              })}
                            />
                            {errors.email2 && <span className="invalid-feedback">{errors.email2.message}</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>State</label>
                            <input
                              type="text"
                              {...register("state", { required: true })}
                              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                           
                            />
                            {errors.state && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                        <div  className="col-12 col-md-6 col-xl-6">
                          <div className="form-group local-forms">
                            <label>State Code</label>
                            <input
                              type="text"
                              {...register("statecode", { required: true })}
                              className={`form-control ${errors.statecode ? 'is-invalid' : ''}`}
                           
                            />
                            {errors.statecode && <span className="invalid-feedback">This field is required</span>}
                          </div>
                        </div>
                    {['Transporter', 'Vender', 'Customer', 'Airline', 'CHA', 'Others'].map((label, index) => (
                      <div key={index} className="col-2 col-md-3 col-xl-3 d-flex align-items-center">
                        <div className="form-group local-forms">
                          <label className="me-3">{label}</label>
                          <input
                            type="checkbox"
                            className='form-check-input'
                            {...register(label)}
                            onChange={label === 'Others' ? handleOthersChange : undefined}
                          />
                        </div>
                      </div>
                    ))}
                    {isOthersChecked && (
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>Others Name</label>
                          <input
                            type="text"
                            className={`form-control ${errors['OthersName'] ? 'is-invalid' : ''}`}
                            {...register('OthersName', { required: isOthersChecked })}
                          />
                          {errors['OthersName'] && <span className="invalid-feedback">This field is required</span>}
                        </div>
                      </div>
                    )}
                        <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>GST Photo</label>
                          <input type="file" style={{borderRadius:"10px",border:"3px solid #EEEEEE",width:"100%"}} {...register('GSTPhoto')} required/>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>PAN Photo</label>
                          <input type="file" style={{borderRadius:"10px",border:"3px solid #EEEEEE",width:"100%"}} {...register('PANPhoto')} required />
                        </div>
                      </div>
                      {['WCA', 'JC_TRANS', 'DL_ALLIANCE', 'GLN', 'PPL'].map((label, index) => (
                      <div key={index} className="col-2 col-md-3 col-xl-2 d-flex align-items-center">
                        <div className="form-group local-forms">
                          <label className="me-3">{label}</label>
                          <input
                            type="checkbox"
                            className='form-check-input'
                            {...register(label, { validate: validateCheckboxes })}
                          />
                        </div>
                      </div>
                    ))}
                    {errors.WCA && <p className="text-danger">At least one checkbox must be selected</p>}

                    
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
};

export default AddPartiesModal;
