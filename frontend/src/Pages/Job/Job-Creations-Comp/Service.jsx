import React from 'react'
import { useForm } from 'react-hook-form';

const Service = ({setAdditionalComp,setBasicComp,setServiceComp,setFormData,formData}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const datas={
      ...formData,
      ...data
    }
    setFormData(datas)
    console.log(datas);
    setBasicComp(false); setAdditionalComp(true); setServiceComp(false);
  };
  return (
    <>
      <div className="container mt-2">
        <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mt-4 mb-4" style={{ borderBottom: "0.5px solid #EEEEEE" }}>
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Party Details</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xl-4">
                        <div className="form-group local-forms">
                          <label>Shipper Name</label>
                          <input
                            type="text"
                            className={`form-control ${errors.shipperName ? "is-invalid" : ""}`}
                            {...register("shipperName", { required: true })}
                          />
                          {errors.shipperName && <span className="text-danger">This field is required</span>}
                        </div>
                      </div>
                      <div className="col-12 col-md-5 col-xl-5">
                        <div className="form-group local-forms">
                          <label>Shipper Address</label>
                          <textarea
                            className={`form-control ${errors.shipperAddress ? "is-invalid" : ""}`}
                            rows={3}
                            {...register("shipperAddress", { required: true })}
                          />
                          {errors.shipperAddress && <span className="text-danger">This field is required</span>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Consignee Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.consigneeName ? "is-invalid" : ""}`}
                              {...register("consigneeName", { required: true })}
                            />
                            {errors.consigneeName && <span className="text-danger">This field is required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-5">
                          <div className="form-group local-forms">
                            <label>Consignee Address</label>
                            <textarea
                              className={`form-control ${errors.consigneeAddress ? "is-invalid" : ""}`}
                              rows={3}
                              {...register("consigneeAddress", { required: true })}
                            />
                            {errors.consigneeAddress && <span className="text-danger">This field is required</span>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-4 col-xl-4">
                          <div className="form-group local-forms">
                            <label>Notify Name</label>
                            <input
                              type="text"
                              className={`form-control ${errors.notifyName ? "is-invalid" : ""}`}
                              {...register("notifyName", { required: true })}
                            />
                            {errors.notifyName && <span className="text-danger">This field is required</span>}
                          </div>
                        </div>
                        <div className="col-12 col-md-5 col-xl-5">
                          <div className="form-group local-forms">
                            <label>Notify Address</label>
                            <textarea
                              className={`form-control ${errors.notifyAddress ? "is-invalid" : ""}`}
                              rows={3}
                              {...register("notifyAddress", { required: true })}
                            />
                            {errors.notifyAddress && <span className="text-danger">This field is required</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 mb-4" style={{ borderBottom: "0.5px solid #EEEEEE" }}>
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Origin Operation Details</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xl-4">
                        <div className="form-group local-forms">
                          <label>ETD</label>
                          <input
                            type="date"
                            className={`form-control ${errors.etd ? "is-invalid" : ""}`}
                            {...register("etd", { required: true })}
                          />
                          {errors.etd && <span className="text-danger">This field is required</span>}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 mb-4" style={{ borderBottom: "0.5px solid #EEEEEE" }}>
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Destination Operation Details</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xl-4">
                        <div className="form-group local-forms">
                          <label>ETA</label>
                          <input
                            type="date"
                            className={`form-control ${errors.eta ? "is-invalid" : ""}`}
                            {...register("eta", { required: true })}
                          />
                          {errors.eta && <span className="text-danger">This field is required</span>}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 mb-4" style={{ borderBottom: "1px solid #EEE" }}>
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Other Details</h4>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-xl-4">
                        <div className="form-group local-forms">
                          <label>TOS</label>
                          <select
                            className={`form-control ${errors.tos ? "is-invalid" : ""}`}
                            {...register("tos", { required: true })}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          {errors.tos && <span className="text-danger">This field is required</span>}
                        </div>
                      </div>
                    </div>
                    <p className='text-end text-danger'>
                      Please check the data you filled above once more. <br /> If you click "Next", you will not be allowed to come back.
                    </p>

                    <div className="row justify-content-between">
                      <div className="col-6 col-md-3 mb-5">
                        <div className="doctor-submit text-start">
                          {/* <button
                            type="button"
                            className="btn btn-primary submit-form"
                            onClick={() => {
                              setBasicComp(false); setAdditionalComp(true); setServiceComp(false);
                            }}
                          >
                            /Nxt
                          </button> */}
                        </div>
                      </div>
                      
                      <div className="col-6 col-md-3 text-end">
                        <div className="doctor-submit">
                          <button type="submit" className="btn btn-primary submit-form">
                            Next
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

    </>
  )
}

export default Service